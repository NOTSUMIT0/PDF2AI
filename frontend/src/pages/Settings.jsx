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

import { useToast }
from "../contexts/ToastContext";

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

  clearRecentFiles();

  showToast(
    "History Cleared",
    "All recent files have been removed.",
    "success"
  );

  setTimeout(() => {
    window.location.reload();
  }, 800);

};

  const {
    theme,
    toggleTheme,
  } = useTheme();

  const { showToast } =
  useToast();

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

        <div className="theme-selector">

          <button
            className={`theme-card ${
              theme === "light"
                ? "active-theme"
                : ""
            }`}
              onClick={() => {

                if (theme === "dark") {

                  toggleTheme();

                  showToast(
                    "Theme Updated",
                    "Light mode activated.",
                    "success"
                  );

                }

              }}
          >
            ☀
            <span>Light Mode</span>
          </button>

          <button
            className={`theme-card ${
              theme === "dark"
                ? "active-theme"
                : ""
            }`}
              onClick={() => {

                if (theme === "light") {

                  toggleTheme();

                  showToast(
                    "Theme Updated",
                    "Dark mode activated.",
                    "success"
                  );

                }

              }}
          >
            🌙
            <span>Dark Mode</span>
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

          <label className="switch">

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

                showToast(
                  value
                    ? "History Enabled"
                    : "History Disabled",

                  value
                    ? "Future conversions will be saved."
                    : "Future conversions will not be saved.",

                  "info"
                );

              }}
            />

            <span className="slider"></span>

          </label>

        </div>

      </section>

      {/* Storage */}

      <section className="settings-section">

        <h2>
          Storage Management
        </h2>

        <div className="storage-card">

          <span>
            Recent Files Stored
          </span>

          <h3>
            {recentFilesCount}
          </h3>

          <p>
            Files Available
          </p>

          <button
            className="danger-btn"
            onClick={
              handleClearHistory
            }
          >
            Clear Recent Files
          </button>

        </div>

      </section>

    </div>
  );
}

export default Settings;