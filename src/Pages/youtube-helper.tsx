"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Sparkles,
  Play,
  BookOpen,
  ExternalLink,
  Save,
  Clock,
  Eye,
  ThumbsUp,
  Share,
  Download,
  Brain,
  Lightbulb,
  FileText,
  Video,
} from "lucide-react"

export default function YouTubeHelperPage() {
  const [isSaved, setIsSaved] = useState(false)

  // Mock YouTube video data
  const videoData = {
    id: "dQw4w9WgXcQ",
    title: "Advanced React Patterns: Compound Components and Render Props",
    channel: "React Mastery",
    duration: "24:35",
    views: "125K",
    likes: "3.2K",
    uploadDate: "2 days ago",
    thumbnail: "/placeholder.svg?height=360&width=640",
    description:
      "Learn advanced React patterns including compound components, render props, and custom hooks. This tutorial covers real-world examples and best practices for building scalable React applications.",
  }

  // Mock AI-generated summary
  const aiSummary = {
    overview:
      "This video covers advanced React patterns that help create more flexible and reusable components. The instructor demonstrates compound components, render props, and custom hooks with practical examples.",
    keyPoints: [
      "Compound components allow for flexible API design",
      "Render props enable component logic sharing",
      "Custom hooks extract and reuse stateful logic",
      "These patterns improve code maintainability",
    ],
    difficulty: "Intermediate",
    estimatedTime: "25 minutes",
  }

  // Mock prerequisites
  const prerequisites = [
    {
      type: "article",
      title: "React Fundamentals: Components and Props",
      url: "https://react.dev/learn/passing-props-to-a-component",
      description: "Understanding basic React component concepts and prop passing",
      readTime: "10 min",
    },
    {
      type: "video",
      title: "JavaScript ES6+ Features",
      url: "https://youtube.com/watch?v=example",
      description: "Modern JavaScript features used in React development",
      duration: "15 min",
    },
    {
      type: "article",
      title: "React Hooks Introduction",
      url: "https://react.dev/reference/react",
      description: "Basic understanding of useState and useEffect hooks",
      readTime: "8 min",
    },
  ]

  // Mock key terms with tooltips
  const keyTerms = [
    {
      term: "Compound Components",
      definition:
        "A pattern where components work together to form a complete UI, sharing implicit state through React context.",
    },
    {
      term: "Render Props",
      definition:
        "A technique for sharing code between React components using a prop whose value is a function that returns a React element.",
    },
    {
      term: "Custom Hooks",
      definition:
        "JavaScript functions that start with 'use' and can call other hooks, allowing you to extract component logic into reusable functions.",
    },
  ]

  const handleSaveToLearningStack = () => {
    setIsSaved(true)
    console.log("Saved to learning stack:", videoData.title)
    // Handle save logic here
  }

  const renderTextWithTooltips = (text: string) => {
    let result = text
    keyTerms.forEach((term) => {
      const regex = new RegExp(`\\b${term.term}\\b`, "gi")
      result = result.replace(
        regex,
        `<tooltip data-term="${term.term}" data-definition="${term.definition}">$&</tooltip>`,
      )
    })
    return result
  }

  return (
    <TooltipProvider>
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden">
                    <img
                      src={videoData.thumbnail || "/placeholder.svg"}
                      alt={videoData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button size="lg" className="rounded-full w-16 h-16 bg-red-600 hover:bg-red-700">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {videoData.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{videoData.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span className="font-medium">{videoData.channel}</span>
                      <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        {videoData.views} views
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {videoData.likes}
                      </span>
                      <span>{videoData.uploadDate}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSaveToLearningStack}
                        className={`${
                          isSaved
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        }`}
                        disabled={isSaved}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isSaved ? "Saved to Learning Stack" : "Save to Learning Stack"}
                      </Button>
                      <Button variant="outline">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-blue-600" />
                    AI-Generated Summary
                  </CardTitle>
                  <CardDescription>Key insights and takeaways from this video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
                    <p className="text-gray-700">{aiSummary.overview}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Key Points</h3>
                    <ul className="space-y-1">
                      {aiSummary.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-6 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{aiSummary.difficulty}</Badge>
                      <span className="text-sm text-gray-600">Difficulty</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{aiSummary.estimatedTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Description with Tooltips */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Learn advanced React patterns including{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="underline decoration-dotted cursor-help text-blue-600">
                            compound components
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            A pattern where components work together to form a complete UI, sharing implicit state
                            through React context.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      ,{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="underline decoration-dotted cursor-help text-blue-600">render props</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            A technique for sharing code between React components using a prop whose value is a function
                            that returns a React element.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      , and{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="underline decoration-dotted cursor-help text-blue-600">custom hooks</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            JavaScript functions that start with 'use' and can call other hooks, allowing you to extract
                            component logic into reusable functions.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      . This tutorial covers real-world examples and best practices for building scalable React
                      applications.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prerequisites */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
                    Recommended Prerequisites
                  </CardTitle>
                  <CardDescription>Resources to help you get the most out of this video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prerequisites.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {item.type === "article" ? (
                            <FileText className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Video className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {item.type === "article" ? item.readTime : item.duration}
                            </span>
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Open
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Learning Progress */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-green-600" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>React Fundamentals</span>
                      <span className="text-green-600">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Advanced Patterns</span>
                      <span className="text-blue-600">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Performance Optimization</span>
                      <span className="text-gray-500">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Related Videos */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm">Up Next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "React Performance Optimization", duration: "18:42" },
                    { title: "Testing React Components", duration: "22:15" },
                    { title: "State Management with Context", duration: "16:30" },
                  ].map((video, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Play className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                        <p className="text-xs text-gray-500">{video.duration}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
