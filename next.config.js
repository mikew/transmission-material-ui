// @ts-check

const nextPwa = require('@ducanh2912/next-pwa').default

process.env.NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
process.env.NEXT_PUBLIC_TRANSMISSION_RPC_PATH =
  process.env.NEXT_PUBLIC_TRANSMISSION_RPC_PATH ||
  'http://localhost:8080/transmission/rpc'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,

  experimental: {
    legacyBrowsers: false,
  },

  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
}

function randomId() {
  return Math.random().toString(16).slice(2)
}

const buildId = randomId()

const withPwa = nextPwa({
  disable: process.env.NODE_ENV === 'development',

  workboxOptions: {
    additionalManifestEntries: [
      // Since this is a spa, we can cache the index.html.
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH}/index.html`,
        revision: buildId,
      },
      // No clue why next-pwa doesn't cache the manifest by default.
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH}/manifest.webmanifest`,
        revision: buildId,
      },
    ],
  },

  // Not sure why you'd do this instead of workbox's manifest that we're doing
  // above. This is a client-side JS cache, on top of workbox. However, the
  // documentation states:
  //     recommend: set to false if your start url always returns same HTML
  //     document.
  dynamicStartUrl: false,

  // This needs to be different from wherever `next export` puts our files, that
  // directory seems to get clobbered and whatever next-pwa puts there is
  // removed.
  // The build script copies all files from here to where they need to be.
  dest: 'pwa-out',
})

module.exports = withPwa(nextConfig)
