"use client"

import { useState } from "react"
import LandingPage from "./landingpage"
import LoginPage from "./login"
import SignupPage from "./signup"
import SubscriptionPlans from "./subscription"
import ProfilePage from "./profile"
import CategorizedTabsPage from "./categorized"
import YouTubeHelperPage from "./youtube-helper"
import Dashboard from "./dashboard"


export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "login" | "signup" | "subscription" | "profile" | "tabs" | "youtube" | "dashboard"
  >("landing")

  return (
    <div className="min-h-screen">
      {currentPage === "landing" && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === "login" && <LoginPage />}
      {currentPage === "signup" && <SignupPage />}
      {currentPage === "subscription" && <SubscriptionPlans />}
      {currentPage === "profile" && <ProfilePage />}
      {currentPage === "tabs" && <CategorizedTabsPage />}
      {currentPage === "youtube" && <YouTubeHelperPage />}
      {currentPage === "dashboard" && <Dashboard />}
    </div>
  )
}