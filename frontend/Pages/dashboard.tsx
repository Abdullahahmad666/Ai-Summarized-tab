"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import {
  Sparkles,
  BarChart3,
  Crown,
  FileText,
  Video,
  User,
  CreditCard,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react"
import { useRouter } from "next/router"




export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  // Mock data for dashboard overview
  const stats = {
    totalTabs: 247,
    categoriesCreated: 12,
    aiSummaries: 156,
    weeklyGrowth: 23,
  }

  const recentActivity = [
    {
      type: "tab_saved",
      title: "React Documentation - Getting Started",
      category: "Development",
      time: "2 hours ago",
    },
    {
      type: "category_created",
      title: "Machine Learning",
      time: "1 day ago",
    },
    {
      type: "summary_generated",
      title: "TypeScript Handbook",
      time: "2 days ago",
    },
    {
      type: "tab_saved",
      title: "CSS Grid Layout Guide",
      category: "Design",
      time: "3 days ago",
    },
  ]

  const quickActions = [
    {
      title: "Save Current Tab",
      description: "Quickly save the active browser tab",
      icon: <FileText className="h-5 w-5" />,
      action: () => console.log("Save current tab"),
    },
    {
      title: "Create Category",
      description: "Organize tabs with a new category",
      icon: <Plus className="h-5 w-5" />,
      action: () => console.log("Create category"),
    },
    {
      title: "Generate Summary",
      description: "Get AI summary of saved content",
      icon: <Sparkles className="h-5 w-5" />,
      action: () => console.log("Generate summary"),
    },
    {
      title: "Export Data",
      description: "Download your saved tabs",
      icon: <TrendingUp className="h-5 w-5" />,
      action: () => console.log("Export data"),
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "tab_saved":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "category_created":
        return <Plus className="h-4 w-4 text-green-600" />
      case "summary_generated":
        return <Sparkles className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "tab_saved":
        return "bg-blue-100"
      case "category_created":
        return "bg-green-100"
      case "summary_generated":
        return "bg-purple-100"
      default:
        return "bg-gray-100"
    }
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
              <span className="text-xl font-bold text-gray-900">AI Tab Saver Dashboard</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Crown className="mr-1 h-3 w-3" />
                Pro
              </Badge>
                <div className="flex justify-end items-center space-x-4">
  
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
      <DropdownMenuItem onClick={() => router.push("/landingpage")}>Home</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/dashboard")}>Dashboard</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/login")}>Login</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/signup")}>Sign Up</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/categorized")}>My Tabs</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/youtube-helper")}>YouTube Helper</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/subscription")}>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
              <p className="text-gray-600">Here&#39;s what&#39;s happening with your saved tabs</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tabs Saved</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTabs}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />+{stats.weeklyGrowth} this week
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                  <Plus className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.categoriesCreated}</div>
                  <p className="text-xs text-gray-600 mt-1">Organized collections</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Summaries</CardTitle>
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.aiSummaries}</div>
                  <p className="text-xs text-gray-600 mt-1">Generated this month</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pro Features</CardTitle>
                  <Crown className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">∞</div>
                  <p className="text-xs text-gray-600 mt-1">Unlimited access</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-yellow-600" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={action.action}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          {action.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{action.title}</p>
                          <p className="text-xs text-gray-500 truncate">{action.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-gray-600" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your latest tab saves and actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={`flex-shrink-0 w-8 h-8 ${getActivityColor(activity.type)} rounded-full flex items-center justify-center`}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{activity.time}</span>
                            </div>
                            {activity.category && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {activity.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          
        </Tabs>
      </div>
    </div>
  )
}
