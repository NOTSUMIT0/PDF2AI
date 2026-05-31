import { Upload } from "lucide-react";

import FileUpload from "../components/ui/FileUpload";

function Dashboard() {
  return (
      <div classname="dashboard-container">
        <h1 className="dashboard-title">
          Convert Documents Into AI-Ready Content
        </h1>

        <p className="dashboard-subtitle">
          Prepare PDFs for ChatGPT, Claude, Gemini,
          Perplexity and other AI tools.
        </p>

        <section className="quick-actions">
          <button className="action-card">
            Convert PDF
          </button>

          <button className="action-card">
            Recent Files
          </button>

          <button className="action-card">
            Exports
          </button>
        </section>

        <FileUpload className="upload-zone">

          <div className="upload-icon-wrapper">
            <Upload size={56} />
          </div>

          <h2 className="upload-title">
            Upload Your PDF
          </h2>

          <p className="upload-description">
            Drag and drop a document anywhere inside this area.
          </p>

          <div className="upload-divider">
            <span>or</span>
          </div>

          <button className="primary-btn">
            Select Document
          </button>

          <span className="upload-hint">
            Local Processing • PDF • Up To 100 MB
          </span>

        </FileUpload>

        <section className="recent-section">
          <h2>Recent Documents</h2>
        
          <div className="empty-state">
            No recent documents yet
          </div>
        </section>

        <section className="privacy-section">
          <h2>Privacy & Security</h2>

          <ul>
            <li>Files stay on your device</li>
            <li>No cloud uploads</li>
            <li>No tracking or analytics</li>
          </ul>
        </section>
      </div> 
  );
}

export default Dashboard;