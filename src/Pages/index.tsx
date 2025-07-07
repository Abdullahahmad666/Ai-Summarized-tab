"use client"

import { useState } from "react"
import SubscriptionPlans from "./subscription"
import ProfilePage from "./profile"
import CategorizedTabsPage from "./categorized"
import YouTubeHelperPage from "./youtube-helper"
import Dashboard from "./dashboard"
import { Button } from "@/components/ui/button"

export default function AllPages() {
  const [currentPage, setCurrentPage] = useState<"subscription" | "profile" | "tabs" | "youtube" | "dashboard">(
    "subscription",
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex space-x-4">
            <Button
              variant={currentPage === "subscription" ? "default" : "outline"}
              onClick={() => setCurrentPage("subscription")}
            >
              Subscription Plans
            </Button>
            <Button
              variant={currentPage === "profile" ? "default" : "outline"}
              onClick={() => setCurrentPage("profile")}
            >
              Profile
            </Button>
            <Button variant={currentPage === "tabs" ? "default" : "outline"} onClick={() => setCurrentPage("tabs")}>
              Categorized Tabs
            </Button>
            <Button
              variant={currentPage === "youtube" ? "default" : "outline"}
              onClick={() => setCurrentPage("youtube")}
            >
              YouTube Helper
            </Button>
            <Button
              variant={currentPage === "dashboard" ? "default" : "outline"}
              onClick={() => setCurrentPage("dashboard")}
            >
              Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === "subscription" && <SubscriptionPlans />}
      {currentPage === "profile" && <ProfilePage />}
      {currentPage === "tabs" && <CategorizedTabsPage />}
      {currentPage === "youtube" && <YouTubeHelperPage />}
      {currentPage === "dashboard" && <Dashboard />}
    </div>
  )
}
