import createEmotionServer from '@emotion/server/create-instance'
import { AppType } from 'next/app'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document'
import * as React from 'react'

import createEmotionCache from '@src/mui/createEmotionCache'
import theme from '@src/mui/theme'

import { MyAppProps } from './_app'

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

const FAVICON_BASE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/favicon`

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <PwaMeta
          appAuthor=""
          appDescription=""
          appLink=""
          appTitle="Transmission"
          manifestPath={`${process.env.NEXT_PUBLIC_BASE_PATH}/manifest.webmanifest`}
          // This is theme.palette.background.paper mixed with an overlay that
          // mui adds.
          themeColor="#302a31"
          faviconPath={`${FAVICON_BASE_PATH}/favicon.ico`}
          favicon32Path={`${FAVICON_BASE_PATH}/favicon-32x32.png`}
          iconPath={`${FAVICON_BASE_PATH}/android-chrome-192x192.png`}
          pinnedTabPath={`${FAVICON_BASE_PATH}/safari-pinned-tab.svg`}
          pinnedTabColor={theme.palette.primary.main}
        />
        <meta name="disabled-adaptations" content="watch" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

const PwaMeta: React.FC<{
  appTitle: string
  appDescription: string
  appAuthor: string
  appLink: string
  themeColor: string
  manifestPath: string

  iconPath?: string
  favicon32Path?: string
  faviconPath?: string
  pinnedTabPath?: string
  pinnedTabColor?: string
}> = (props) => {
  return (
    <>
      <meta name="application-name" content={props.appTitle} />
      <meta name="description" content={props.appDescription} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={props.themeColor} />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={props.appTitle} />

      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content={props.themeColor} />
      <meta name="msapplication-tap-highlight" content="no" />

      {props.iconPath ? (
        <link rel="apple-touch-icon" href={props.iconPath} />
      ) : undefined}

      {props.favicon32Path ? (
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={props.favicon32Path}
        />
      ) : undefined}
      <link rel="manifest" href={props.manifestPath} />
      {props.pinnedTabPath ? (
        <link
          rel="mask-icon"
          href={props.pinnedTabPath}
          color={props.pinnedTabColor}
        />
      ) : undefined}
      {props.faviconPath ? (
        <link rel="shortcut icon" href={props.faviconPath} />
      ) : undefined}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={props.appLink} />
      <meta name="twitter:title" content={props.appTitle} />
      <meta name="twitter:description" content={props.appDescription} />
      {props.iconPath ? (
        <meta name="twitter:image" content={props.iconPath} />
      ) : undefined}
      <meta name="twitter:creator" content={props.appAuthor} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.appTitle} />
      <meta property="og:description" content={props.appDescription} />
      <meta property="og:site_name" content={props.appTitle} />
      <meta property="og:url" content={props.appLink} />
      {props.iconPath ? (
        <meta property="og:image" content={props.iconPath} />
      ) : undefined}
    </>
  )
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}
