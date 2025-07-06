/* global chrome */
import React, { useEffect, useState } from 'react';
import './style.css';

const Popup = () => {
  const [tabs, setTabs] = useState([]);
  const [expandedTabId, setExpandedTabId] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(['savedTabs'], (result) => {
      if (result.savedTabs) {
        setTabs(result.savedTabs);
      }
    });
  }, []);

  const handleSaveTabs = () => {
    chrome.tabs.query({}, (tabs) => {
      const currentTabs = tabs.map((tab) => ({
        id: tab.id,
        title: tab.title,
        url: tab.url
      }));
      chrome.storage.local.set({ savedTabs: currentTabs }, () => {
        setTabs(currentTabs);
      });
    });
  };

  const handleDeleteTab = (url) => {
    const updatedTabs = tabs.filter((tab) => tab.url !== url);
    chrome.storage.local.set({ savedTabs: updatedTabs }, () => {
      setTabs(updatedTabs);
    });
  };

  const handleClearAll = () => {
    chrome.storage.local.remove('savedTabs', () => {
      setTabs([]);
    });
  };

  const toggleExpand = (url) => {
    setExpandedTabId(expandedTabId === url ? null : url);
  };

  const handleClosePopup = () => {
    window.close();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI Tab Saver</h1>
        <button className="close-btn" onClick={handleClosePopup}>&times;</button>
      </div>
      <div className="button-group">
        <button onClick={handleSaveTabs}>Save Tabs</button>
        <button onClick={handleClearAll} style={{ backgroundColor: '#dc3545' }}>Clear All</button>
      </div>
      <div className="tabs-list">
        {tabs.map((tab) => (
          <div key={tab.url} className="tab-card" onClick={() => toggleExpand(tab.url)}>
            <div className="tab-title">{tab.title}</div>
            {expandedTabId === tab.url && (
              <div className="tab-actions">
                <button onClick={(e) => { e.stopPropagation(); chrome.tabs.create({ url: tab.url }); }}>Open</button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteTab(tab.url); }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="restore-all">
  {tabs.length > 0 && (
    <button onClick={() => {
      tabs.forEach(tab => {
        chrome.tabs.create({ url: tab.url });
      });
    }}>Restore All Tabs</button>
  )}
</div>
    </div>
  );
};

export default Popup;
