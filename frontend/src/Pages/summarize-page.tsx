"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, ArrowLeft, ExternalLink, Zap, Clock, FileText, Brain, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"
interface SummarizePageProps {
  tabData?: {
    id: number
    title: string
    url: string
    category: string
    savedAt: string
  }
}

export default function SummarizePage({ tabData }: SummarizePageProps) {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Default tab data if none provided (for demo purposes)
  const defaultTabData = {
    id: 1,
    title: "React Documentation - Getting Started",
    url: "https://react.dev/learn",
    category: "Development",
    savedAt: "2024-01-15",
  }

  const currentTab = tabData || defaultTabData

  const handleSummarize = async () => {
    setIsLoading(true)
    setError(null)
    setSummary(null)

    try {
      // Simulate AI API call with random delay
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000))

      // Mock AI-generated summaries based on category
      const mockSummaries = {
        Development: `This comprehensive React documentation provides an excellent introduction to modern React development. Key highlights include:

• **Component Fundamentals**: Learn how to create functional components using hooks like useState and useEffect
• **JSX Syntax**: Master the declarative syntax that makes React components readable and maintainable  
• **State Management**: Understand how to manage component state and pass data between components
• **Event Handling**: Implement user interactions with proper event handling patterns
• **Best Practices**: Follow React's recommended patterns for building scalable applications

The guide covers essential concepts like component lifecycle, conditional rendering, and list rendering. It's particularly valuable for developers transitioning from class components to modern functional components with hooks.

**Recommended for**: Beginners to intermediate React developers looking to build solid foundations.`,

        Design: `This design resource offers valuable insights into modern UI/UX principles and practical implementation strategies. Main takeaways include:

• **Design Systems**: How to create consistent, scalable design languages across products
• **Color Theory**: Strategic use of color palettes to enhance user experience and accessibility
• **Typography**: Best practices for readable, hierarchical text layouts
• **Layout Principles**: Grid systems, spacing, and visual hierarchy techniques
• **User Experience**: Research-backed approaches to intuitive interface design

The content emphasizes the importance of user-centered design and provides actionable frameworks for creating engaging digital experiences.

**Recommended for**: Designers and developers working on user interface projects.`,

        Crypto: `This cryptocurrency analysis provides current market insights and technical analysis. Key points covered:

• **Market Trends**: Current price movements and trading volume analysis
• **Technical Indicators**: RSI, moving averages, and support/resistance levels
• **Market Sentiment**: Social media trends and institutional adoption signals
• **Risk Assessment**: Volatility patterns and potential market catalysts
• **Investment Perspective**: Long-term vs short-term trading considerations

The analysis suggests cautious optimism while emphasizing the importance of risk management and diversification in crypto investments.

**Recommended for**: Crypto traders and investors seeking market intelligence.`,

        default: `This web resource contains valuable information relevant to your research and learning goals. The content covers:

• **Core Concepts**: Fundamental principles and key terminology explained clearly
• **Practical Applications**: Real-world examples and implementation strategies
• **Best Practices**: Industry-standard approaches and recommended methodologies
• **Current Trends**: Latest developments and emerging patterns in the field
• **Learning Resources**: Additional materials and references for deeper understanding

The information is well-structured and provides both theoretical background and practical insights that can be immediately applied.

**Recommended for**: Anyone looking to expand their knowledge in this subject area.`,
      }

      // Simulate occasional API errors (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Failed to generate summary")
      }

      const summaryText = mockSummaries[currentTab.category as keyof typeof mockSummaries] || mockSummaries.default
      setSummary(summaryText)
    } catch (err) {
      setError("Failed to generate summary. Please try again.")
      console.error("Summary generation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push("/categorized")}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Categories
              </button>
              <span className="text-sm font-medium text-blue-600">Summarize</span>
            </nav>

            <Button
              onClick={() => router.push("/categorized")}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Categories</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/categorized")}
            variant="ghost"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Categories</span>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {currentTab.category}
            </Badge>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">Saved on {formatDate(currentTab.savedAt)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {currentTab.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <a
                href={currentTab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors truncate max-w-md"
              >
                {currentTab.url}
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summarize Action Card */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span>AI Summary</span>
                </CardTitle>
                <CardDescription>
                  Generate an intelligent summary of this webpage using our AI-powered analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!summary && !isLoading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Summarize</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Click the button below to generate an AI-powered summary of this webpage's content.
                    </p>
                    <Button
                      onClick={handleSummarize}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
                      disabled={isLoading}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Generate Summary
                    </Button>
                  </div>
                )}

                {isLoading && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Content...</h3>
                    <p className="text-gray-600 mb-4">Our AI is reading and understanding the webpage content.</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>This usually takes 10-30 seconds</span>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>{error}</span>
                      <Button
                        onClick={handleSummarize}
                        variant="outline"
                        size="sm"
                        className="ml-4"
                      >
                        Try Again
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {summary && (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Summary generated successfully! Here's what our AI found:
                      </AlertDescription>
                    </Alert>

                    <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span>AI-Generated Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                            {summary}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleSummarize}
                        variant="outline"
                        className="flex-1"
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Generate New Summary
                      </Button>
                      <Button
                        onClick={() => navigator.clipboard.writeText(summary)}
                        variant="outline"
                        className="flex-1"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Copy Summary
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tab Details */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Tab Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <div className="mt-1">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {currentTab.category}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Saved Date</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(currentTab.savedAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">URL</label>
                  <p className="mt-1 text-sm text-gray-900 break-all">{currentTab.url}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => window.open(currentTab.url, "_blank")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Original Page
                </Button>
                <Button
                  onClick={() => router.push("/categorized")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Categories
                </Button>
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our advanced AI reads and understands web content to provide intelligent summaries.
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>✓ Key points extraction</div>
                    <div>✓ Content categorization</div>
                    <div>✓ Actionable insights</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
