/*global chrome */
import React, { useEffect, useState } from 'react';

const Popup = () => {
  const [tabs, setTabs] = useState([]);

  // Fetch saved tabs on popup load
  useEffect(() => {
    chrome.storage.local.get('savedTabs', (data) => {
      if (data.savedTabs) {
        setTabs(data.savedTabs);
      }
    });
  }, []);

  // Save all current tabs
  const handleSaveTabs = () => {
    chrome.tabs.query({}, (tabs) => {
      const tabData = tabs.map((tab) => ({
        title: tab.title,
        url: tab.url,
      }));

      chrome.storage.local.set({ savedTabs: tabData }, () => {
        setTabs(tabData);
        alert('Tabs saved!');
      });
    });
  };

  // Delete a single tab by index
  const handleDeleteTab = (index) => {
    const updatedTabs = [...tabs];
    updatedTabs.splice(index, 1);

    chrome.storage.local.set({ savedTabs: updatedTabs }, () => {
      setTabs(updatedTabs);
    });
  };

  // Clear all saved tabs
  const handleClearTabs = () => {
    chrome.storage.local.remove('savedTabs', () => {
      setTabs([]);
      alert('All tabs cleared!');
    });
  };

  return (
    <div style={{ padding: '10px', width: '300px', fontFamily: 'sans-serif' }}>
      <h3>AI Tab Saver</h3>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={handleSaveTabs}>Save Tabs</button>
        <button onClick={handleClearTabs} style={{ backgroundColor: '#f44336', color: 'white' }}>
          Clear All
        </button>
      </div>

      <hr />

      {tabs.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tabs.map((tab, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              <a
                href={tab.url}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none', color: '#007bff' }}
              >
                {tab.title}
              </a>
              <button
                onClick={() => handleDeleteTab(index)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#e53935',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 6px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tabs saved.</p>
      )}
    </div>
  );
};

export default Popup;
