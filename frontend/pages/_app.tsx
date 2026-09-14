import "../src/styles/globals.css"
import type { AppProps } from "next/app"
import Seo from "../components/seo"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Site-wide defaults. Each page renders <Seo /> again with its own
          values, which override these by matching next/head `key`s. */}
      <Seo />
      <Component {...pageProps} />
    </>
  )
}
