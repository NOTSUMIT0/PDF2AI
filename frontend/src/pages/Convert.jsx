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

  const largestFile =
    files.length > 0
      ? files.reduce(
          (largest, current) =>
            current.size >
            largest.size
              ? current
              : largest
        )
      : null;    

  return (
    <div className="convert-page">

      <div className="page-header">

        <h1 className="page-title">
          Conversion Center
        </h1>

        <p className="page-subtitle">
          Monitor document conversions,
          analytics and workflow insights.
        </p>

      </div>

      {/* Stats */}

      <div className="convert-stats">

        <div className="stat-card">
          <span>
            Documents Converted
          </span>
          <h2>
            {totalFiles}
          </h2>
        </div>

        <div className="stat-card">
          <span>
            Words Processed
          </span>
          <h2>
            {totalWords}
          </h2>
        </div>

        <div className="stat-card">
          <span>
            Tokens Generated
          </span>
          <h2>
            {totalTokens}
          </h2>
        </div>

        <div className="stat-card">
          <span>
            Average Size
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
              Largest Document
            </span>

            <h3>
              {
                largestFile
                  ? largestFile.name
                  : "None"
              }
            </h3>

          </div>

        </div>

      </section>

      {/* Workflow */}

      <section className="convert-section">

        <h2>
          How PDF2AI Works
        </h2>

        <div className="workflow-grid">

          <div>
            1️) Upload PDF
          </div>

          <div>
            2️) Detect PDF Type
          </div>

          <div>
            3️) OCR + Markdown
          </div>

          <div>
            4️) Export Results
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
            Input: PDF
          </div>

          <div>
            Output: Markdown
          </div>

          <div>
            Output: TXT
          </div>

          <div>
            Output: JSON
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
            Use text-based PDFs
            for best results.
          </li>

          <li>
            Structured documents
            convert more accurately.
          </li>

          <li>
            Resumes and reports
            work exceptionally well.
          </li>

          <li>
            Scanned PDFs are automatically
            processed using OCR before
            Markdown generation.
          </li>

        </ul>

      </section>

      {/* Roadmap */}

      <section className="convert-section">

        <h2>
          Coming Soon
        </h2>

        <div className="workflow-grid">
          
          <div>
            PDF Analysis
          </div>

          <div>
            Batch Conversion
          </div>

          <div>
            ZIP Exports
          </div>

          <div>
            AI Summaries
          </div>

          <div>
            Vector Export
          </div>

          <div>
            Knowledge Base Builder
          </div>

          <div>
            Smart OCR Progress
          </div>

          <div>
            Batch Conversion
          </div>

          <div>
            AI Summaries
          </div>

          <div>
            ZIP Export
          </div>

          <div>
            Vector Export
          </div>

          <div>
            Knowledge Base Builder
          </div>

        </div>

      </section>

    </div>
  );
}

export default Convert;