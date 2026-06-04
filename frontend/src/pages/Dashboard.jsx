import { Upload } from "lucide-react";

import FileUpload from "../components/ui/FileUpload";

function Dashboard() {
  return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Convert Documents Into AI-Ready Content
        </h1>

        <p className="dashboard-subtitle">
          Transform PDFs into clean,
          structured, AI-ready content.

          Extract text, preserve
          document structure, search
          instantly, and export for
          ChatGPT, Claude, Gemini and
          modern AI workflows.
        </p>

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

        <section className="security-card">

          <div className="security-header">

            <h2>
              Privacy & Security
            </h2>

            <span className="security-badge">
              Protected
            </span>

          </div>

          <div className="security-grid">

            <div className="security-item">

              <h3>
                Local Processing
              </h3>

              <p>
                Documents are processed on
                your system before export.
              </p>

            </div>

            <div className="security-item">

              <h3>
                No Cloud Storage
              </h3>

              <p>
                Files are not permanently
                stored on external servers.
              </p>

            </div>

            <div className="security-item">

              <h3>
                Export Control
              </h3>

              <p>
                Download Markdown, TXT,
                and JSON whenever needed.
              </p>

            </div>

            <div className="security-item">

              <h3>
                AI Ready
              </h3>

              <p>
                Optimized output for
                ChatGPT, Claude,
                Gemini and other AI tools.
              </p>

            </div>

            <div className="security-item">

                <h3>
                  User Controlled Data
                </h3>

                <p>
                  Recent files and history can be
                  cleared anytime from Settings.
                </p>

            </div>

            <div className="security-item">

                <h3>
                  Secure Processing
                </h3>

                <p>
                  Documents are processed through a controlled conversion 
                  pipeline with no third-party analytics or tracking.
                </p>

            </div>            

          </div>

        </section>
      </div> 
  );
}

export default Dashboard;