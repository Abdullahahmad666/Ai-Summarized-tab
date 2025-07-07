"use client"

import { useState, useEffect } from "react"
import Image from "next/image";

interface SavedTab {
  id: string
  title: string
  url: string
  favicon?: string
  savedAt: string
  category: string
}

declare global {
  interface Window {
    chrome: any
  }
}

const Popup = () => {
  const [savedTabs, setSavedTabs] = useState<SavedTab[]>([])
  const [expandedTab, setExpandedTab] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSavedTabs()
  }, [])

  const loadSavedTabs = async () => {
    try {
      if (typeof window !== "undefined" && window.chrome?.storage) {
        const result = await window.chrome.storage.local.get(["savedTabs"])
        const tabs = result.savedTabs || []

        // Sort by saved date (newest first) and limit to 3 for free users
        const sortedTabs = tabs
          .sort((a: SavedTab, b: SavedTab) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
          .slice(0, 3)

        setSavedTabs(sortedTabs)
      }
    } catch (error) {
      console.error("Error loading saved tabs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTabClick = (tabId: string) => {
    setExpandedTab(expandedTab === tabId ? null : tabId)
  }

  const openTab = (url: string) => {
    if (typeof window !== "undefined" && window.chrome?.tabs) {
      window.chrome.tabs.create({ url })
    }
  }

  const deleteTab = async (tabId: string) => {
    try {
      if (typeof window !== "undefined" && window.chrome?.storage) {
        const result = await window.chrome.storage.local.get(["savedTabs"])
        const tabs = result.savedTabs || []
        const updatedTabs = tabs.filter((tab: SavedTab) => tab.id !== tabId)

        await window.chrome.storage.local.set({ savedTabs: updatedTabs })
        setSavedTabs(updatedTabs.slice(0, 3))
        setExpandedTab(null)
      }
    } catch (error) {
      console.error("Error deleting tab:", error)
    }
  }

  const openLandingPage = () => {
    if (typeof window !== "undefined" && window.chrome?.tabs) {
      window.chrome.tabs.create({ url: "https://aitabsaver.app" })
    }
  }

  const openDashboard = () => {
    if (typeof window !== "undefined" && window.chrome?.runtime) {
      window.chrome.tabs.create({ url: window.chrome.runtime.getURL("dashboard.tsx") })
    }
  }

  const saveCurrentTab = async () => {
    try {
      if (typeof window !== "undefined" && window.chrome?.tabs) {
        const [activeTab] = await window.chrome.tabs.query({ active: true, currentWindow: true })

        const newTab: SavedTab = {
          id: Date.now().toString(),
          title: activeTab.title,
          url: activeTab.url,
          favicon: activeTab.favIconUrl,
          savedAt: new Date().toISOString(),
          category: "Uncategorized",
        }

        const result = await window.chrome.storage.local.get(["savedTabs"])
        const existingTabs = result.savedTabs || []

        // Check if tab already exists
        const tabExists = existingTabs.some((tab: SavedTab) => tab.url === activeTab.url)
        if (tabExists) {
          return
        }

        const updatedTabs = [newTab, ...existingTabs]
        await window.chrome.storage.local.set({ savedTabs: updatedTabs })

        // Reload the display
        loadSavedTabs()
      }
    } catch (error) {
      console.error("Error saving tab:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const truncateTitle = (title: string, maxLength = 45) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  if (loading) {
    return (
      <div className="w-[380px] min-h-[500px] max-h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 font-sans text-sm text-slate-800 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <div className="text-lg">✨</div>
            <span className="font-semibold text-base">AI Tab Saver</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <div className="w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-3"></div>
          <p>Loading your saved tabs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[380px] min-h-[500px] max-h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 font-sans text-sm text-slate-800 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="flex items-center gap-2">
          <div className="text-lg">✨</div>
          <span className="font-semibold text-base">AI Tab Saver</span>
        </div>
        <button
          className="bg-white/20 hover:bg-white/30 border-none rounded-md p-1.5 text-white cursor-pointer transition-colors duration-200"
          onClick={openDashboard}
          title="Open Dashboard"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
      </div>

      {/* Save Current Tab Button */}
      <div className="p-4 border-b border-slate-200">
        <button
          className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none rounded-lg font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0"
          onClick={saveCurrentTab}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17,21 17,13 7,13 7,21" />
            <polyline points="7,3 7,8 15,8" />
          </svg>
          Save Current Tab
        </button>
      </div>

      {/* Saved Tabs List */}
      <div className="flex-1 px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
        <div className="flex items-center justify-between py-4 border-b border-slate-200 mb-3">
          <h3 className="m-0 text-base font-semibold text-slate-800">Recent Saves</h3>
          <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-xl text-xs font-medium">
            {savedTabs.length}/3
          </span>
        </div>

        {savedTabs.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <div className="text-3xl mb-3">📑</div>
            <p className="font-medium text-slate-600 mb-1">No saved tabs yet</p>
            <span className="text-xs">Click "Save Current Tab" to get started</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 pb-4">
            {savedTabs.map((tab) => (
              <div
                key={tab.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300"
              >
                <div
                  className="flex items-center justify-between p-3 cursor-pointer transition-colors duration-200 hover:bg-slate-50"
                  onClick={() => handleTabClick(tab.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                      {tab.favicon ? (
                        <Image
                          src={tab.favicon || "/placeholder.svg"}
                          alt=""
                          width="16"
                          height="16"
                          className="rounded-sm"
                        />
                      ) : (
                        <div className="text-xs">🌐</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-medium text-slate-800 mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap"
                        title={tab.title}
                      >
                        {truncateTitle(tab.title)}
                      </div>
                      <div className="text-xs text-slate-500">{formatDate(tab.savedAt)}</div>
                    </div>
                  </div>
                  <div
                    className={`flex-shrink-0 transition-transform duration-200 text-slate-400 ${expandedTab === tab.id ? "rotate-180" : ""}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                {expandedTab === tab.id && (
                  <div className="flex gap-2 p-3 bg-slate-50 border-t border-slate-200">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 rounded-md bg-white text-slate-600 text-xs font-medium cursor-pointer transition-all duration-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                      onClick={() => openTab(tab.url)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Open
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 rounded-md bg-white text-slate-600 text-xs font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white hover:border-red-500"
                      onClick={() => deleteTab(tab.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6" />
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade Section */}
      <div className="p-4 bg-gradient-to-r from-yellow-100 to-amber-100 border-t border-slate-200">
        <div className="flex items-start gap-3 mb-3">
          <div className="text-base mt-0.5">⚡</div>
          <div className="flex-1">
            <p className="m-0 mb-1 font-medium text-amber-800 text-xs">
              You&#39;ve reached the free limit of 3 saved tabs.
            </p>
            <span className="text-xs text-amber-700">Upgrade for unlimited saves, AI summaries, and more.</span>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none rounded-lg p-3 font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30"
          onClick={openLandingPage}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">Unlock Full Access</span>
            <div className="text-base">👑</div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 py-3 px-5 bg-slate-50 border-t border-slate-200">
        <button
          className="bg-none border-none text-slate-500 text-xs cursor-pointer transition-colors duration-200 hover:text-blue-600"
          onClick={openDashboard}
        >
          Dashboard
        </button>
        <span className="text-slate-300 text-xs">•</span>
        <button
          className="bg-none border-none text-slate-500 text-xs cursor-pointer transition-colors duration-200 hover:text-blue-600"
          onClick={openLandingPage}
        >
          Upgrade
        </button>
      </div>
    </div>
  )
}

export default Popup
