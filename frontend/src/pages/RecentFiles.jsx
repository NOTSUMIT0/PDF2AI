import { useEffect, useState }
from "react";

import {
  getRecentFiles,
} from "../utils/recentFiles";

function RecentFiles() {

  const [files, setFiles] =
    useState([]);

  useEffect(() => {
    setFiles(
      getRecentFiles()
    );
  }, []);

  return (
    <div>

      <h1>Recent Files</h1>

      {files.length === 0 ? (
        <p>
          No conversions yet.
        </p>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            className="recent-file-card"
          >
            <h3>{file.name}</h3>

            <p>
              {(file.size /
                1024 /
                1024).toFixed(2)}
              MB
            </p>

            <p>
              {new Date(
                file.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default RecentFiles;