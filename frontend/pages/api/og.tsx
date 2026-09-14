import fs from "node:fs"
import path from "node:path"
import type { NextApiRequest, NextApiResponse } from "next"
import { ImageResponse } from "next/og"

const BRAND = "AI Tab Saver"
const DEFAULT_TITLE = "Every tab you save, summarized"
const DEFAULT_SUBTITLE =
  "Save any tab, get an instant AI summary, and find it later in smart categories."
const CTA = "Add to Chrome"

/* Palette: a deep indigo field so the product's light UI is the only bright
   thing on the card, with the in-app blue -> violet gradient kept for the CTA. */
const FIELD = "#141038"
const BLUE = "#2563eb"
const VIOLET = "#9333ea"
const MIST = "#a8a3d9"

// Same mark as the favicon: gradient tile + astroid sparkle.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="${VIOLET}"/></linearGradient></defs><rect width="32" height="32" rx="6.4" fill="url(#g)"/><path fill="#fff" d="M26.88,16 C22.631,16 16,22.631 16,26.88 C16,22.631 9.369,16 5.12,16 C9.369,16 16,9.369 16,5.12 C16,9.369 22.631,16 26.88,16 Z"/></svg>`
const MARK_URL = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`

/**
 * The crowded tab strip — the problem the product solves. Each tab is too
 * narrow to show a title, which is the whole point: only the favicon is left.
 */
const TABS = [
  { w: 52, dot: "#60a5fa" },
  { w: 40, dot: "#f472b6" },
  { w: 56, dot: "#34d399" },
  { w: 36, dot: "#fbbf24" },
  { w: 48, dot: "#a78bfa" },
  { w: 32, dot: "#f87171" },
  { w: 50, dot: "#38bdf8" },
  { w: 38, dot: "#c084fc" },
  { w: 44, dot: "#4ade80" },
  { w: 34, dot: "#fb923c" },
]

const SAVED = [
  {
    category: "Research",
    accent: BLUE,
    title: "Attention Is All You Need",
    summary: "Self-attention replaces recurrence, so the whole sequence is read at once.",
  },
  {
    category: "Docs",
    accent: VIOLET,
    title: "React — useEffect",
    summary: "Runs after paint; return a function to clean up before the next run.",
  },
]

type Font = { name: string; data: ArrayBuffer; weight: 500 | 700; style: "normal" }
let cachedFonts: Font[] | undefined

/**
 * Space Grotesk is bundled in the repo and pulled into the serverless bundle by
 * `outputFileTracingIncludes` in next.config.js. If that ever fails we fall back
 * to satori's built-in sans rather than 500 — a plain card beats no card.
 */
function loadFonts(): Font[] {
  if (cachedFonts) return cachedFonts
  const dir = path.join(process.cwd(), "src", "fonts")
  const read = (file: string) => {
    const buf = fs.readFileSync(path.join(dir, file))
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
  }
  try {
    cachedFonts = [
      { name: "Space Grotesk", data: read("SpaceGrotesk-Bold.ttf"), weight: 700, style: "normal" },
      { name: "Space Grotesk", data: read("SpaceGrotesk-Medium.ttf"), weight: 500, style: "normal" },
    ]
  } catch (error) {
    console.error("[og] font load failed, falling back to system sans:", error)
    cachedFonts = []
  }
  return cachedFonts
}

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
  const fonts = loadFonts()
  const fontFamily = fonts.length ? "Space Grotesk" : "sans-serif"

  const image = new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "56px 64px",
          background: `linear-gradient(140deg, ${FIELD} 0%, #1d1553 55%, #2a1358 100%)`,
          fontFamily,
          overflow: "hidden",
        }}
      >
        {/* Brand light bleeding in from the corners. Satori has no filter:blur,
            so the falloff has to come from the gradient itself. */}
        <div
          style={{
            position: "absolute",
            top: -380,
            right: -300,
            width: 1000,
            height: 1000,
            background:
              "radial-gradient(circle at 50% 50%, rgba(147,51,234,0.58) 0%, rgba(147,51,234,0.18) 34%, rgba(147,51,234,0) 56%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -430,
            left: -330,
            width: 940,
            height: 940,
            background:
              "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.52) 0%, rgba(37,99,235,0.17) 34%, rgba(37,99,235,0) 56%)",
            display: "flex",
          }}
        />

        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK_URL} width={42} height={42} alt="" />
          <div style={{ marginLeft: 14, fontSize: 27, fontWeight: 700, color: "#ffffff" }}>
            {BRAND}
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", marginTop: 30 }}>
          {/* Left: the message and the action */}
          <div style={{ display: "flex", flexDirection: "column", width: 560 }}>
            <div
              style={{
                display: "flex",
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 24,
                fontWeight: 500,
                lineHeight: 1.42,
                color: MIST,
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                marginTop: 38,
                padding: "19px 40px",
                borderRadius: 999,
                background: `linear-gradient(90deg, ${BLUE} 0%, ${VIOLET} 100%)`,
                fontSize: 25,
                fontWeight: 700,
                color: "#ffffff",
                boxShadow: "0 18px 44px rgba(76, 44, 214, 0.55)",
              }}
            >
              {CTA}
            </div>
          </div>

          {/* Right: a wall of unreadable tabs resolving into readable ones */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, marginLeft: 54 }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {TABS.map((tab, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: tab.w,
                    height: 32,
                    marginRight: 4,
                    paddingLeft: 9,
                    borderRadius: "10px 10px 0 0",
                    background: i === 0 ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.13)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 9,
                      height: 9,
                      borderRadius: 9,
                      background: tab.dot,
                      opacity: i === 0 ? 1 : 0.75,
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                height: 4,
                borderRadius: 4,
                background: "rgba(255,255,255,0.26)",
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 13,
                fontSize: 17,
                fontWeight: 500,
                color: MIST,
              }}
            >
              41 open tabs, none of them readable
            </div>

            {SAVED.map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 16,
                  padding: "18px 22px",
                  borderRadius: 18,
                  background: "#ffffff",
                  boxShadow: "0 22px 50px rgba(8, 4, 42, 0.5)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      width: 9,
                      height: 9,
                      borderRadius: 9,
                      background: item.accent,
                    }}
                  />
                  <div style={{ marginLeft: 9, fontSize: 16, fontWeight: 700, color: item.accent }}>
                    {item.category}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 9,
                    fontSize: 21,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "#15132e",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 7,
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "#5d6480",
                  }}
                >
                  {item.summary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: fonts.length ? fonts : undefined },
  )

  const body = Buffer.from(await image.arrayBuffer())
  res.setHeader("Content-Type", "image/png")
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  )
  res.status(200).send(body)
}
