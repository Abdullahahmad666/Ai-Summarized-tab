import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Chrome,
  Sparkles,
  FolderOpen,
  FileText,
  Zap,
  Check,
  X,
  Download,
  Crown,
  Home,
  Info,
  Mail,
  FileCheck,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react"
import Link from "next/link"

export default function Component() {
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
              <Link
                href="#features"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                How it Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
            </nav>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Chrome className="mr-2 h-4 w-4" />
              Install Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Chrome Extension
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">AI Tab Saver</h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Save, Summarize & Categorize Your Tabs with AI
            </p>

            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Never lose track of important tabs again. Our AI automatically summarizes web pages, provides intelligent
              tooltips, and organizes your tabs into smart categories for effortless browsing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Install Free Extension
              </Button>
              <Button size="lg" variant="outline" className="border-2 bg-transparent">
                <Crown className="mr-2 h-5 w-5" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">See AI Tab Saver in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch how our AI transforms your browsing experience with intelligent tab management
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                  <p className="text-lg font-medium">Demo Video</p>
                  <p className="text-sm text-gray-300">Click to play AI Tab Saver demo</p>
                </div>
              </div>

              {/* Simulated browser tabs overlay */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex space-x-2">
                  <div className="bg-white/90 rounded-t-lg px-3 py-2 text-xs font-medium text-gray-700 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1 text-blue-600" />
                    AI Summary
                  </div>
                  <div className="bg-white/70 rounded-t-lg px-3 py-2 text-xs text-gray-600">Research Article</div>
                  <div className="bg-white/70 rounded-t-lg px-3 py-2 text-xs text-gray-600">Documentation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with AI Tab Saver in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Install Extension</h3>
              <p className="text-gray-600">
                Add AI Tab Saver to Chrome from the Web Store with one click. No setup required.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Browse Normally</h3>
              <p className="text-gray-600">
                Continue browsing as usual. Our AI works silently in the background, analyzing your tabs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Enjoy Smart Organization</h3>
              <p className="text-gray-600">
                Access AI summaries, smart tooltips, and automatic categorization of all your tabs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your browsing experience with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>AI Summaries</CardTitle>
                <CardDescription>
                  Get instant AI-generated summaries of any webpage to quickly understand content without reading
                  everything.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Smart Tooltips</CardTitle>
                <CardDescription>
                  Hover over any tab to see intelligent tooltips with key information and context about the page.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FolderOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Auto Categorization</CardTitle>
                <CardDescription>
                  Automatically organize tabs into smart categories like Work, Research, Shopping, and Entertainment.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade when you need more powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">$0</div>
                <p className="text-gray-600 mt-2">Perfect for casual browsing</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Up to 10 tab summaries per day</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Basic smart tooltips</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>3 auto-categories</span>
                </div>
                <div className="flex items-center">
                  <X className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-500">Advanced AI features</span>
                </div>
                <div className="flex items-center">
                  <X className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-500">Custom categories</span>
                </div>
                <div className="flex items-center">
                  <X className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-500">Priority support</span>
                </div>

                <Button className="w-full mt-8 bg-transparent" variant="outline">
                  <Chrome className="mr-2 h-4 w-4" />
                  Install Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-blue-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">$9.99</div>
                <p className="text-gray-600 mt-2">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Unlimited tab summaries</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Advanced smart tooltips</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Unlimited auto-categories</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Advanced AI features</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Custom categories</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span>Priority support</span>
                </div>

                <Button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <div className="bg-red-500 text-white p-4">
  If you see red background, Tailwind is working!
</div>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Browsing?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already upgraded their tab management with AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Chrome className="mr-2 h-5 w-5" />
              Install Now - It&#39;s Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI Tab Saver</span>
              </div>
              <p className="text-gray-400 max-w-md">
                The smartest way to manage your browser tabs with AI-powered summaries, tooltips, and automatic
                categorization.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
                <Link href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Info className="mr-2 h-4 w-4" />
                  About
                </Link>
                <Link href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Link>
                <Link href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Terms
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Tab Saver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
