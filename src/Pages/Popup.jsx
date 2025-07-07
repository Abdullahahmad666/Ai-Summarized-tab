"use client"
/*global chrome*/

import { useState, useEffect } from "react"
import "./style.css"


const Popup = () => {
  const [savedTabs, setSavedTabs] = useState([])
  const [expandedTab, setExpandedTab] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSavedTabs()
  }, [])

  const loadSavedTabs = async () => {
    try {
      const result = await chrome.storage.local.get(["savedTabs"])
      const tabs = result.savedTabs || []

      // Sort by saved date (newest first) and limit to 3 for free users
      const sortedTabs = tabs.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)).slice(0, 3)

      setSavedTabs(sortedTabs)
    } catch (error) {
      console.error("Error loading saved tabs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTabClick = (tabId) => {
    setExpandedTab(expandedTab === tabId ? null : tabId)
  }

  const openTab = (url) => {
    chrome.tabs.create({ url })
  }

  const deleteTab = async (tabId) => {
    try {
      const result = await chrome.storage.local.get(["savedTabs"])
      const tabs = result.savedTabs || []
      const updatedTabs = tabs.filter((tab) => tab.id !== tabId)

      await chrome.storage.local.set({ savedTabs: updatedTabs })
      setSavedTabs(updatedTabs.slice(0, 3))
      setExpandedTab(null)
    } catch (error) {
      console.error("Error deleting tab:", error)
    }
  }

  const openLandingPage = () => {
    chrome.tabs.create({ url: "https://aitabsaver.app" })
  }

  const openDashboard = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") })
  }

  const saveCurrentTab = async () => {
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })

      const newTab = {
        id: Date.now().toString(),
        title: activeTab.title,
        url: activeTab.url,
        favicon: activeTab.favIconUrl,
        savedAt: new Date().toISOString(),
        category: "Uncategorized",
      }

      const result = await chrome.storage.local.get(["savedTabs"])
      const existingTabs = result.savedTabs || []

      // Check if tab already exists
      const tabExists = existingTabs.some((tab) => tab.url === activeTab.url)
      if (tabExists) {
        return
      }

      const updatedTabs = [newTab, ...existingTabs]
      await chrome.storage.local.set({ savedTabs: updatedTabs })

      // Reload the display
      loadSavedTabs()
    } catch (error) {
      console.error("Error saving tab:", error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const truncateTitle = (title, maxLength = 45) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  if (loading) {
    return (
      <div className="popup-container">
        <div className="popup-header">
          <div className="logo">
            <div className="logo-icon">✨</div>
            <span className="logo-text">AI Tab Saver</span>
          </div>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your saved tabs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="popup-container">
      {/* Header */}
      <div className="popup-header">
        <div className="logo">
          <div className="logo-icon">✨</div>
          <span className="logo-text">AI Tab Saver</span>
        </div>
        <button className="dashboard-btn" onClick={openDashboard} title="Open Dashboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
      </div>

      {/* Save Current Tab Button */}
      <div className="save-section">
        <button className="save-current-btn" onClick={saveCurrentTab}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17,21 17,13 7,13 7,21" />
            <polyline points="7,3 7,8 15,8" />
          </svg>
          Save Current Tab
        </button>
      </div>

      {/* Saved Tabs List */}
      <div className="tabs-section">
        <div className="section-header">
          <h3>Recent Saves</h3>
          <span className="tab-count">{savedTabs.length}/3</span>
        </div>

        {savedTabs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📑</div>
            <p>No saved tabs yet</p>
            <span>Click "Save Current Tab" to get started</span>
          </div>
        ) : (
          <div className="tabs-list">
            {savedTabs.map((tab) => (
              <div key={tab.id} className="tab-card">
                <div className="tab-header" onClick={() => handleTabClick(tab.id)}>
                  <div className="tab-info">
                    <div className="tab-favicon">
                      {tab.favicon ? (
                        <img src={tab.favicon || "/placeholder.svg"} alt="" width="16" height="16" />
                      ) : (
                        <div className="default-favicon">🌐</div>
                      )}
                    </div>
                    <div className="tab-details">
                      <div className="tab-title" title={tab.title}>
                        {truncateTitle(tab.title)}
                      </div>
                      <div className="tab-date">{formatDate(tab.savedAt)}</div>
                    </div>
                  </div>
                  <div className={`expand-icon ${expandedTab === tab.id ? "expanded" : ""}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                {expandedTab === tab.id && (
                  <div className="tab-actions">
                    <button className="action-btn open-btn" onClick={() => openTab(tab.url)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Open
                    </button>
                    <button className="action-btn delete-btn" onClick={() => deleteTab(tab.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6" />
                        <path d="M19,6v14a2,2,0,0,1-2,2h4a2,2,0,0,1,2,2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
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
      <div className="upgrade-section">
        <div className="limit-message">
          <div className="limit-icon">⚡</div>
          <div className="limit-text">
            <p>You've reached the free limit of 3 saved tabs.</p>
            <span>Upgrade for unlimited saves, AI summaries, and more.</span>
          </div>
        </div>

        <button className="upgrade-btn" onClick={openLandingPage}>
          <div className="upgrade-content">
            <span className="upgrade-text">Unlock Full Access</span>
            <div className="upgrade-icon">👑</div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="popup-footer">
        <button className="footer-link" onClick={openDashboard}>
          Dashboard
        </button>
        <span className="footer-divider">•</span>
        <button className="footer-link" onClick={openLandingPage}>
          Upgrade
        </button>
      </div>
    </div>
  )
}

export default Popup
