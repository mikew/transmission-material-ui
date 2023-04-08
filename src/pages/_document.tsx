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

import { MyAppProps } from './_app'

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <PwaMeta
          appAuthor=""
          appDescription=""
          appLink=""
          appTitle="Transmission"
          // This is theme.palette.background.paper mixed with an overlay that
          // mui adds.
          themeColor="#302a31"
        />

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

      {/* <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" /> */}
      {/* <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/touch-icon-ipad.png"
      /> */}
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      /> */}
      {/* <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      /> */}

      {/* <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      /> */}
      {/* <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      /> */}
      <link
        rel="manifest"
        href={`${process.env.NEXT_PUBLIC_BASE_PATH}/manifest.webmanifest`}
      />
      {/* <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      /> */}
      {/* <link rel="shortcut icon" href="/favicon.ico" /> */}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={props.appLink} />
      <meta name="twitter:title" content={props.appTitle} />
      <meta name="twitter:description" content={props.appDescription} />
      {/* <meta
        name="twitter:image"
        content="https://yourdomain.com/icons/android-chrome-192x192.png"
      /> */}
      <meta name="twitter:creator" content={props.appAuthor} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.appTitle} />
      <meta property="og:description" content={props.appDescription} />
      <meta property="og:site_name" content={props.appTitle} />
      <meta property="og:url" content={props.appLink} />
      {/* <meta
        property="og:image"
        content="https://yourdomain.com/icons/apple-touch-icon.png"
      /> */}
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
