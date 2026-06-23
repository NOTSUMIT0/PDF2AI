import { useEffect, useState }
from "react";

import {
  getRecentFiles,
  deleteRecentFile,
} from "../utils/recentFiles";

import { downloadFile, replaceExtension, }
from "../utils/exportUtils";

import { useNavigate }
from "react-router-dom";

function RecentFiles() {

  const [files, setFiles] =
    useState([]);

    useEffect(() => {
      setFiles(
        getRecentFiles()
      );
  }, []);

  const handleDelete = (id) => {
    deleteRecentFile(id);

    setFiles(
      getRecentFiles()
    );
  };

  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredFiles =
  files.filter((file) =>
    file.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );  

  const navigate = useNavigate();

  return (
    <div>

      <h2 className="page-title">Recent Files</h2>

      <div className="recent-search">
        <div className="recent-stats">

          <div className="stat-box">
            <span>Total Files</span>
            <strong>
              {files.length}
            </strong>
          </div>

        </div>
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      {files.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            📄
          </div>

          <h2>
            No Conversions Yet
          </h2>

          <p>
            Convert your first document, media or youtube video to start
            building your document history.
          </p>

        </div>

      ) : (
        filteredFiles.map((file) => (
          <div
            key={file.id}
            className="recent-file-card"
          >

            <div className="recent-file-info">

              <h3>{file.name}</h3>

              <p>
                {(file.size / 1024 / 1024)
                  .toFixed(2)}
                MB
              </p>

            </div>

            <div className="recent-actions">

              <button
                className="open-btn"
                onClick={() =>
                  navigate(
                    "/document-viewer",
                    {
                      state: { file },
                    }
                  )
                }
              >
                Open
              </button>

              <button
                className="download-btn"
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
                Download
              </button>

              <button className="delete-btn"
                onClick={() =>
                  handleDelete(file.id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default RecentFiles;