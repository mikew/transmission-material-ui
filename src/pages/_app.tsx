import { CacheProvider, EmotionCache } from '@emotion/react'
import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import * as React from 'react'
import { Provider } from 'react-redux'

import createEmotionCache from '@src/mui/createEmotionCache'
import theme from '@src/mui/theme'
import { useRootStore } from '@src/redux/helpers'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const store = useRootStore(pageProps.initialReduxState)

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Head>
          {/*
          There's a lot of words spent saying that this _has_ to live in _app.
          But the reasoning all seems to point back to next's own limitations.
          `_app` is dynamic, unlike `_document`. But this literally never
          changes, and I've never known an app that does change it during its
          runtime.
          https://github.com/vercel/next.js/discussions/13408#discussioncomment-143965
          https://github.com/vercel/next.js/discussions/19720
          https://github.com/vercel/next.js/issues/13230
          */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <CssBaseline />
            <GlobalStyles
              styles={{ 'html, body, #__next': { minHeight: '100%' } }}
            />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  )
}
