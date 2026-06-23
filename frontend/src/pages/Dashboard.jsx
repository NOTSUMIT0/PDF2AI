import { Upload } from "lucide-react";

import FileUpload from "../components/ui/FileUpload";

function Dashboard() {
  return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Transform Content Into AI-Ready Knowledge
        </h1>

        <p className="dashboard-subtitle">
          Convert documents, media files and YouTube content into
          clean, structured Markdown optimized for modern AI workflows.

          Reduce token usage, preserve formatting,
          generate summaries, study notes and interview preparation
          material from a single workspace.
        </p>

        <FileUpload className="upload-zone">

          <div className="upload-icon-wrapper">
            <Upload size={56} />
          </div>

          <h2 className="upload-title">
            Upload Your Document
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
            Local Processing • Documents, Images, Archives & More • Up To 100 MB
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
                Generate summaries,
                study notes and interview
                preparation using your own
                Groq API key.
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

        <section className="features-card">

          <div className="security-header">

            <h2>
              Supported Content
            </h2>

          </div>

          <div className="security-grid">

            <div className="security-item">
              <h3>Documents</h3>
              <p>
                PDF, DOC, DOCX,
                PPT, PPTX, XLSX,
                TXT, Markdown.
              </p>
            </div>

            <div className="security-item">
              <h3>Images</h3>
              <p>
                PNG, JPG, JPEG,
                BMP, TIFF and WEBP.
              </p>
            </div>

            <div className="security-item">
              <h3>Media</h3>
              <p>
                MP3, WAV, FLAC,
                MP4, AVI, MOV and MKV.
              </p>
            </div>

            <div className="security-item">
              <h3>YouTube</h3>
              <p>
                Convert YouTube videos
                directly into transcripts
                and summaries.
              </p>
            </div>

          </div>

        </section>

        <section className="features-card">

          <div className="security-header">

            <h2>
              Altair Features
            </h2>

            <span className="security-badge">
              New
            </span>

          </div>

          <div className="security-grid">

            <div className="security-item">
              <h3>Document Conversion</h3>
              <p>
                Convert PDFs, DOCX, PPTX,
                spreadsheets and archives
                into structured Markdown.
              </p>
            </div>

            <div className="security-item">
              <h3>Media Transcription</h3>
              <p>
                Extract speech and generate
                searchable transcripts from
                audio and video files.
              </p>
            </div>

            <div className="security-item">
              <h3>YouTube Processing</h3>
              <p>
                Generate transcripts directly
                from YouTube URLs.
              </p>
            </div>

            <div className="security-item">
              <h3>AI Summary</h3>
              <p>
                Generate concise summaries,
                detailed analysis and key
                takeaways instantly.
              </p>
            </div>

            <div className="security-item">
              <h3>Study Notes</h3>
              <p>
                Create revision notes,
                important topics and exam
                preparation material.
              </p>
            </div>

            <div className="security-item">
              <h3>Interview Notes</h3>
              <p>
                Extract skills, technologies
                and generate interview
                preparation questions.
              </p>
            </div>

          </div>

        </section>
      </div> 
  );
}

export default Dashboard;