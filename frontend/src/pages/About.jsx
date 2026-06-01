function About() {
  return (
    <div className="about-page">

      <div className="page-header">

        <h1 className="page-title">
          About PDF2AI
        </h1>

        <p className="page-subtitle">
          Convert PDFs into AI-ready Markdown
          for ChatGPT, Claude, Gemini,
          Perplexity and modern LLM workflows.
        </p>

      </div>

      {/* Hero */}

      <section className="about-section">

        <h2>
          Convert Documents Into
          AI-Ready Content
        </h2>

        <p>
          PDF2AI transforms PDF documents
          into clean, structured Markdown
          that can be used directly with
          AI assistants, RAG systems,
          knowledge bases and LLM-powered
          applications.
        </p>

      </section>

      {/* Features */}

      <section className="about-section">

        <h2>
          Core Features
        </h2>

        <div className="feature-grid">

          <div>✓ PDF To Markdown</div>

          <div>✓ AI Ready Output</div>

          <div>✓ Recent File History</div>

          <div>✓ Multiple Exports</div>

          <div>✓ Search Documents</div>

          <div>✓ Analytics Dashboard</div>

          <div>✓ Dark & Light Themes</div>

          <div>✓ Privacy First Design</div>

        </div>

      </section>

      {/* MarkItDown */}

      <section className="about-section">

        <h2>
          Powered By Microsoft MarkItDown
        </h2>

        <p>
          PDF2AI uses Microsoft's
          MarkItDown conversion engine to
          transform PDFs into structured
          Markdown while preserving text,
          headings, tables and document
          organization whenever possible.
        </p>

        <div className="tech-card">

          <div>
            <span>Converter</span>
            <strong>
              Microsoft MarkItDown
            </strong>
          </div>

          <div>
            <span>Purpose</span>
            <strong>
              PDF → Markdown
            </strong>
          </div>

          <div>
            <span>Optimized For</span>
            <strong>
              LLM Workflows
            </strong>
          </div>

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
              Microsoft MarkItDown
            </strong>
          </div>

          <div>
            <span>Storage</span>
            <strong>
              LocalStorage
            </strong>
          </div>

        </div>

      </section>

      {/* Privacy */}

      <section className="about-section">

        <h2>
          Privacy & Security
        </h2>

        <p>
          PDF2AI is designed with a
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
            <strong>1.0.0</strong>
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

          <div>
            <span>Build</span>
            <strong>
              Development
            </strong>
          </div>

        </div>

      </section>

      {/* Roadmap */}

      <section className="about-section">

        <h2>
          Roadmap
        </h2>

        <div className="feature-grid">

          <div>✓ OCR Support</div>

          <div>✓ Batch Conversion</div>

          <div>✓ ZIP Exports</div>

          <div>✓ AI Summaries</div>

          <div>✓ Vector Export</div>

          <div>✓ Knowledge Base Builder</div>

        </div>

      </section>

      {/* Developer */}

      <section className="about-section">

        <h2>
          Developed By
        </h2>

        <p>
          Sumit Kumar
        </p>

        <p>
          PDF2AI was built to simplify
          document preparation for AI,
          LLM workflows, RAG systems and
          modern knowledge management.
        </p>

      </section>

    </div>
  );
}

export default About;