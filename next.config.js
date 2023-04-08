// @ts-check

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

