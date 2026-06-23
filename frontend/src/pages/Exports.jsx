import { useEffect, useState } from "react";

import {
  getRecentFiles,
} from "../utils/recentFiles";

import {
  downloadFile,
  exportJsonFile,
  replaceExtension,
} from "../utils/exportUtils";

import { useToast }
from "../contexts/ToastContext";

function Exports() {

  const [files, setFiles] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    setFiles(
      getRecentFiles()
    );
  }, []);

  const filteredFiles =
    files.filter((file) =>
      file.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  const { showToast } =
    useToast();

  const handleCopy = async (
    markdown
  ) => {

    await navigator.clipboard.writeText(
      markdown
    );

    showToast(
      "Copied",
      "Markdown copied to clipboard.",
      "success"
    );

  };

  return (
    <div>

      <div className="page-header">

        <h2 className="page-title">
          Exports Center
        </h2>

        <p className="page-subtitle">
          Export Markdown, TXT and JSON
          formats instantly. Access previous
          conversions and reuse AI-ready
          content whenever needed.
        </p>

      </div>

      <div className="export-stats">

        <div className="stat-box">
          <span>
            Total Files
          </span>
          <strong>
            {files.length}
          </strong>
        </div>

        <div className="stat-box">
          <span>
            Markdown
          </span>
          <strong>
            {files.length}
          </strong>
        </div>

        <div className="stat-box">
          <span>
            TXT
          </span>
          <strong>
            {files.length}
          </strong>
        </div>

        <div className="stat-box">
          <span>
            JSON
          </span>
          <strong>
            {files.length}
          </strong>
        </div>

      </div>

      <input
        className="exports-search"
        type="text"
        placeholder="Search exports..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />
      
      {filteredFiles.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            📦
          </div>

          <h2>
            No Exports Available
          </h2>

          <p>
            Convert your first document, media or youtube video to create
            Markdown, TXT and JSON exports.
          </p>

        </div>

      ) : (

        filteredFiles.map(
          (file) => (

            <div
              key={file.id}
              className="export-card"
            >

              <div>

                <h3>
                  {file.name}
                </h3>

                <p>
                  {(file.size /
                    1024 /
                    1024).toFixed(2)}
                  MB
                </p>

              </div>

              <div className="export-actions">

                <button
                  className="md-btn"
                  onClick={() =>
                    downloadFile(
                      file.markdown,
                      replaceExtension(
                        file.name,
                        ".md"
                      ),
                      "text/markdown"
                    )
                  }
                >
                  MD
                </button>

                <button
                  className="txt-btn"
                  onClick={() =>
                    downloadFile(
                      file.markdown,
                      replaceExtension(
                        file.name,
                        ".txt"
                      ),
                      "text/plain"
                    )
                  }
                >
                  TXT
                </button>

                <button
                  className="json-btn"
                  onClick={() =>
                    exportJsonFile(
                      file
                    )
                  }
                >
                  JSON
                </button>

                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      file.markdown
                    )
                  }
                >
                  Copy
                </button>

              </div>

            </div>

          )
        )

      )}

    </div>
  );
}

export default Exports;