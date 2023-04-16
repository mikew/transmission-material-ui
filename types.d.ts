declare namespace NodeJS {
  // These are actually set in next.config.js, but since it's a .js file we
  // can't take advantage of TypeScript.
  // https://github.com/vercel/next.js/discussions/35969
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE_PATH: string
    readonly NEXT_PUBLIC_TRANSMISSION_RPC_PATH: string
  }
}
