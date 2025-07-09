// Chrome Extension Popup Script
;(() => {
  // Declare chrome variable
  const chrome = window.chrome

  // State management
  let savedTabs = []
  let expandedTab = null
  let loading = true

  // Initialize the popup
  function init() {
    loadSavedTabs()
    setupEventListeners()
  }

  // Load saved tabs from Chrome storage
  async function loadSavedTabs() {
    try {
      const result = await chrome.storage.local.get(["savedTabs"])
      const tabs = result.savedTabs || []

      // Sort by saved date (newest first) and limit to 3 for free users
      savedTabs = tabs.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()).slice(0, 3)

      loading = false
      render()
    } catch (error) {
      console.error("Error loading saved tabs:", error)
      loading = false
      render()
    }
  }

  // Save current active tab
  async function saveCurrentTab() {
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })

      const newTab = {
        id: Date.now().toString(),
        title: activeTab.title || "Untitled",
        url: activeTab.url || "",
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

  // Delete a saved tab
  async function deleteTab(tabId) {
    try {
      const result = await chrome.storage.local.get(["savedTabs"])
      const tabs = result.savedTabs || []
      const updatedTabs = tabs.filter((tab) => tab.id !== tabId)

      await chrome.storage.local.set({ savedTabs: updatedTabs })
      expandedTab = null
      loadSavedTabs()
    } catch (error) {
      console.error("Error deleting tab:", error)
    }
  }

  // Open a tab
  function openTab(url) {
    chrome.tabs.create({ url })
  }

  // Open landing page
  function openLandingPage() {
    chrome.tabs.create({ url: "http://localhost:3000" })
  }

  // Open dashboard
  function openDashboard() {
    chrome.tabs.create({ url: "http://localhost:3000" })
  }

  // Toggle tab expansion
  function handleTabClick(tabId) {
    expandedTab = expandedTab === tabId ? null : tabId
    render()
  }

  // Format date helper
  function formatDate(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  // Truncate title helper
  function truncateTitle(title, maxLength = 45) {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  // Setup event listeners
  function setupEventListeners() {
    // This will be called after render to attach event listeners
  }

  // Render the popup UI
  function render() {
    const root = document.getElementById("root")

    if (loading) {
      root.innerHTML = `
        <div style="width: 380px; min-height: 500px; max-height: 600px; background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #1e293b; overflow: hidden; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="font-size: 18px;">✨</div>
              <span style="font-weight: 600; font-size: 16px; margin: 0;">AI Tab Saver</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 0; color: #64748b;">
            <div style="width: 24px; height: 24px; border: 2px solid #e2e8f0; border-top: 2px solid #2563eb; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 12px;"></div>
            <p>Loading your saved tabs...</p>
          </div>
        </div>
      `
      return
    }

    root.innerHTML = `
      <div style="width: 380px; min-height: 500px; max-height: 600px; background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #1e293b; overflow: hidden; display: flex; flex-direction: column;">
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 18px;">✨</div>
            <span style="font-weight: 600; font-size: 16px; margin: 0;">AI Tab Saver</span>
          </div>
          <button id="dashboard-btn" style="background: rgba(255, 255, 255, 0.2); border: none; border-radius: 6px; padding: 6px; color: white; cursor: pointer; transition: background-color 0.2s; display: flex; align-items: center; justify-content: center;" title="Open Dashboard">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>

        <!-- Save Current Tab Button -->
        <div style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
          <button id="save-tab-btn" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-size: 14px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17,21 17,13 7,13 7,21" />
              <polyline points="7,3 7,8 15,8" />
            </svg>
            Save Current Tab
          </button>
        </div>

        <!-- Saved Tabs List -->
        <div style="flex: 1; padding: 0 20px; overflow-y: auto;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1e293b;">Recent Saves</h3>
            <span style="background: #e2e8f0; color: #64748b; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 500;">${savedTabs.length}/3</span>
          </div>

          ${
            savedTabs.length === 0
              ? `
            <div style="text-align: center; padding: 40px 0; color: #64748b;">
              <div style="font-size: 48px; margin-bottom: 12px;">📑</div>
              <p style="font-weight: 500; color: #475569; margin-bottom: 4px; margin: 0;">No saved tabs yet</p>
              <span style="font-size: 12px;">Click "Save Current Tab" to get started</span>
            </div>
          `
              : `
            <div style="display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px;">
              ${savedTabs
                .map(
                  (tab) => `
                <div class="tab-card" data-tab-id="${tab.id}" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; transition: all 0.2s;">
                  <div class="tab-header" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; cursor: pointer; transition: background-color 0.2s;">
                    <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
                      <div style="flex-shrink: 0; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;">
                        ${
                          tab.favicon
                            ? `
                          <img src="${tab.favicon}" alt="" width="16" height="16" style="border-radius: 2px;" />
                        `
                            : `
                          <div style="font-size: 12px;">🌐</div>
                        `
                        }
                      </div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 500; color: #1e293b; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;" title="${tab.title}">
                          ${truncateTitle(tab.title)}
                        </div>
                        <div style="font-size: 12px; color: #64748b;">${formatDate(tab.savedAt)}</div>
                      </div>
                    </div>
                    <div style="flex-shrink: 0; transition: transform 0.2s; color: #94a3b8; transform: ${expandedTab === tab.id ? "rotate(180deg)" : "rotate(0deg)"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </div>
                  </div>

                  ${
                    expandedTab === tab.id
                      ? `
                    <div style="display: flex; gap: 8px; padding: 12px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
                      <button class="open-tab-btn" data-url="${tab.url}" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; color: #64748b; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Open
                      </button>
                      <button class="delete-tab-btn" data-tab-id="${tab.id}" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; color: #64748b; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3,6 5,6 21,6" />
                          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  `
                      : ""
                  }
                </div>
              `,
                )
                .join("")}
            </div>
          `
          }
        </div>

        <!-- Upgrade Section -->
        <div style="padding: 16px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-top: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
            <div style="font-size: 16px; margin-top: 2px;">⚡</div>
            <div style="flex: 1;">
              <p style="margin: 0 0 4px 0; font-weight: 500; color: #92400e; font-size: 12px;">You've reached the free limit of 3 saved tabs.</p>
              <span style="font-size: 12px; color: #a16207;">Upgrade for unlimited saves, AI summaries, and more.</span>
            </div>
          </div>

          <button id="upgrade-btn" style="width: 100%; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; border: none; border-radius: 8px; padding: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span style="font-size: 14px;">Unlock Full Access</span>
              <div style="font-size: 16px;">👑</div>
            </div>
          </button>
        </div>

        <!-- Footer -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
          <button id="footer-dashboard-btn" style="background: none; border: none; color: #64748b; font-size: 12px; cursor: pointer; transition: color 0.2s;">Dashboard</button>
          <span style="color: #cbd5e1; font-size: 12px;">•</span>
          <button id="footer-upgrade-btn" style="background: none; border: none; color: #64748b; font-size: 12px; cursor: pointer; transition: color 0.2s;">Upgrade</button>
        </div>
      </div>
    `

    // Attach event listeners after rendering
    attachEventListeners()
  }

  // Attach event listeners to rendered elements
  function attachEventListeners() {
    // Save tab button
    const saveTabBtn = document.getElementById("save-tab-btn")
    if (saveTabBtn) {
      saveTabBtn.addEventListener("click", saveCurrentTab)
      saveTabBtn.addEventListener("mouseenter", (e) => {
        e.target.style.transform = "translateY(-2px)"
        e.target.style.boxShadow = "0 10px 25px rgba(37, 99, 235, 0.3)"
      })
      saveTabBtn.addEventListener("mouseleave", (e) => {
        e.target.style.transform = "translateY(0)"
        e.target.style.boxShadow = "none"
      })
    }

    // Dashboard buttons
    const dashboardBtn = document.getElementById("dashboard-btn")
    const footerDashboardBtn = document.getElementById("footer-dashboard-btn")
    if (dashboardBtn) {
      dashboardBtn.addEventListener("click", openDashboard)
      dashboardBtn.addEventListener("mouseenter", (e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.3)"
      })
      dashboardBtn.addEventListener("mouseleave", (e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.2)"
      })
    }
    if (footerDashboardBtn) {
      footerDashboardBtn.addEventListener("click", openDashboard)
      footerDashboardBtn.addEventListener("mouseenter", (e) => {
        e.target.style.color = "#2563eb"
      })
      footerDashboardBtn.addEventListener("mouseleave", (e) => {
        e.target.style.color = "#64748b"
      })
    }

    // Upgrade buttons
    const upgradeBtn = document.getElementById("upgrade-btn")
    const footerUpgradeBtn = document.getElementById("footer-upgrade-btn")
    if (upgradeBtn) {
      upgradeBtn.addEventListener("click", openLandingPage)
      upgradeBtn.addEventListener("mouseenter", (e) => {
        e.target.style.transform = "translateY(-2px)"
        e.target.style.boxShadow = "0 10px 25px rgba(245, 158, 11, 0.3)"
      })
      upgradeBtn.addEventListener("mouseleave", (e) => {
        e.target.style.transform = "translateY(0)"
        e.target.style.boxShadow = "none"
      })
    }
    if (footerUpgradeBtn) {
      footerUpgradeBtn.addEventListener("click", openLandingPage)
      footerUpgradeBtn.addEventListener("mouseenter", (e) => {
        e.target.style.color = "#2563eb"
      })
      footerUpgradeBtn.addEventListener("mouseleave", (e) => {
        e.target.style.color = "#64748b"
      })
    }

    // Tab headers (for expanding/collapsing)
    const tabHeaders = document.querySelectorAll(".tab-header")
    tabHeaders.forEach((header) => {
      const tabCard = header.closest(".tab-card")
      const tabId = tabCard.getAttribute("data-tab-id")

      header.addEventListener("click", () => handleTabClick(tabId))
      header.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "#f8fafc"
      })
      header.addEventListener("mouseleave", (e) => {
        e.target.style.backgroundColor = "transparent"
      })
    })

    // Tab cards hover effects
    const tabCards = document.querySelectorAll(".tab-card")
    tabCards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        e.target.style.borderColor = "#cbd5e1"
      })
      card.addEventListener("mouseleave", (e) => {
        e.target.style.boxShadow = "none"
        e.target.style.borderColor = "#e2e8f0"
      })
    })

    // Open tab buttons
    const openTabBtns = document.querySelectorAll(".open-tab-btn")
    openTabBtns.forEach((btn) => {
      const url = btn.getAttribute("data-url")
      btn.addEventListener("click", () => openTab(url))
      btn.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "#2563eb"
        e.target.style.color = "white"
        e.target.style.borderColor = "#2563eb"
      })
      btn.addEventListener("mouseleave", (e) => {
        e.target.style.backgroundColor = "white"
        e.target.style.color = "#64748b"
        e.target.style.borderColor = "#e2e8f0"
      })
    })

    // Delete tab buttons
    const deleteTabBtns = document.querySelectorAll(".delete-tab-btn")
    deleteTabBtns.forEach((btn) => {
      const tabId = btn.getAttribute("data-tab-id")
      btn.addEventListener("click", () => deleteTab(tabId))
      btn.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "#ef4444"
        e.target.style.color = "white"
        e.target.style.borderColor = "#ef4444"
      })
      btn.addEventListener("mouseleave", (e) => {
        e.target.style.backgroundColor = "white"
        e.target.style.color = "#64748b"
        e.target.style.borderColor = "#e2e8f0"
      })
    })
  }

  // Initialize when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})()
