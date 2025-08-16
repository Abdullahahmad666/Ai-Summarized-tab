
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import "./index.css"

interface SavedTab {
  id: string
  title: string
  url: string
  favicon?: string
  savedAt: string
  category: string
}

interface ChromeTab {
  title?: string
  url?: string
  favIconUrl?: string
}

interface ChromeStorage {
  savedTabs?: SavedTab[]
}

const Popup: React.FC = () => {
  const [savedTabs, setSavedTabs] = useState<SavedTab[]>([])
  const [expandedTab, setExpandedTab] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    loadSavedTabs()
  }, [])

  const loadSavedTabs = async (): Promise<void> => {
    try {
      if (typeof window !== "undefined" && window.chrome?.storage) {
        const result = (await window.chrome.storage.local.get(["savedTabs"])) as ChromeStorage
        const tabs = result.savedTabs || []

        // Sort by saved date (newest first) and limit to 5 for free users
        const sortedTabs = tabs
          .sort((a: SavedTab, b: SavedTab) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
          .slice(0, 5)

        setSavedTabs(sortedTabs)
      }
    } catch (error) {
      console.error("Error loading saved tabs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTabClick = (tabId: string): void => {
    setExpandedTab(expandedTab === tabId ? null : tabId)
  }

  const openTab = (url: string): void => {
    if (typeof window !== "undefined" && window.chrome?.tabs) {
      window.chrome.tabs.create({ url })
    }
  }

  const deleteTab = async (tabId: string): Promise<void> => {
    try {
      if (typeof window !== "undefined" && window.chrome?.storage) {
        const result = (await window.chrome.storage.local.get(["savedTabs"])) as ChromeStorage
        const tabs = result.savedTabs || []
        const updatedTabs = tabs.filter((tab: SavedTab) => tab.id !== tabId)

        await window.chrome.storage.local.set({ savedTabs: updatedTabs })
        setSavedTabs(updatedTabs.slice(0, 5))
        setExpandedTab(null)
      }
    } catch (error) {
      console.error("Error deleting tab:", error)
    }
  }

  const openLandingPage = (): void => {
    if (typeof window !== "undefined" && window.chrome?.tabs) {
      window.chrome.tabs.create({ url: "http://localhost:3000" })
    }
  }

  const openDashboard = (): void => {
    if (typeof window !== "undefined" && window.chrome?.runtime) {
      window.chrome.tabs.create({ url: window.chrome.runtime.getURL("dashboard.tsx") })
    }
  }

  const saveCurrentTab = async (): Promise<void> => {
    try {
      if (typeof window !== "undefined" && window.chrome?.tabs) {
        const [activeTab] = (await window.chrome.tabs.query({ active: true, currentWindow: true })) as ChromeTab[]

        const newTab: SavedTab = {
          id: Date.now().toString(),
          title: activeTab.title || "Untitled",
          url: activeTab.url || "",
          favicon: activeTab.favIconUrl,
          savedAt: new Date().toISOString(),
          category: "Uncategorized",
        }

        const result = (await window.chrome.storage.local.get(["savedTabs"])) as ChromeStorage
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const truncateTitle = (title: string, maxLength = 45): string => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  // CSS Styles
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: "380px",
      minHeight: "500px",
      maxHeight: "600px",
      background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: "14px",
      color: "#1e293b",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      color: "white",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    headerTitle: {
      fontWeight: "600",
      fontSize: "16px",
      margin: 0,
    },
    dashboardButton: {
      background: "rgba(255, 255, 255, 0.2)",
      border: "none",
      borderRadius: "6px",
      padding: "6px",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    saveButtonContainer: {
      padding: "16px",
      borderBottom: "1px solid #e2e8f0",
    },
    saveButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px",
      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      fontSize: "14px",
    },
    tabsList: {
      flex: 1,
      padding: "0 20px",
      overflowY: "auto",
    },
    tabsHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 0",
      borderBottom: "1px solid #e2e8f0",
      marginBottom: "12px",
    },
    tabsTitle: {
      margin: 0,
      fontSize: "16px",
      fontWeight: "600",
      color: "#1e293b",
    },
    tabsCount: {
      background: "#e2e8f0",
      color: "#64748b",
      padding: "2px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 0",
      color: "#64748b",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "12px",
    },
    emptyTitle: {
      fontWeight: "500",
      color: "#475569",
      marginBottom: "4px",
      margin: 0,
    },
    emptySubtitle: {
      fontSize: "12px",
    },
    tabsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      paddingBottom: "16px",
    },
    tabCard: {
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      overflow: "hidden",
      transition: "all 0.2s",
    },
    tabHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    tabContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: 1,
      minWidth: 0,
    },
    tabIcon: {
      flexShrink: 0,
      width: "16px",
      height: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    tabInfo: {
      flex: 1,
      minWidth: 0,
    },
    tabTitle: {
      fontWeight: "500",
      color: "#1e293b",
      marginBottom: "2px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      margin: 0,
    },
    tabDate: {
      fontSize: "12px",
      color: "#64748b",
    },
    expandIcon: {
      flexShrink: 0,
      transition: "transform 0.2s",
      color: "#94a3b8",
    },
    tabActions: {
      display: "flex",
      gap: "8px",
      padding: "12px",
      background: "#f8fafc",
      borderTop: "1px solid #e2e8f0",
    },
    actionButton: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      padding: "8px 12px",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      background: "white",
      color: "#64748b",
      fontSize: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    upgradeSection: {
      padding: "16px",
      background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
      borderTop: "1px solid #e2e8f0",
    },
    upgradeContent: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      marginBottom: "12px",
    },
    upgradeIcon: {
      fontSize: "16px",
      marginTop: "2px",
    },
    upgradeText: {
      flex: 1,
    },
    upgradeTitle: {
      margin: "0 0 4px 0",
      fontWeight: "500",
      color: "#92400e",
      fontSize: "12px",
    },
    upgradeSubtitle: {
      fontSize: "12px",
      color: "#a16207",
    },
    upgradeButton: {
      width: "100%",
      background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    upgradeButtonContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px 20px",
      background: "#f8fafc",
      borderTop: "1px solid #e2e8f0",
    },
    footerButton: {
      background: "none",
      border: "none",
      color: "#64748b",
      fontSize: "12px",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    footerSeparator: {
      color: "#cbd5e1",
      fontSize: "12px",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "64px 0",
      color: "#64748b",
    },
    spinner: {
      width: "24px",
      height: "24px",
      border: "2px solid #e2e8f0",
      borderTop: "2px solid #2563eb",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "12px",
    },
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={{ fontSize: "18px" }}>✨</div>
            <span style={styles.headerTitle}>AI Tab Saver</span>
          </div>
        </div>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading your saved tabs...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={{ fontSize: "18px" }}>✨</div>
          <span style={styles.headerTitle}>AI Tab Saver</span>
        </div>
        <button
          style={styles.dashboardButton}
          onClick={openDashboard}
          title="Open Dashboard"
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
            ((e.target as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.3)")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
            ((e.target as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.2)")
          }
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
      <div style={styles.saveButtonContainer}>
        <button
          style={styles.saveButton}
          onClick={saveCurrentTab}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(-2px)"
            target.style.boxShadow = "0 10px 25px rgba(37, 99, 235, 0.3)"
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(0)"
            target.style.boxShadow = "none"
          }}
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            ((e.target as HTMLButtonElement).style.transform = "translateY(0)")
          }
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
      <div style={styles.tabsList}>
        <div style={styles.tabsHeader}>
          <h3 style={styles.tabsTitle}>Recent Saves</h3>
          <span style={styles.tabsCount}>{savedTabs.length}/5</span>
        </div>

        {savedTabs.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📑</div>
            <p style={styles.emptyTitle}>No saved tabs yet</p>
            <span style={styles.emptySubtitle}>Click "Save Current Tab" to get started</span>
          </div>
        ) : (
          <div style={styles.tabsContainer}>
            {savedTabs.map((tab: SavedTab) => (
              <div
                key={tab.id}
                style={styles.tabCard}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  const target = e.currentTarget as HTMLDivElement
                  target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  target.style.borderColor = "#cbd5e1"
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  const target = e.currentTarget as HTMLDivElement
                  target.style.boxShadow = "none"
                  target.style.borderColor = "#e2e8f0"
                }}
              >
                <div
                  style={styles.tabHeader}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
                    ((e.target as HTMLDivElement).style.backgroundColor = "#f8fafc")
                  }
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                    ((e.target as HTMLDivElement).style.backgroundColor = "transparent")
                  }
                >
                  <div style={styles.tabContent}>
                    <div style={styles.tabIcon}>
                      {tab.favicon ? (
                        <img
                          src={tab.favicon || "/placeholder.svg"}
                          alt=""
                          width="16"
                          height="16"
                          style={{ borderRadius: "2px" }}
                        />
                      ) : (
                        <div style={{ fontSize: "12px" }}>🌐</div>
                      )}
                    </div>
                    <div style={styles.tabInfo}>
                      <div style={styles.tabTitle} title={tab.title}>
                        {truncateTitle(tab.title)}
                      </div>
                      <div style={styles.tabDate}>{formatDate(tab.savedAt)}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.expandIcon,
                      transform: expandedTab === tab.id ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                {expandedTab === tab.id && (
                  <div style={styles.tabActions}>
                    <button
                      style={styles.actionButton}
                      onClick={() => openTab(tab.url)}
                      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const target = e.target as HTMLButtonElement
                        target.style.backgroundColor = "#2563eb"
                        target.style.color = "white"
                        target.style.borderColor = "#2563eb"
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const target = e.target as HTMLButtonElement
                        target.style.backgroundColor = "white"
                        target.style.color = "#64748b"
                        target.style.borderColor = "#e2e8f0"
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Open
                    </button>
                    <button
                      style={styles.actionButton}
                      onClick={() => deleteTab(tab.id)}
                      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const target = e.target as HTMLButtonElement
                        target.style.backgroundColor = "#ef4444"
                        target.style.color = "white"
                        target.style.borderColor = "#ef4444"
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const target = e.target as HTMLButtonElement
                        target.style.backgroundColor = "white"
                        target.style.color = "#64748b"
                        target.style.borderColor = "#e2e8f0"
                      }}
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
      <div style={styles.upgradeSection}>
        <div style={styles.upgradeContent}>
          <div style={styles.upgradeIcon}>⚡</div>
          <div style={styles.upgradeText}>
            <p style={styles.upgradeTitle}>You've reached the free limit of 5 saved tabs.</p>
            <span style={styles.upgradeSubtitle}>Upgrade for unlimited saves, AI summaries, and more.</span>
          </div>
        </div>

        <button
          style={styles.upgradeButton}
          onClick={openLandingPage}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(-2px)"
            target.style.boxShadow = "0 10px 25px rgba(245, 158, 11, 0.3)"
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(0)"
            target.style.boxShadow = "none"
          }}
        >
          <div style={styles.upgradeButtonContent}>
            <span style={{ fontSize: "14px" }}>Unlock Full Access</span>
            <div style={{ fontSize: "16px" }}>👑</div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button
          style={styles.footerButton}
          onClick={openDashboard}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
            ((e.target as HTMLButtonElement).style.color = "#2563eb")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
            ((e.target as HTMLButtonElement).style.color = "#64748b")
          }
        >
          Dashboard
        </button>
        <span style={styles.footerSeparator}>•</span>
        <button
          style={styles.footerButton}
          onClick={openLandingPage}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
            ((e.target as HTMLButtonElement).style.color = "#2563eb")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
            ((e.target as HTMLButtonElement).style.color = "#64748b")
          }
        >
          Upgrade
        </button>
      </div>

      
    </div>
  )
}

export default Popup
