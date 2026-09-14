/**
 * Single source of truth for site-wide SEO / social-card metadata.
 *
 * `NEXT_PUBLIC_SITE_URL` should be set to the production origin (no trailing
 * slash). On Vercel we fall back to the deployment URL so preview builds still
 * emit absolute og:image / canonical URLs, which social scrapers require.
 */
const vercelProductionUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, "")
  if (vercelProductionUrl) return `https://${vercelProductionUrl}`
  if (vercelUrl) return `https://${vercelUrl}`
  return "http://localhost:3000"
}

export const siteConfig = {
  name: "AI Tab Saver",
  url: resolveSiteUrl(),
  title: "AI Tab Saver — Save, summarize and organize your browser tabs",
  description:
    "AI Tab Saver is a Chrome extension that summarizes every tab you save, sorts them into smart categories, and turns your open tabs into a searchable, readable library.",
  twitter: "@aitabsaver",
  locale: "en_US",
} as const

/** Turn a site-relative path into the absolute URL social scrapers require. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

/** URL of the generated 1200x630 social card. */
export function ogImageUrl(title?: string, subtitle?: string): string {
  const params = new URLSearchParams()
  if (title) params.set("title", title)
  if (subtitle) params.set("subtitle", subtitle)
  const query = params.toString()
  return absoluteUrl(`/api/og${query ? `?${query}` : ""}`)
}
