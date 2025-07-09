"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sparkles, User, Mail, Crown, Settings, BarChart3, FileText, Save, ExternalLink, Calendar } from "lucide-react"
import Dashboard from "./dashboard"

 interface Profile {
  onNavigate?: (
    page: "landing" | "login" | "signup" | "subscription" | "profile" | "tabs" | "youtube" | "dashboard",
  ) => void
}

export default function ProfilePage({ onNavigate }: Profile) {
  const [preferences, setPreferences] = useState({
    autoSave: true,
    language: "english",
    notifications: true,
  })

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    subscriptionStatus: "pro",
    joinDate: "March 2024",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  // Mock usage stats
  const usageStats = {
    tabsSaved: 247,
    tooltipsUsed: 1834,
    summariesGenerated: 156,
    categoriesCreated: 12,
    monthlyLimit: 1000,
  }

  // Mock saved tabs
  const savedTabs = [
    {
      id: 1,
      title: "React Documentation - Getting Started",
      url: "https://react.dev/learn",
      category: "Development",
      savedAt: "2024-01-15",
      summary: "Complete guide to getting started with React, including installation and basic concepts.",
    },
    {
      id: 2,
      title: "CSS Grid Layout Guide",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      category: "Design",
      savedAt: "2024-01-14",
      summary: "Comprehensive guide to CSS Grid layout with examples and best practices.",
    },
    {
      id: 3,
      title: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/",
      category: "Development",
      savedAt: "2024-01-13",
      summary: "Official TypeScript documentation covering all language features and concepts.",
    },
  ]

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handleSavePreferences = () => {
    console.log("Saving preferences:", preferences)
    // Handle save preferences logic here
  }
  const router = useRouter();
    const handleBackClick = () => {
      router.push('/dashboard');
    }
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Tab Saver</span>
            </div>
             <div className="flex justify-end items-center space-x-4">
  <Button variant="ghost" onClick={handleBackClick}>
    Back to Dashboard
  </Button>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        size="sm"
        variant="outline"
        className="rounded-full w-10 h-10 p-0 bg-transparent"
      >
        <User className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      sideOffset={8}
      className="w-48 bg-white shadow-md border"
    >
      <DropdownMenuItem onClick={() => onNavigate?.("profile")}>Profile</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onNavigate?.("login")}>Login</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onNavigate?.("signup")}>Sign Up</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onNavigate?.("tabs")}>My Tabs</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onNavigate?.("youtube")}>YouTube Helper</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onNavigate?.("dashboard")}>Dashboard</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl">{userData.name}</CardTitle>
                <CardDescription className="flex items-center justify-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{userData.email}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subscription</span>
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Crown className="mr-1 h-3 w-3" />
                    Pro Plan
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium">{userData.joinDate}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tabs Saved</span>
                    <span className="font-medium">{usageStats.tabsSaved}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tooltips Used</span>
                    <span className="font-medium">{usageStats.tooltipsUsed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>AI Summaries</span>
                    <span className="font-medium">{usageStats.summariesGenerated}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Categories</span>
                    <span className="font-medium">{usageStats.categoriesCreated}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Usage</span>
                    <span className="font-medium">
                      {usageStats.tooltipsUsed}/{usageStats.monthlyLimit}
                    </span>
                  </div>
                  <Progress value={(usageStats.tooltipsUsed / usageStats.monthlyLimit) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Unlimited with Pro plan</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preferences */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your AI Tab Saver experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-save">Tab Auto-Save</Label>
                        <p className="text-sm text-gray-500">Automatically save tabs when browsing</p>
                      </div>
                      <Switch
                        id="auto-save"
                        checked={preferences.autoSave}
                        onCheckedChange={(checked) => handlePreferenceChange("autoSave", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Notifications</Label>
                        <p className="text-sm text-gray-500">Receive usage and feature updates</p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={preferences.notifications}
                        onCheckedChange={(checked) => handlePreferenceChange("notifications", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Summarization Language</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => handlePreferenceChange("language", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Saved Tabs */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Recent Saved Tabs
                </CardTitle>
                <CardDescription>Your most recently saved tabs and summaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedTabs.map((tab) => (
                    <div key={tab.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900 truncate">{tab.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {tab.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{tab.summary}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {tab.savedAt}
                            </span>
                            <a
                              href={tab.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center hover:text-blue-600"
                            >
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Open
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline">View All Saved Tabs</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
