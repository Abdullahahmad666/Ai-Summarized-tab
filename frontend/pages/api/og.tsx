import type { NextApiRequest, NextApiResponse } from "next"
import { ImageResponse } from "next/og"

const BRAND = "AI Tab Saver"
const DEFAULT_TITLE = "Save, summarize and organize your browser tabs"
const DEFAULT_SUBTITLE = "AI summaries and smart categories for every tab you save."

// Same mark as the favicon: gradient tile + astroid sparkle.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#9333ea"/></linearGradient></defs><rect width="32" height="32" rx="6.4" fill="url(#g)"/><path fill="#fff" d="M26.88,16 C22.631,16 16,22.631 16,26.88 C16,22.631 9.369,16 5.12,16 C9.369,16 16,9.369 16,5.12 C16,9.369 22.631,16 26.88,16 Z"/></svg>`
const MARK_URL = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`

function clamp(value: unknown, max: number, fallback: string) {
  const raw = Array.isArray(value) ? value[0] : value
  if (typeof raw !== "string") return fallback
  const trimmed = raw.trim()
  if (!trimmed) return fallback
  return trimmed.length > max ? `${trimmed.slice(0, max - 1).trimEnd()}…` : trimmed
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const title = clamp(req.query.title, 80, DEFAULT_TITLE)
  const subtitle = clamp(req.query.subtitle, 140, DEFAULT_SUBTITLE)

  const image = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 45%, #faf5ff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK_URL} width={64} height={64} alt="" />
          <div style={{ marginLeft: 20, fontSize: 36, fontWeight: 700, color: "#111827" }}>
            {BRAND}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#0f172a",
            }}
          >
            {title}
          </div>
          <div
            style={{ display: "flex", marginTop: 24, fontSize: 32, lineHeight: 1.35, color: "#475569" }}
          >
            {subtitle}
          </div>
        </div>

        {/* Gradient rule echoing the in-app brand gradient */}
        <div
          style={{
            display: "flex",
            height: 12,
            width: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  )

  const body = Buffer.from(await image.arrayBuffer())
  res.setHeader("Content-Type", "image/png")
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  )
  res.status(200).send(body)
}
