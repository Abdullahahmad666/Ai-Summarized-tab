"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Clock, MessageSquare, Users, Headphones } from 'lucide-react'
import { useRouter } from "next/navigation"


export default function ContactPage() {
    const router = useRouter();
    const handletoPage = () => {
        router.push('/landingpage');
    }
    const handletoDashboard = () => {
        router.push('/dashboard');
    }
    const handletoContact = () => {
        router.push('/contact-page');
    }   
    const handletoSubscription = () => {
        router.push('/subscription');
    }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success/error randomly for demo
      if (Math.random() > 0.2) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setErrors({})
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    // Reset submit status when user starts typing again
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "support@aitabsaver.com",
      description: "Send us an email anytime",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "San Francisco, CA",
      description: "Our headquarters location",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM PST",
    },
  ]

  const supportOptions = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "General Inquiries",
      description: "Questions about our product or services",
      response: "We typically respond within 24 hours",
    },
    {
      icon: <Headphones className="h-6 w-6 text-green-600" />,
      title: "Technical Support",
      description: "Need help with the extension or features",
      response: "Priority support for Pro users",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Business Partnerships",
      description: "Interested in partnering with us",
      response: "We'll connect you with our team",
    },
  ]

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
                onClick={handletoPage}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={handletoDashboard}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </button>
              <span onClick={handletoContact} className="text-sm font-medium text-blue-600">Contact</span>
            </nav>

            <Button
              onClick={handletoPage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about AI Tab Saver? We're here to help and would love to hear from you.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {supportOptions.map((option, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {option.icon}
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription className="text-sm">{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {option.response}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Thank you for your message! We'll get back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Sorry, there was an error sending your message. Please try again or contact us directly.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`transition-all duration-200 ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-blue-500 focus:ring-blue-500"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`transition-all duration-200 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-blue-500 focus:ring-blue-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`transition-all duration-200 ${
                        errors.subject
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your question or feedback..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`transition-all duration-200 resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
                <CardDescription>
                  Prefer to reach out directly? Here are our contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <div className="text-blue-600">{info.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{info.label}</p>
                      <p className="text-gray-700 font-medium">{info.value}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Quick Help</CardTitle>
                <CardDescription>
                  Looking for immediate answers? Check out these resources.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="font-medium text-gray-900">How to install the extension?</div>
                    <div className="text-sm text-gray-600">Step-by-step installation guide</div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="font-medium text-gray-900">Pricing and plans</div>
                    <div className="text-sm text-gray-600">Compare free vs pro features</div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="font-medium text-gray-900">Privacy and security</div>
                    <div className="text-sm text-gray-600">How we protect your data</div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-sm text-gray-600 mb-1">We typically respond within</p>
                  <p className="text-2xl font-bold text-blue-600">24 hours</p>
                  <p className="text-xs text-gray-500 mt-2">Pro users get priority support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team is always happy to help. Don't hesitate to reach out if you need assistance with anything
                related to AI Tab Saver.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handletoDashboard}
                  variant="outline"
                  className="border-2 bg-transparent"
                >
                  View Dashboard
                </Button>
                <Button
                  onClick={handletoSubscription}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Upgrade to Pro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
