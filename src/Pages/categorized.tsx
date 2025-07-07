"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Dashboard from './dashboard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Sparkles,
  Search,
  Plus,
  ExternalLink,
  Trash2,
  Move,
  FileText,
  FolderOpen,
  Calendar,
  Filter,
} from "lucide-react"

interface Tab {
  id: number
  title: string
  url: string
  category: string
  summary: string
  savedAt: string
  favicon?: string
}

interface Category {
  name: string
  count: number
  color: string
}

export default function CategorizedTabsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  // Mock data
  const categories: Category[] = [
    { name: "Development", count: 15, color: "bg-blue-100 text-blue-700" },
    { name: "Design", count: 8, color: "bg-purple-100 text-purple-700" },
    { name: "Crypto", count: 12, color: "bg-yellow-100 text-yellow-700" },
    { name: "Research", count: 6, color: "bg-green-100 text-green-700" },
    { name: "Learning", count: 9, color: "bg-red-100 text-red-700" },
    { name: "News", count: 4, color: "bg-gray-100 text-gray-700" },
  ]

  const tabs: Tab[] = [
    {
      id: 1,
      title: "React Documentation - Getting Started",
      url: "https://react.dev/learn",
      category: "Development",
      summary:
        "Complete guide to getting started with React, including installation, basic concepts, and creating your first component.",
      savedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "CSS Grid Layout Guide",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      category: "Design",
      summary:
        "Comprehensive guide to CSS Grid layout with examples, properties, and best practices for modern web design.",
      savedAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Bitcoin Price Analysis",
      url: "https://coindesk.com/price/bitcoin",
      category: "Crypto",
      summary: "Latest Bitcoin price movements, market analysis, and expert predictions for cryptocurrency trends.",
      savedAt: "2024-01-13",
    },
    {
      id: 4,
      title: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/",
      category: "Development",
      summary: "Official TypeScript documentation covering all language features, types, and advanced concepts.",
      savedAt: "2024-01-12",
    },
    {
      id: 5,
      title: "Figma Design System",
      url: "https://www.figma.com/design-systems/",
      category: "Design",
      summary: "Guide to creating and maintaining design systems in Figma for consistent UI/UX design.",
      savedAt: "2024-01-11",
    },
    {
      id: 6,
      title: "Machine Learning Basics",
      url: "https://coursera.org/learn/machine-learning",
      category: "Learning",
      summary:
        "Introduction to machine learning concepts, algorithms, and practical applications in modern technology.",
      savedAt: "2024-01-10",
    },
  ]

  const filteredTabs = tabs.filter((tab) => {
    const matchesSearch =
      tab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tab.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tab.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const groupedTabs = filteredTabs.reduce(
    (acc, tab) => {
      if (!acc[tab.category]) {
        acc[tab.category] = []
      }
      acc[tab.category].push(tab)
      return acc
    },
    {} as Record<string, Tab[]>,
  )

  const handleDeleteTab = (tabId: number) => {
    console.log("Deleting tab:", tabId)
    // Handle delete logic here
  }

  const handleMoveTab = (tabId: number, newCategory: string) => {
    console.log("Moving tab:", tabId, "to category:", newCategory)
    // Handle move logic here
  }

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      console.log("Creating category:", newCategoryName)
      setNewCategoryName("")
      setIsCreateCategoryOpen(false)
      // Handle create category logic here
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
              <span className="text-xl font-bold text-gray-900">AI Tab Saver</span>
            </div>
            <Button variant="ghost">Back to Dashboard</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categorized Tabs</h1>
          <p className="text-gray-600">Organize and manage your saved tabs by category</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tabs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isCreateCategoryOpen} onOpenChange={setIsCreateCategoryOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="mr-2 h-4 w-4" />
                  New Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>Add a new category to organize your tabs</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input
                      id="category-name"
                      placeholder="Enter category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateCategoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateCategory}>Create Category</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Category Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.name ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? "all" : category.name)}
              >
                <CardContent className="p-4 text-center">
                  <Badge className={`${category.color} mb-2`}>{category.name}</Badge>
                  <p className="text-2xl font-bold text-gray-900">{category.count}</p>
                  <p className="text-xs text-gray-500">tabs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs by Category */}
        <div className="space-y-8">
          {Object.entries(groupedTabs).map(([categoryName, categoryTabs]) => (
            <div key={categoryName}>
              <div className="flex items-center space-x-2 mb-4">
                <FolderOpen className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">{categoryName}</h2>
                <Badge variant="secondary">{categoryTabs.length}</Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTabs.map((tab) => (
                  <Card key={tab.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium leading-tight line-clamp-2">{tab.title}</CardTitle>
                        <div className="flex space-x-1 ml-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(tab.url, "_blank")}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Move className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Move Tab</DialogTitle>
                                <DialogDescription>Select a new category for this tab</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Select onValueChange={(value) => handleMoveTab(tab.id, value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((category) => (
                                      <SelectItem key={category.name} value={category.name}>
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteTab(tab.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3">{tab.summary}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {tab.savedAt}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {tab.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTabs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tabs found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
