/* global chrome */
import { useEffect, useState } from "react";

function Popup() {
  const [tabs, setTabs] = useState([]);
  const [saved, setSaved] = useState(false);

  const fetchTabs = () => {
    chrome.tabs.query({}, (tabs) => {
      setTabs(tabs);
    });
  };

  const saveTabs = () => {
    chrome.storage.local.set({ savedTabs: tabs }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  return (
    <div style={{ padding: "12px", width: "300px" }}>
      <h2>🧠 AI Tab Saver</h2>
      <ul style={{ maxHeight: "200px", overflowY: "auto", padding: 0 }}>
        {tabs.map((tab) => (
          <li key={tab.id} style={{ fontSize: "14px", marginBottom: "4px", listStyle: "none" }}>
            🔗 {tab.title}
          </li>
        ))}
      </ul>
      <button onClick={saveTabs} style={{ marginTop: "10px", width: "100%" }}>
        💾 Save Session
      </button>
      {saved && <p>✅ Tabs Saved!</p>}
    </div>
  );
}

export default Popup;
