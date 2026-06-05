import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import { useToast } from "../../contexts/ToastContext";

import { convertPdf } from "../../services/conversionService";

import ReactMarkdown from "react-markdown";

import { downloadFile, exportJsonFile } from "../../utils/exportUtils";

import {saveRecentFile,} from "../../utils/recentFiles";

import { getSaveHistory, } from "../../utils/settingsStorage";

import LoadingOverlay from "../ui/LoadingOverlay";

import { analyzePdf } from "../../services/conversionService";

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

  if (converting) return;

  if (!file) return;

  setErrorMessage("");

  try {

    setConverting(true);

    setOverlayTitle(
      "Analyzing Document"
    );

    setOverlayMessage(
      "Checking PDF structure and content."
    );

    setStatus(
      "Analyzing Document..."
    );

    setProgress(20);

    const analysisResult =
      await analyzePdf(file);

    setPdfAnalysis(
      analysisResult.analysis
    );

    setProgress(40);

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          1500
        )
    );

    if (
      analysisResult.analysis.ocr_required
    ) {

      setOverlayTitle(
        "OCR Processing"
      );

      setOverlayMessage(
        "Scanned PDF detected. OCR text recognition is running."
      );

      setProgress(60);

    }
    else {

      setOverlayTitle(
        "Extracting Text"
      );

      setOverlayMessage(
        "Document contains selectable text. Extracting content."
      );

    }

    setStatus(
      "Processing PDF..."
    );

    const result =
      await convertPdf(file);

    if (!result.success) {

      throw new Error(
        result.error
      );

    }

    setOverlayTitle(
      "Generating Markdown"
    );

    setOverlayMessage(
      "Converting document into AI-ready Markdown."
    );

    setStatus(
      "Generating Markdown..."
    );

    setProgress(80);

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          1000
        )
    );

    setMarkdown(
      result.markdown
    );

    if (
      getSaveHistory()
    ) {

    saveRecentFile({

      id: Date.now(),

      name: file.name,

      size: file.size,

      markdown:
        result.markdown,

      analysis:
        analysisResult.analysis,

      createdAt:
        new Date()
          .toISOString()

    });

    }

    setConverted(true);

    setProgress(100);

    setStatus(
      "Conversion Complete"
    );

    showToast(
      "Conversion Complete",
      "PDF converted successfully.",
      "success"
    );

  } catch (error) {

  console.error(error);

  setStatus(
    "Conversion Failed"
  );

  setErrorMessage(
    error.message
  );

  setMarkdown("");

  showToast(

    "Conversion Failed",

    error.message,

    "error"

  );

} finally {

    setConverting(false);
    
    setTimeout(() => {

      setProgress(0);

    }, 500);

  }

};

  const removeFile = () => {
    setFile(null);

    setConverted(false);

    setMarkdown("");
    
    setErrorMessage("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const { showToast } = useToast();

  const [converting, setConverting] = useState(false);

  const [markdown, setMarkdown] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const wordCount = markdown
    ? markdown.trim().split(/\s+/).length
    : 0;

  const characterCount = markdown.length;

  const estimatedTokens = Math.ceil(
    characterCount / 4
  );
  

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

    exportJsonFile({

      name:
        file.name,

      size:
        file.size,

      markdown,

      analysis:
        pdfAnalysis

    });

  };

  const [converted, setConverted] = useState(false);

  const [status, setStatus] = useState("");

  const [overlayTitle, setOverlayTitle] = useState("");

  const [overlayMessage, setOverlayMessage] = useState("");

  const [ pdfAnalysis, setPdfAnalysis ] = useState(null);

  const [progress, setProgress] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

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
                ? status
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

          {
            errorMessage && (

              <div className="error-card">

                <h2>
                  Conversion Failed
                </h2>

                <p>
                  {errorMessage}
                </p>

              </div>

            )
          }

          {markdown && (
            <div className="markdown-preview">
              <div className="document-stats">
                <div className="stat-box">
                  <span>Words</span>
                  <strong>{wordCount}</strong>
                </div>

                <div className="stat-box">
                  <span>Characters</span>
                  <strong>{characterCount}</strong>
                </div>

                <div className="stat-box">
                  <span>Tokens</span>
                  <strong>{estimatedTokens}</strong>
                </div>
              </div>
                <div className="preview-header">

                  <h3>Markdown Output</h3>

                </div>

                <div className="search-container">

                  <input
                    type="text"
                    placeholder="Search inside document..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    className="search-input"
                  />

                </div>

                <div className="export-toolbar">

                  <button
                      className="copy-btn"
                      onClick={copyMarkdown}
                    >
                    Copy
                  </button>

                  <button
                      className="md-btn"
                      onClick={downloadMarkdown}
                    >
                    MD
                  </button>

                  <button
                      className="txt-btn"
                      onClick={downloadText}
                    >
                    TXT
                  </button>

                  <button
                      className="json-btn"
                      onClick={downloadJson}
                    >
                    JSON
                  </button>

                </div>

              <div className="markdown-content">
                <ReactMarkdown>
                  {
                    searchTerm
                      ? markdown
                          .split("\n")
                          .filter((line) =>
                            line
                              .toLowerCase()
                              .includes(
                                searchTerm.toLowerCase()
                              )
                          )
                          .join("\n")
                      : markdown
                  }
                </ReactMarkdown>
              </div>
            </div>
          )}
        </>
      )}

      {converting && (

      <LoadingOverlay
        title={overlayTitle}
        message={overlayMessage}
        analysis={pdfAnalysis}
        progress={progress}
      />

    )}
    </>
  );
}

export default FileUpload;