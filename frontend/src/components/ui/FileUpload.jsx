import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import { useToast } from "../../contexts/ToastContext";

import { convertPdf } from "../../services/conversionService";

import ReactMarkdown from "react-markdown";

import { downloadFile } from "../../utils/exportUtils";

import {saveRecentFile,} from "../../utils/recentFiles";

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

  const handleConvert = async () => {
    if (!file) return;

    try {
      setConverting(true);

      const result = await convertPdf(file);

      setMarkdown(result.markdown);

      saveRecentFile({
        id: Date.now(),

        name: file.name,

        size: file.size,

        markdown: result.markdown,

        createdAt:
          new Date().toISOString(),
      });

      setConverted(true);

      showToast(
        "Conversion Complete",
        "PDF converted successfully.",
        "success"
      );
    } catch (error) {
      console.error(error);

      showToast(
        "Conversion Failed",
        "Unable to process document.",
        "error"
      );
    } finally {
      setConverting(false);
    }
  };

  const removeFile = () => {
    setFile(null);

    setConverted(false);

    setMarkdown("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const { showToast } = useToast();

  const [converting, setConverting] = useState(false);

  const [markdown, setMarkdown] = useState("");

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(
      markdown
    );

    showToast(
      "Copied",
      "Markdown copied to clipboard.",
      "success"
    );
  };

  const downloadMarkdown = () => {
    downloadFile(
      markdown,
      "document.md",
      "text/markdown"
    );
  };

  const downloadText = () => {
    downloadFile(
      markdown,
      "document.txt",
      "text/plain"
    );
  };

  const downloadJson = () => {
    downloadFile(
      JSON.stringify(
        { markdown },
        null,
        2
      ),
      "document.json",
      "application/json"
    );
  };

  const [converted, setConverted] = useState(false);


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
        <>
          <div className="file-card">

            <div className="file-info">

              <h3>{file.name}</h3>

              <p>
                Size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <span className="file-status">
                {converted
                  ? "Conversion Complete"
                  : "Ready For Conversion"}
              </span>

            </div>

            <div className="file-actions">

              <button
                className={`convert-btn ${
                  converted ? "success" : ""
                }`}
                disabled={converting || converted}
                onClick={handleConvert}
              >
                {converting
                  ? "Converting..."
                  : converted
                    ? "Converted"
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

          {markdown && (
            <div className="markdown-preview">
              <div className="preview-header">

                <h3>Markdown Output</h3>

                <div className="export-toolbar">

                  <button
                    onClick={copyMarkdown}
                  >
                    Copy
                  </button>

                  <button
                    onClick={downloadMarkdown}
                  >
                    MD
                  </button>

                  <button
                    onClick={downloadText}
                  >
                    TXT
                  </button>

                  <button
                    onClick={downloadJson}
                  >
                    JSON
                  </button>

                </div>

              </div>

              <div className="markdown-content">
                <ReactMarkdown>
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FileUpload;