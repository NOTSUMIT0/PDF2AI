import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import profileImage from "../assets/profile.jpeg";

function About() {
  return (
    <div className="about-page">

      <div className="page-header">

        <h1 className="page-title">
          About Altair
        </h1>

        <p className="page-subtitle">
          Transform documents, images, media
          and YouTube content into structured,
          searchable and AI-ready knowledge for
          modern LLM workflows.
        </p>

      </div>

      {/* Hero */}

      <section className="about-section">

        <h2>
          Content Processing For
          Modern AI Workflows
        </h2>

        <p>
          Altair converts documents, images,
          audio, video and YouTube content
          into structured Markdown optimized
          for AI assistants, RAG systems,
          knowledge bases and intelligent
          search workflows.
        </p>

      </section>

      <section className="about-section">

        <h2>
          Why AI-Ready Markdown?
        </h2>

        <div className="benefits-card-grid">

          <div className="benefit-card">
            <h3>Lower Token Usage</h3>
            <p>
              Removes unnecessary PDF formatting,
              reducing token consumption when
              sending documents to LLMs.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Better AI Responses</h3>
            <p>
              Structured Markdown helps AI models
              understand headings, lists, tables
              and document hierarchy.
            </p>
          </div>

          <div className="benefit-card">
            <h3>RAG Ready</h3>
            <p>
              Ideal for vector databases,
              semantic search and Retrieval
              Augmented Generation systems.
            </p>
          </div>

          <div className="benefit-card">
            <h3>OCR Support</h3>
            <p>
              Extracts text from scanned PDFs
              and image-based documents before
              generating Markdown.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Local Processing</h3>
            <p>
              Documents are processed locally
              without uploading files to
              external cloud services.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Multiple Export Formats</h3>
            <p>
              Export results as Markdown,
              TXT or JSON for different
              AI workflows.
            </p>
          </div>

          <div className="benefit-card">
            <h3>AI Summaries</h3>
            <p>
              Generate concise summaries,
              detailed analysis and key
              takeaways from converted content.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Study Notes</h3>
            <p>
              Automatically create revision
              notes, important topics and
              exam preparation material.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Interview Preparation</h3>
            <p>
              Extract skills, technologies,
              concepts and interview questions
              from resumes and job descriptions.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Media Transcription</h3>
            <p>
              Convert audio and video files
              into searchable Markdown
              transcripts.
            </p>
          </div>

          <div className="benefit-card">
            <h3>YouTube Processing</h3>
            <p>
              Generate transcripts and AI-ready
              notes directly from YouTube URLs.
            </p>
          </div>

        </div>

      </section>

      <section className="about-section token-section">

        <h2>
          Why Token Efficiency Matters
        </h2>

        <p>
          A raw PDF often contains formatting
          artifacts, page numbers, headers and
          layout noise that consume unnecessary
          tokens.

          Altair extracts only meaningful content,
          helping reduce token usage while improving
          AI accuracy and retrieval performance.
        </p>

      </section>

      {/* Features */}

      <section className="about-section">

        <h2>
          Core Features
        </h2>

          <div className="feature-grid">

            <div>✓ Document Conversion</div>

            <div>✓ Image OCR Processing</div>

            <div>✓ Audio Transcription</div>

            <div>✓ Video Transcription</div>

            <div>✓ YouTube Transcripts</div>

            <div>✓ AI Summary</div>

            <div>✓ Study Notes Generator</div>

            <div>✓ Interview Notes Generator</div>

            <div>✓ Markdown Export</div>

            <div>✓ TXT Export</div>

            <div>✓ JSON Export</div>

            <div>✓ Search Inside Documents</div>

            <div>✓ Recent History</div>

            <div>✓ Privacy First Design</div>

            <div>✓ RAG Workflow Support</div>

          </div>

      </section>

      {/* MarkItDown */}

      <section className="about-section">

        <h2>
          Conversion Engine
        </h2>

        <p>
          Altair combines Microsoft
          MarkItDown, OCR technologies
          and AI-powered processing
          pipelines to convert diverse
          content formats into structured
          Markdown and intelligent outputs.
        </p>

        <div className="tech-card">

          <div>
            <span>Converter</span>
            <strong>
              Microsoft MarkItDown
            </strong>
          </div>

          <div>
            <span>OCR Engine</span>
            <strong>
              Tesseract OCR
            </strong>
          </div>

          <div>
            <span>Output</span>
            <strong>
              Markdown + AI Notes
            </strong>
          </div>

        </div>

      </section>

      <section className="about-section">

        <h2>
          Supported Content
        </h2>

        <div className="feature-grid">

          <div>PDF</div>

          <div>DOC / DOCX</div>

          <div>PPT / PPTX</div>

          <div>XLS / XLSX</div>

          <div>TXT / Markdown</div>

          <div>PNG / JPG</div>

          <div>WEBP / TIFF</div>

          <div>MP3 / WAV</div>

          <div>MP4 / AVI</div>

          <div>YouTube URLs</div>

        </div>

      </section>

      {/* Why Markdown */}

      <section className="about-section">

        <h2>
          Why Markdown?
        </h2>

        <p>
          Markdown is one of the most
          effective formats for AI systems.
          It preserves document structure
          while remaining lightweight,
          readable and easy for language
          models to process.
        </p>

        <div className="llm-grid">

          <span>ChatGPT</span>

          <span>Claude</span>

          <span>Gemini</span>

          <span>Perplexity</span>

          <span>Local LLMs</span>

          <span>RAG Systems</span>

        </div>

      </section>

      {/* Technology */}

      <section className="about-section">

        <h2>
          Technology Stack
        </h2>

        <div className="tech-grid">

          <div>
            <span>Frontend</span>
            <strong>React + Vite</strong>
          </div>

          <div>
            <span>Desktop Framework</span>
            <strong>Electron</strong>
          </div>

          <div>
            <span>Backend</span>
            <strong>FastAPI</strong>
          </div>

          <div>
            <span>Converter</span>
            <strong>Microsoft MarkItDown</strong>
          </div>

          <div>
            <span>OCR Engine</span>
            <strong>OCRmyPDF + Tesseract</strong>
          </div>

          <div>
            <span>Storage</span>
            <strong>LocalStorage</strong>
          </div>

          <div>
            <span>Packaging</span>
            <strong>PyInstaller</strong>
          </div>

          <div>
            <span>Document Processing</span>
            <strong>PyMuPDF</strong>
          </div>

          <div>
            <span>API Communication</span>
            <strong>Axios</strong>
          </div>

          <div>
            <span>AI Provider</span>
            <strong>Groq</strong>
          </div>

          <div>
            <span>Transcription</span>
            <strong>Whisper</strong>
          </div>

        </div>

      </section>

      {/* Privacy */}

      <section className="about-section">

        <h2>
          Privacy & Security
        </h2>

        <p>
          Altair is designed with a
          privacy-first approach.
          Documents remain under your
          control and conversion history
          can be managed directly from
          the application settings.
        </p>

      </section>

      {/* App Info */}

      <section className="about-section">

        <h2>
          Application Information
        </h2>

        <div className="tech-grid">

          <div>
            <span>Version</span>
            <strong>2.0.0</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>
              Operational
            </strong>
          </div>

          <div>
            <span>Theme</span>
            <strong>
              Dark / Light
            </strong>
          </div>

        </div>

      </section>
      {/* Developer */}

      <section className="about-section">

        <h2>
          Developed By
        </h2>

        <div className="developer-card">

      <div className="developer-header">

        <img
          src={profileImage}
          alt="Sumit Kumar"
          className="developer-avatar"
        />

        <div className="developer-details">

          <h3>
            Sumit Kumar
          </h3>

          <p>
            Creator of Altair
          </p>

        </div>

      </div>

      <div className="developer-links">

        <a
          href="https://github.com/NOTSUMIT0"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaGithub size={18} />
          <span>@NOTSUMIT0</span>
        </a>

        <a
          href="https://www.linkedin.com/in/sumit-kumar010/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaLinkedin size={18} />
          <span>sumit-kumar010</span>
        </a>

        <a
          href="https://x.com/NOT_SUMIT_"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaXTwitter size={18} />
          <span>@NOT_SUMIT_</span>
        </a>

      </div>

      <div className="developer-project-note">

        <strong>
          About Altair
        </strong>

        <p>
          Altair transforms documents,
          images, audio, video and
          YouTube content into structured,
          searchable and AI-ready knowledge.

          Built for Markdown conversion,
          token optimization, AI summaries,
          study notes, interview preparation,
          transcription and modern RAG
          workflows.
        </p>

      </div>

        </div>

      </section>

    </div>
  );
}

export default About;