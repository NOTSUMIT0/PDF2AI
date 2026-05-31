import { useLocation, useNavigate, } from "react-router-dom";

function DocumentViewer() {
  const location = useLocation();

  const navigate = useNavigate();

  const file = location.state?.file;

  if (!file) {
    return (
      <div>
        <h1>No Document Selected</h1>
      </div>
    );
  }

  return (
    <div className="viewer-page">

      <button
        className="back-btn"
        onClick={() =>
          navigate("/recent-files")
        }
      >
        Back to Recent Files
      </button>

      <h1>{file.name}</h1>

      <div className="viewer-meta">
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </div>

      <div className="viewer-content">
        <pre>{file.markdown}</pre>
      </div>

    </div>
  );
}

export default DocumentViewer;