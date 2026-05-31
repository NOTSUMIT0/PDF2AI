import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import { useToast } from "../../contexts/ToastContext";

function FileUpload() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleSelect = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      showToast(
        "Invalid File Type",
        "Only PDF files are supported.",
        "error"
      );
      return;
    }

    const maxSize = 100 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      showToast(
        "File Too Large",
        "Maximum supported size is 100 MB.",
        "error"
      );
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    handleSelect(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    handleSelect(droppedFile);
  };

  const removeFile = () => {
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const { showToast } = useToast();

  const [converting, setConverting] = useState(false);

  return (
    <>
      {!file ? (
        <section className={`upload-zone ${ dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
            >
          <div className="upload-icon-wrapper">
            <Upload size={56} />
          </div>

          <h2 className="upload-title">
            Upload Your PDF
          </h2>

          <p className="upload-description">
            Drag and drop a document or choose a file.
          </p>

          <div className="upload-divider">
            <span>or</span>
          </div>

          <button
            className="primary-btn"
            onClick={() => inputRef.current.click()}
          >
            Select Document
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            hidden
            onChange={handleInputChange}
          />

          <span className="upload-hint">
            Local Processing • PDF • Up To 100 MB
          </span>
        </section>
      ) : (
        <div className="file-card">

          <div className="file-info">

            <h3>{file.name}</h3>

            <p>
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <span className="file-status">
              Ready For Conversion
            </span>

          </div>

          <div className="file-actions">

            <button
              className="convert-btn"
              disabled={converting}
            >
              {converting
                ? "Converting..."
                : "Convert"}
            </button>

            <button
              className="remove-file-btn"
              onClick={removeFile}
            >
              <X size={18} />
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default FileUpload;