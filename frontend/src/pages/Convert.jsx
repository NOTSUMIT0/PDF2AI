import { getRecentFiles }
from "../utils/recentFiles";

function Convert() {

  const files =
    getRecentFiles();

  const totalFiles =
    files.length;

  const totalWords =
    files.reduce(
      (sum, file) =>
        sum +
        (
          file.markdown?.split(
            /\s+/
          ).length || 0
        ),
      0
    );

  const totalTokens =
    Math.floor(
      totalWords * 1.6
    );

  const averageSize =
    totalFiles > 0
      ? (
          files.reduce(
            (sum, file) =>
              sum + file.size,
            0
          ) /
          totalFiles /
          1024 /
          1024
        ).toFixed(2)
      : 0;

  const totalCharacters =
    files.reduce(
      (sum, file) =>
        sum +
        (
          file.markdown?.length || 0
        ),
      0
    );

  const averageWords =
    totalFiles > 0
      ? Math.round(
          totalWords /
          totalFiles
        )
      : 0;

  const readingTime =
    Math.ceil(
      totalWords / 200
    );

const recentFile =
  files.length > 0
    ? files.reduce(
        (latest, current) =>
          new Date(
            current.createdAt
          ) >
          new Date(
            latest.createdAt
          )
            ? current
            : latest
      )
    : null;   

  return (
    <div className="convert-page">

      <div className="page-header">

      <h1 className="page-title">
        Content Intelligence Center
      </h1>

      <p className="page-subtitle">
        Track conversions, transcripts,
        AI summaries, study notes and
        workflow analytics across all
        supported content sources.
      </p>

      </div>

      {/* Stats */}

      <div className="convert-stats">

        <div className="stat-card">
          <span>
            Documents & Media Processed
          </span>
          <h2>
            {totalFiles}
          </h2>
        </div>

        <div className="stat-card">
          <span>
            Content Words Processed
          </span>
          <h2>
            {totalWords}
          </h2>
        </div>

        <div className="stat-card">
          <span>
            AI Tokens Optimized
          </span>
          <h2>
            {totalTokens}
          </h2>
        </div>

        <div className="stat-card">
          <span>
            Average File Size
          </span>
          <h2>
            {averageSize} MB
          </h2>
        </div>

      </div>

      {/* Conversion Insights */}

      <section className="convert-section">

        <h2>
          Conversion Insights
        </h2>

        <div className="workflow-grid">

          <div>

            <span>
              Total Characters
            </span>

            <h3>
              {totalCharacters}
            </h3>

          </div>

          <div>

            <span>
              Average Words / File
            </span>

            <h3>
              {averageWords}
            </h3>

          </div>

          <div>

            <span>
              Estimated Reading Time
            </span>

            <h3>
              {readingTime} min
            </h3>

          </div>

          <div>

            <span>
              Recent Document Uploaded
            </span>

            <h3>
              {
                recentFile
                  ? recentFile.name
                  : "None"
              }
            </h3>

          </div>

        </div>

      </section>

      {/* Workflow */}

      <section className="convert-section">

        <h2>
          Altair Workflow
        </h2>

        <div className="workflow-grid">

          <div>
            1) Upload Content
          </div>

          <div>
            2) Analyze Structure
          </div>

          <div>
            3) Generate Markdown
          </div>

          <div>
            4) Export or Summarize
          </div>

        </div>

      </section>

      {/* Formats */}

      <section className="convert-section">

        <h2>
          Supported Formats
        </h2>

        <div className="workflow-grid">

          <div>
            Documents:
            PDF, DOC, DOCX,
            PPT, PPTX,
            XLS, XLSX,
            TXT, Markdown
          </div>

          <div>
            Images:
            PNG, JPG, JPEG,
            BMP, TIFF,
            WEBP
          </div>

          <div>
            Media:
            MP3, WAV, FLAC,
            MP4, AVI, MOV,
            MKV
          </div>

          <div>
            YouTube:
            URL → Transcript →
            Markdown
          </div>

          <div>
            Output: Copy (Direct markdown)
          </div>

          <div>
            Output: Markdown  (AI-ready format for ChatGPT, Claude, Gemini and Perplexity.)
          </div>

          <div>
            Output: TXT (Plain text format for notes, search indexing and lightweight processing.)
          </div>

          <div>
            Output: JSON (RAG-ready and support vector database workflows.)
          </div>

        </div>

      </section>

      <section className="convert-section">

        <h2>
          AI Features
        </h2>

        <div className="workflow-grid">

          <div>
            Short Summary
          </div>

          <div>
            Detailed Analysis
          </div>

          <div>
            Study Notes
          </div>

          <div>
            Interview Notes
          </div>

        </div>

      </section>

      {/* Tips */}

      <section className="convert-section">

        <h2>
          Conversion Tips
        </h2>

        <ul className="tips-list">

          <li>
            Markdown exports reduce token
            usage when working with AI.
          </li>

          <li>
            Structured Markdown produces
            better results in ChatGPT,
            Claude and Gemini.
          </li>

          <li>
            Study Notes mode is ideal for
            academic content and lecture
            material.
          </li>

          <li>
            Interview Notes mode works
            well with resumes and job
            descriptions.
          </li>

          <li>
            OCR automatically processes
            scanned images and documents.
          </li>

          <li>
            JSON exports are suitable for
            RAG pipelines and vector
            database workflows.
          </li>

          <li>
            Media transcripts can be
            searched, summarized and
            exported.
          </li>

          <li>
            YouTube transcripts can be
            transformed into summaries,
            notes and AI-ready content.
          </li>

          <li>
            Local processing helps keep
            content private before export.
          </li>

        </ul>

      </section>

      <section className="convert-section">

        <h2>
          Why Markdown Matters
        </h2>

        <div className="workflow-grid">

          <div>
            Lower Token Usage
          </div>

          <div>
            Cleaner AI Responses
          </div>

          <div>
            Better Context Retention
          </div>

          <div>
            RAG & Vector DB Ready
          </div>

        </div>

      </section>

    </div>
  );
}

export default Convert;