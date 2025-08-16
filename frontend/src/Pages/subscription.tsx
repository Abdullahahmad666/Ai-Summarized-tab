"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation";
import { Sparkles, Check, X, Crown,User, CreditCard, Shield, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Dashboard from "./dashboard"



export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro" | null>(null)

  const handleSelectPlan = (plan: "free" | "pro") => {
    setSelectedPlan(plan)
    // Handle plan selection logic here
    console.log(`Selected ${plan} plan`)
  }

  const handlePayment = (method: "stripe" | "paypal") => {
    console.log(`Payment with ${method}`)
    // Handle payment integration here
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
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full power of AI-driven tab management with our Pro features
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Save 20%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-gray-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
              <CardDescription>Perfect for trying out AI Tab Saver</CardDescription>
              <div className="text-4xl font-bold text-gray-900 mt-4">$0</div>
              <p className="text-gray-600">Forever free</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Save up to 3 tabs only</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>5 AI tooltips per day</span>
                </div>
                <div className="flex items-center">
                  <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-500">2 categorization</span>
                </div>
                <div className="flex items-center">
                  <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-500">2 AI summaries</span>
                </div>
                <div className="flex items-center">
                  <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-500">No learning stack</span>
                </div>
                <div className="flex items-center">
                  <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-500">Basic support</span>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-transparent"
                variant="outline"
                onClick={() => handleSelectPlan("free")}
                disabled={selectedPlan === "free"}
              >
                {selectedPlan === "free" ? "Current Plan" : "Select Free Plan"}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-blue-500 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">Most Popular</Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Pro Plan</CardTitle>
              <CardDescription>Unlock the full power of AI</CardDescription>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                ${billingCycle === "monthly" ? "14.99" : "155.99"}
              </div>
              <p className="text-gray-600">per {billingCycle === "monthly" ? "month" : "year"}</p>
              {billingCycle === "yearly" && <p className="text-sm text-green-600 font-medium">Save $23.89 annually!</p>}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Unlimited tabs</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Unlimited summaries & tooltips</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Smart categorization</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>AI learning stack</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Advanced search & filters</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Priority support</span>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => handleSelectPlan("pro")}
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment Section */}
        {selectedPlan === "pro" && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Complete Your Purchase
                </CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    onClick={() => handlePayment("stripe")}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6" />
                      <div className="text-left">
                        <div className="font-semibold">Pay with Stripe</div>
                        <div className="text-xs opacity-90">Credit/Debit Card</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    className="h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                    onClick={() => handlePayment("paypal")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">P</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">PayPal</div>
                        <div className="text-xs opacity-90">Fast & Secure</div>
                      </div>
                    </div>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment processing • Cancel anytime</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Feature Comparison</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Free</th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Pro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Saved Tabs</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">3 tabs</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">AI Tooltips</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">5/day</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">AI Summaries</td>
                        <td className="px-6 py-4 text-center">
                          <X className="h-4 w-4 text-gray-400 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">Smart Categorization</td>
                        <td className="px-6 py-4 text-center">
                          <X className="h-4 w-4 text-gray-400 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Learning Stack</td>
                        <td className="px-6 py-4 text-center">
                          <X className="h-4 w-4 text-gray-400 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">Priority Support</td>
                        <td className="px-6 py-4 text-center">
                          <X className="h-4 w-4 text-gray-400 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
