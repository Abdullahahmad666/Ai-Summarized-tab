import Head from "next/head"
import { absoluteUrl, ogImageUrl, siteConfig } from "@/lib/site"

export type SeoProps = {
  /** Page title. Omit on the home page to use the full site title verbatim. */
  title?: string
  description?: string
  /** Site-relative path used for canonical + og:url, e.g. "/subscription". */
  path?: string
  /** Absolute image URL. Defaults to a generated card built from the title. */
  image?: string
  /** Keep app/auth screens out of search results. */
  noIndex?: boolean
  type?: "website" | "article"
}

/**
 * Renders the full set of title / description / Open Graph / X tags.
 *
 * Defaults are rendered once from `_app`, and each page renders this again with
 * its own values. next/head dedupes by the `key` prop and the page's <Head>
 * commits after `_app`'s, so page-level values win. Every tag must stay a
 * *direct* child of <Head> for that dedupe to work on client-side navigation.
 */
export default function Seo({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
  type = "website",
}: SeoProps) {
  const pageTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title
  const canonical = absoluteUrl(path)
  // Home gets the default card; subpages get their title on it.
  const socialImage = image ?? ogImageUrl(title)

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonical} key="canonical" />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
        key="robots"
      />

      {/* Open Graph — Facebook, LinkedIn, Discord, Slack, iMessage */}
      <meta property="og:site_name" content={siteConfig.name} key="og:site_name" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:title" content={pageTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:locale" content={siteConfig.locale} key="og:locale" />
      <meta property="og:image" content={socialImage} key="og:image" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:image:type" content="image/png" key="og:image:type" />
      <meta property="og:image:alt" content={pageTitle} key="og:image:alt" />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:site" content={siteConfig.twitter} key="twitter:site" />
      <meta name="twitter:creator" content={siteConfig.twitter} key="twitter:creator" />
      <meta name="twitter:title" content={pageTitle} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={socialImage} key="twitter:image" />
      <meta name="twitter:image:alt" content={pageTitle} key="twitter:image:alt" />
    </Head>
  )
}
