import { Sparkles, Home, Info, Mail, CreditCard, Twitter, Github, Linkedin } from "lucide-react"
import Link from "next/link"


export default function Footer() {
    return(
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
                <Link href="/landingpage" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
                <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Info className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <Link href="/profile" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Mail className="mr-2 h-4 w-4" />
                  ProfilePage       
                </Link>
                <Link href="/subscription" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <CreditCard className="mr-2 h-4 w-4" />
                  SubscriptionPlans
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
    )

}