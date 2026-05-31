import { useState } from "react";

import {
  clearRecentFiles,
  getRecentFiles,
} from "../utils/recentFiles";

import {
  getSaveHistory,
  setSaveHistory,
}
from "../utils/settingsStorage";

import { useTheme }
from "../contexts/ThemeContext";

function Settings() {

const [
  saveHistory,
  setSaveHistoryState,
] = useState(
  getSaveHistory()
);

  const recentFilesCount =
    getRecentFiles().length;

  const handleClearHistory = () => {

    if (
      window.confirm(
        "Delete all recent files?"
      )
    ) {

      clearRecentFiles();

  const handleClearHistory = () => {
        if (
          window.confirm(
            "Delete all recent files?"
          )
        ) {
          clearRecentFiles();

          window.location.reload();
        }
      };
    }
  };

  const {
  theme,
  toggleTheme,
} = useTheme();

  return (
    <div className="settings-page">

      <div className="page-header">

        <h1 className="page-title">
          Settings
        </h1>

        <p className="page-subtitle">
          Manage application
          preferences, privacy,
          storage and exports.
        </p>

      </div>

      {/* Appearance */}

      <section className="settings-section">

        <h2>Appearance</h2>

        <div className="setting-item">

          <span>
            Theme
          </span>

        <button
          className="settings-btn"
          onClick={toggleTheme}
        >
          {theme === "dark"
            ? "Switch To Light"
            : "Switch To Dark"}
        </button>

        </div>

      </section>

      {/* Privacy */}

      <section className="settings-section">

        <h2>
          Privacy & Security
        </h2>

        <div className="setting-item">

          <span>
            Save Conversion History
          </span>

          <input
            type="checkbox"
            checked={saveHistory}
            onChange={() => {

              const value =
                !saveHistory;

              setSaveHistoryState(
                value
              );

              setSaveHistory(
                value
              );

            }}
          />

        </div>

      </section>

      {/* Storage */}

      <section className="settings-section">

        <h2>
          Storage Management
        </h2>

        <div className="setting-item">

          <span>
            Recent Files
          </span>

          <strong>
            {recentFilesCount}
          </strong>

        </div>

        <button
          className="danger-btn"
          onClick={
            handleClearHistory
          }
        >
          Clear Recent Files
        </button>

      </section>

      {/* About */}

      <section className="settings-section">

        <h2>
          About PDF2AI
        </h2>

        <div className="about-grid">

          <div>
            <span>Version</span>
            <strong>1.0.0</strong>
          </div>

          <div>
            <span>Frontend</span>
            <strong>
              React + Vite
            </strong>
          </div>

          <div>
            <span>Backend</span>
            <strong>
              FastAPI
            </strong>
          </div>

          <div>
            <span>Converter</span>
            <strong>
              MarkItDown
            </strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Settings;