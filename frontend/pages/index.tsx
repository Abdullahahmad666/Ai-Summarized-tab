import LandingPage from "./landingpage"

// Every page navigates via next/router (useRouter().push), so the old
// `currentPage` state machine here was unreachable: nothing could ever move it
// off "landing". The remaining screens are reached through their own routes
// (/login, /signup, /subscription, /profile, /categorized, /youtube-helper,
// /dashboard).
export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingPage />
    </div>
  )
}
