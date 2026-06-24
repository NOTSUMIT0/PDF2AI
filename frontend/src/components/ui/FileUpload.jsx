import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import { useToast } from "../../contexts/ToastContext";

import { convertDocument, convertYoutube, analyzeDocument } from "../../services/conversionService";

import ReactMarkdown from "react-markdown";

import { exportJsonFile } from "../../utils/exportUtils";

import {saveRecentFile,} from "../../utils/recentFiles";

import { getSaveHistory, } from "../../utils/settingsStorage";

import LoadingOverlay from "../ui/LoadingOverlay";

import { FileText } from "lucide-react";

import Tooltip from "../ui/Tooltip";

import { getGroqApiKey, saveGroqApiKey } from "../../utils/apiKeyStorage";

import { generateSummary } from "../../services/summaryService";

function FileUpload() {
  const inputRef = useRef(null);
  
  const [dragging, setDragging] = useState(false);

  const [documentFiles, setDocumentFiles] = useState([]);

  const [mediaFiles, setMediaFiles] = useState([]);


  const handleInputChange = (e) => {

    const selectedFiles =
      Array.from(
        e.target.files
      );

    const validFiles = [];

    selectedFiles.forEach(
      (file) => {

        const extension =
          "." +
          file.name
            .split(".")
            .pop()
            .toLowerCase();

        const allowedExtensions = [
          ".pdf",
          ".doc",
          ".docx",
          ".ppt",
          ".pptx",
          ".xls",
          ".xlsx",
          ".html",
          ".csv",
          ".json",
          ".xml",
          ".epub",
          ".zip",
          ".txt",
          ".md",
          ".png",
          ".jpg",
          ".jpeg",
          ".bmp",
          ".tiff",
          ".webp",
          ".mp3",
          ".wav",
          ".m4a",
          ".flac",
          ".ogg",
          ".mp4",
          ".mov",
          ".mkv",
          ".avi",
          ".webm",
        ];

        if (
          allowedExtensions.includes(
            extension
          )
        ) {
          validFiles.push(file);
        }

      }
    );

    if (activeTab === "documents") {
      setDocumentFiles(
        validFiles
      );

    }
    else if (
      activeTab === "media"
    ) {

      setMediaFiles(
        validFiles
      );

    }

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

    const droppedFiles =
      Array.from(
        e.dataTransfer.files
      );

    if (
      activeTab === "documents"
    ) {

      setDocumentFiles(prev => {

        const merged = [
          ...prev,
          ...droppedFiles
        ];

        return merged.filter(
          (
            file,
            index,
            self
          ) =>
            index ===
            self.findIndex(
              f =>
                f.name === file.name
            )
        );

      });

    }
    else if (
      activeTab === "media"
    ) {

      setMediaFiles(prev => {

        const merged = [
          ...prev,
          ...droppedFiles
        ];

        return merged.filter(
          (
            file,
            index,
            self
          ) =>
            index ===
            self.findIndex(
              f =>
                f.name === file.name
            )
        );

      });

    }

  };

const startFakeProgress = () => {

  let current = 0;

  const interval = setInterval(() => {

    current = Math.min(
      current + 2,
      95
    );

    setProgress(current);

  }, 800);

  return interval;

}; 

const handleYoutubeConvert =
  async () => {

    if (!youtubeUrl)
      return;

    try {

      setConverting(true);
      setCurrentFileName("YouTube URL");

      setPdfAnalysis({
        pages: "YouTube",
        images: "N/A",
        scanned: false,
        ocr_required: false,
        estimated_time: "10-60 sec"
      });

      setOverlayTitle(
        "Downloading YouTube Video"
      );

      setOverlayMessage(
        "Fetching audio..."
      );

      let interval = null;

      let result = null;

      try {

        interval = startFakeProgress();

        result =
          await convertYoutube(
            youtubeUrl
          );

        setProgress(100);

      }
      finally {

        if (interval) {

          clearInterval(interval);

        }

      }

      setYoutubeResults(
        (result.documents || []).map(doc => ({
          ...doc,
          size: 0
        }))
      );

      if (getSaveHistory()) {

        result.documents.forEach(
          (document, index) => {

            saveRecentFile({

              id:
                Date.now() + index,

              name:
                document.name ||
                "YouTube Transcript",

              size: 0,

              markdown:
                document.markdown,

              analysis: {
                pages: "YouTube",
                images: "N/A",
                ocr_required: false
              },

              createdAt:
                new Date().toISOString()

            });

          }
        );

      }

      setYoutubeConverted(true);

      setStatus(
        "Conversion Complete"
      );

      showToast(
        "Conversion Complete",
        "Transcript generated successfully.",
        "success"
      );

      console.log(
        "YouTube Results Saved:",
        result.documents
      );

      setCurrentFileName(
        "YouTube Transcript"
      );

      setPdfAnalysis({
        pages: "YouTube",
        images: "N/A",
        scanned: false,
        ocr_required: false,
        estimated_time: "10-60 sec"
      });

    }
    catch (error) {

      console.error(error);

      showToast(
        "Conversion Failed",
        error.message,
        "error"
      );

      setErrorMessage(
        error.message
      );

    }
    finally {

      setConverting(
        false
      );

    }
    

};

const handleConvert = async () => {

  if (converting) return;

  if (
    currentFiles.length === 0
  )
    return;

  setErrorMessage("");

  try {

    setConverting(true);

    setOverlayTitle(
      "Analyzing Document"
    );

    setOverlayMessage(
      "Analyzing document structure and content."
    );

    setStatus(
      "Analyzing Document..."
    );

    setProgress(20);

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          300
        )
    );

    const allResults = [];
    const analysesMap = {};

    for (
      let i = 0;
      i < currentFiles.length;
      i++
    ) {

      const currentFile =
        currentFiles[i];

      const extension =
        currentFile.name
          .split(".")
          .pop()
          .toLowerCase();

      const isAudio = [

        "mp3",
        "wav",
        "m4a",
        "aac",
        "ogg",
        "flac"

      ].includes(extension);

      const isVideo = [

        "mp4",
        "mov",
        "mkv",
        "avi",
        "webm"

      ].includes(extension);

      setCurrentFileName(
        currentFile.name
      );

      const analysisResult =
        await analyzeDocument(
          currentFile
        );

      if (isAudio) {

        setOverlayTitle(
          "Transcribing Audio"
        );

        setOverlayMessage(
          "Extracting speech from audio..."
        );

      }
      else if (isVideo) {

        setOverlayTitle(
          "Transcribing Video"
        );

        setOverlayMessage(
          "Extracting audio and generating transcript..."
        );

      }
      else if (
        analysisResult.analysis
          ?.ocr_required
      ) {

        setOverlayTitle(
          `OCR Processing ${
            i + 1
          }/${currentFiles.length}`
        );

        setOverlayMessage(
          currentFile.name
        );

      }
      else {

        setOverlayTitle(
          `Processing File ${
            i + 1
          }/${currentFiles.length}`
        );

        setOverlayMessage(
          currentFile.name
        );

      }  

      setPdfAnalysis(
        analysisResult.analysis
      );

      analysesMap[currentFile.name] =
        analysisResult.analysis;

      setFileAnalyses(
        prev => ({
          ...prev,
          [currentFile.name]:
            analysisResult.analysis
        })
      );

      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            100
          )
      );

      let progressInterval = null;

      try {

        if (
          isAudio ||
          isVideo
        ) {

          progressInterval =
            startFakeProgress();

        }

        const result =
          await convertDocument(
            currentFile
          );

        if (!result.success) {

          throw new Error(
            result.error
          );

        }

        allResults.push(
          ...result.documents.map(
            doc => ({
              ...doc,
              size: currentFile.size
            })
          )
        );

      }
      finally {

        if (progressInterval) {

          clearInterval(
            progressInterval
          );

        }

      }

      console.log(
        "Current file:",
        currentFile.name
      );

      console.log(
        "Analysis:",
        analysisResult
      );

      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            100
          )
      );
 
      setProgress(
        Math.floor(
          (
            (i + 1) /
            currentFiles.length
          ) * 100
        )
      );

    }

    if (
      activeTab === "documents"
    ) {

      setDocumentResults(
        allResults
      );

    }
    else if (
      activeTab === "media"
    ) {

      setMediaResults(
        allResults
      );

    }

    if (
      getSaveHistory()
    ) {

    allResults.forEach(
      (
        document,
        index
      ) => {

        saveRecentFile({

          id:
            Date.now() + index,

          name:
            document.name,

          size:
            document.size || 0,

          markdown:
            document.markdown,

          analysis:
            analysesMap[
              document.name
            ] || {},

          createdAt:
            new Date()
              .toISOString()

        });

      }
    );

    }

    if (
      activeTab === "documents"
    ) {

      setDocumentConverted(
        true
      );

    }
    else {

      setMediaConverted(
        true
      );

    }

    setProgress(100);

    setStatus(
      "Conversion Complete"
    );

    showToast(
      "Conversion Complete",
      "Document converted successfully.",
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

    setDocumentFiles([]);
    setMediaFiles([]);

    if (
      activeTab === "documents"
    ) {

      setDocumentResults([]);

    }
    else if (
      activeTab === "media"
    ) {

      setMediaResults([]);

    }
    else {

      setYoutubeResults([]);

    }

    setDocumentConverted(
      false
    );

    setMediaConverted(
      false
    );

    setYoutubeConverted(
      false
    );
    
    setErrorMessage("");

    setYoutubeUrl("");

    setActiveTab("documents");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const { showToast } = useToast();

  const [converting, setConverting] = useState(false);

  const [documentResults, setDocumentResults] = useState([]);

  const [mediaResults, setMediaResults] = useState([]);

  const [youtubeResults, setYoutubeResults] = useState([]);

  const [fileAnalyses, setFileAnalyses] = useState({});

  const [searchTerms, setSearchTerms] = useState({});

  const [activeTab, setActiveTab] = useState("documents");

  const youtubeFile = {
    name: "youtube-transcript.md",
    size: 0
  };

  const currentFiles =
    activeTab === "documents"
      ? documentFiles
      : activeTab === "media"
      ? mediaFiles
      : youtubeResults.length > 0
      ? [youtubeFile]
      : [];

  const currentResults =
  activeTab === "documents"
    ? documentResults
    : activeTab === "media"
    ? mediaResults
    : youtubeResults;

  console.log(
    "Active Tab:",
    activeTab
  );

  console.log(
    "Current Results:",
    currentResults
  );    

  const hasResults = currentResults.length > 0;   

  const activeMarkdown =
    currentResults
      .map(
        doc => doc.markdown || ""
      )
      .join("\n");

  const copyDocument = async (
    markdown
  ) => {

    await navigator
      .clipboard
      .writeText(
        markdown
      );

    showToast(
      "Copied",
      "Document copied.",
      "success"
    );

  }; 
  
  const toggleDocument = (
    index
  ) => {

    setExpandedDocs(
      prev => ({
        ...prev,
        [index]:
          !prev[index]
      })
    );

  };

  const wordCount =
    activeMarkdown
      ? activeMarkdown
          .trim()
          .split(/\s+/)
          .length
      : 0;

  const characterCount = activeMarkdown.length;

  const estimatedTokens = Math.ceil(
    characterCount / 4
  );
  
  const [documentConverted, setDocumentConverted] = useState(false);

  const [mediaConverted, setMediaConverted] = useState(false);

  const [youtubeConverted, setYoutubeConverted] = useState(false);

  const [status, setStatus] = useState("");

  const [overlayTitle, setOverlayTitle] = useState("");

  const [overlayMessage, setOverlayMessage] = useState("");

  const [pdfAnalysis, setPdfAnalysis ] = useState(null);

  const [progress, setProgress] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const [expandedDocs, setExpandedDocs] = useState({});

  const [currentFileName, setCurrentFileName] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const converted =

  activeTab === "documents"

    ? documentConverted

    : activeTab === "media"

    ? mediaConverted

    : youtubeConverted;


  const [
    showSummaryModal,
    setShowSummaryModal
  ] = useState(false);

  const [
    summaryLoading,
    setSummaryLoading
  ] = useState(false);

  const [
    selectedDocument,
    setSelectedDocument
  ] = useState(null);

  const [
    summaryMode,
    setSummaryMode
  ] = useState("short");

  const [
    summaryResults,
    setSummaryResults
  ] = useState({
    documents: "",
    media: "",
    youtube: ""
  });  
  

  const [
    showApiKeyModal,
    setShowApiKeyModal
  ] = useState(false);

  const [
    tempApiKey,
    setTempApiKey
  ] = useState("");

  const openSummaryModal =
    (document) => {

      const key = getGroqApiKey();

      if (!key) {
        setSelectedDocument(
          document
        );

        setShowApiKeyModal(
          true
        );

        return;
      }

      setSelectedDocument(document);

      setShowSummaryModal(true);
  };

  const handleGenerateSummary =
    async () => {

      if (!selectedDocument)
        return;

      try {

        setSummaryLoading(true);

        const result =
          await generateSummary(
            selectedDocument.markdown,
            summaryMode,
            getGroqApiKey()
          );

        if (result.success) {

          setSummaryResults(prev => ({
            ...prev,
            [activeTab]: result.summary
          }));

          if (
            getSaveHistory()
          ) {

            saveRecentFile({

              id: Date.now(),

              name:
                `AI-${summaryMode}-summary.txt`,

              size:
                result.summary.length,

              markdown:
                result.summary,

              analysis: {
                pages: "AI",
                images: 0,
                ocr_required: false
              },

              createdAt:
                new Date()
                  .toISOString()

            });

          }

        }

      }
      catch (error) {

        console.error(error);

        showToast(
          "Summary Failed",
          "Could not generate summary.",
          "error"
        );

      }
      finally {

        setSummaryLoading(false);

      }

  };

  const copySummary =
    async () => {

      await navigator.clipboard.writeText(
        summaryResults[activeTab]
      );

      showToast(
        "Copied",
        "Summary copied successfully.",
        "success"
      );

  };

  const downloadSummary =
    () => {

      const blob =
        new Blob(
          [summaryResults[activeTab]],
          {
            type: "text/plain"
          }
        );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download = `${summaryMode}-summary.txt`;

      a.click();

      URL.revokeObjectURL(url);

  };

  const handleTabChange = (tab) => {

  setActiveTab(tab);

  setShowSummaryModal(false);

};

  return (
    <>

      <div className="converter-tabs">

        <button
          className={
            activeTab === "documents"
              ? "tab-btn active"
              : "tab-btn"
          }
          onClick={() =>
            handleTabChange("documents")
          }
        >
          📄 Documents
        </button>

        <button
          className={
            activeTab === "media"
              ? "tab-btn active"
              : "tab-btn"
          }
          onClick={() =>
            setActiveTab("media")
          }
        >
          🎬 Media
        </button>

        <button
          className={
            activeTab === "youtube"
              ? "tab-btn active"
              : "tab-btn"
          }
          onClick={() =>
            setActiveTab("youtube")
          }
        >
          ▶️ YouTube
        </button>

      </div>

      {
        activeTab === "youtube" && !hasResults ? (

          <div className="youtube-card">

          <h2>
            YouTube Transcript
          </h2>

          <p>
            Paste a YouTube URL and convert
            it into AI-ready Markdown.
          </p>

          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) =>
              setYoutubeUrl(
                e.target.value
              )
            }
            placeholder="https://youtube.com/watch?v=..."
            className="youtube-input"
          />

          <button
            className="youtube-btn"
            disabled={converting}
            onClick={
              handleYoutubeConvert
            }
          >
            {
              converting
                ? `Generating... ${progress}%`
                : "Generate Transcript"
            }
          </button>

        </div>

      ) : 

        (
          activeTab !== "youtube" &&
          currentFiles.length === 0
        ) ? (

          <section
            className={`upload-zone ${
              dragging ? "dragging" : ""
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
            >
          <div className="upload-icon-wrapper">
            <Upload size={56} />
          </div>

          <h2 className="upload-title">

            {
              activeTab === "media"
                ? "Upload Audio or Video"
                : "Upload Your Document"
            }

          </h2>

          <p className="upload-description">

            {
              activeTab === "media"
                ? "Drag and drop audio or video files."
                : "Drag and drop a document or choose a file."
            }

          </p>

          <div className="upload-divider">
            <span>or</span>
          </div>

          <button
            className="primary-btn"
            onClick={() => inputRef.current.click()}
          >
            {
              activeTab === "media"
                ? "Select Media"
                : "Select Document"
            }
          </button>

          <input
            ref={inputRef}
            type="file"
            multiple
              accept={
                activeTab === "media"

                  ? ".mp3,.wav,.m4a,.flac,.ogg,.mp4,.mov,.mkv,.avi,.webm"

                  : ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.html,.csv,.json,.xml,.epub,.zip,.txt,.md,.png,.jpg,.jpeg,.bmp,.tiff,.webp"
              }
            hidden
            onChange={handleInputChange}
          />

          <span className="upload-hint">
            Local Processing • Documents, Images & Archives • Up To 100 MB
          </span>
        </section>
      ) : (
        <>
          <div className="file-card">

            <div className="file-info">

              <h3>
                {currentFiles.length} Files Selected
              </h3>

              <p>
                Total Files Ready:
                {" "}
                {currentFiles.length}
              </p>

              <span className="file-status">

                {converted
                  ? "Conversion Complete"
                  : "Ready For Conversion"}

              </span>

              <div className="selected-files-list">

                {currentFiles.map(
                  (
                    currentFile,
                    index
                  ) => (
                    <div
                      key={index}
                      className="selected-file-item"
                    >

                      <FileText
                        size={18}
                        className="file-icon"
                      />

                      <div
                        className="selected-file-details"
                      >

                        <span
                          className="file-name"
                        >
                          {currentFile.name}
                        </span>

                        <span
                          className="file-meta"
                        >

                          {
                            currentFile.name
                              .split(".")
                              .pop()
                              .toUpperCase()
                          }

                          {" • "}

                          {
                            (
                              currentFile.size /
                              1024 /
                              1024
                            ).toFixed(2)
                          }

                          MB

                        </span>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="file-actions">

                {activeTab !== "youtube" && (

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
                  )}
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

          {hasResults && (
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

              <div className="documents-container">

                {currentResults.map(
                  (
                    document,
                    index
                  ) => (

                    <div
                      key={index}
                      className="document-card"
                    >

                      <div
                        className="document-header"
                        >

                        <div
                            className="document-title-block"
                            onClick={() =>
                              toggleDocument(index)
                            }
                          >

                          <h2>
                            <Tooltip text="collapse">
                            <span className="collapse-icon">
                              {
                                expandedDocs[index] === false
                                  ? "►"
                                  : "▼"
                              }
                            </span>
                            </Tooltip>

                            {" "}

                            {document.name}

                          </h2>

                          <p className="document-meta">

                            {
                              document.name
                                .split(".")
                                .pop()
                                .toUpperCase()
                            }

                            {" • "}

                            {
                              (
                                (
                                  document.size || 0
                                ) /
                                1024 /
                                1024
                              ).toFixed(2)
                            }

                            MB

                          </p>

                        </div>

                        <div
                          className="document-stats-mini"
                        >

                          <div
                            className="mini-stat"
                          >
                            <span>
                              Words
                            </span>

                            <strong>
                              {
                                document.markdown
                                  .trim()
                                  .split(/\s+/)
                                  .length
                              }
                            </strong>
                          </div>

                          <div
                            className="mini-stat"
                          >
                            <span>
                              Characters
                            </span>

                            <strong>
                              {
                                document.markdown.length
                              }
                            </strong>
                          </div>

                          <div
                            className="mini-stat"
                          >
                            <span>
                              Tokens
                            </span>

                            <strong>
                              {
                                Math.ceil(
                                  document.markdown.length / 4
                                )
                              }
                            </strong>
                          </div>

                        </div>

                      </div>

                      {
                          expandedDocs[index] !== false &&
                          (
                            <>

                      <div
                        className="search-container"
                      >

                        <input
                          type="text"
                          placeholder="Search inside document..."
                          value={
                            searchTerms[index] || ""
                          }
                          onChange={(e) =>
                            setSearchTerms({
                              ...searchTerms,
                              [index]:
                                e.target.value
                            })
                          }
                          className="search-input"
                        />

                      </div>

                      <div
                        className="export-toolbar"
                      >

                        <button
                          className="copy-btn"
                          onClick={() =>
                            copyDocument(
                              document.markdown
                            )
                          }
                        >
                          Copy
                        </button>

                        <button
                          className="md-btn"
                          onClick={() => {

                            const blob =
                              new Blob(
                                [
                                  document.markdown
                                ],
                                {
                                  type:
                                    "text/markdown"
                                }
                              );

                            const url =
                              URL.createObjectURL(
                                blob
                              );

                            const a =
                              window.document.createElement(
                                "a"
                              );

                            a.href = url;

                            a.download =
                              document.name.replace(
                                /\.[^/.]+$/,
                                ".md"
                              );

                            a.click();

                            URL.revokeObjectURL(
                              url
                            );

                          }}
                        >
                          MD
                        </button>

                        <button
                          className="txt-btn"
                          onClick={() => {

                            const blob =
                              new Blob(
                                [
                                  document.markdown
                                ],
                                {
                                  type:
                                    "text/plain"
                                }
                              );

                            const url =
                              URL.createObjectURL(
                                blob
                              );

                            const a =
                              window.document.createElement(
                                "a"
                              );

                            a.href = url;

                            a.download =
                              document.name.replace(
                                /\.[^/.]+$/,
                                ".txt"
                              );

                            a.click();

                            URL.revokeObjectURL(
                              url
                            );

                          }}
                        >
                          TXT
                        </button>

                        <button
                          className="json-btn"
                          onClick={() =>

                            exportJsonFile({

                              name:
                                document.name,

                              size:
                                document.size || 0,

                              markdown:
                                document.markdown,

                              analysis:
                                fileAnalyses[
                                  document.name
                                ]

                            })

                          }
                        >
                          JSON
                        </button>

                        <button
                          className="summary-btn"
                          onClick={() =>
                            openSummaryModal(
                              document
                            )
                          }
                        >
                          AI Summary
                        </button>

                      </div>

                      <div
                        className="markdown-scroll-box"
                      >

                        <ReactMarkdown>

                          {
                            searchTerms[index]

                              ? document.markdown
                                  .split("\n")
                                  .filter(
                                    line =>
                                      line
                                        .toLowerCase()
                                        .includes(
                                          searchTerms[
                                            index
                                          ]
                                            .toLowerCase()
                                        )
                                  )
                                  .join("\n")

                              : document.markdown
                          }

                        </ReactMarkdown>

                      </div>

                          </>
                        )
                      }

                    </div>

                  )
                )}

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
        currentFileName={
          currentFileName
        }
      />

    )}

      {showApiKeyModal && (

        <div className="summary-modal-overlay">

          <div className="summary-modal">

            <div className="summary-header">

              <h2>
                Groq API Key Required
              </h2>

              <button
                onClick={() =>
                  setShowApiKeyModal(false)
                }
              >
                ✕
              </button>

            </div>

            <div
              style={{
                padding: "20px"
              }}
            >

              <p>
                To use AI Summary,
                create a free Groq account,
                generate an API key,
                and paste it below.
              </p>

              <div className="api-key-content">

                <div className="api-key-info">

                  <h3>
                    Enable AI Features
                  </h3>

                  <p>
                    Altair uses Groq AI to generate:
                  </p>

                  <ul>
                    <li>⚡ Quick Summaries</li>
                    <li>📘 Detailed Analysis</li>
                    <li>🎓 Study Notes</li>
                    <li>💼 Interview Preparation</li>
                  </ul>

                </div>

                <div className="api-key-form">

                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) =>
                      setTempApiKey(
                        e.target.value
                      )
                    }
                    placeholder="Paste Groq API Key"
                    className="api-key-input"
                  />

                  <button
                    className="generate-summary-btn"
                    onClick={() => {

                      saveGroqApiKey(
                        tempApiKey
                      );

                      setShowApiKeyModal(
                        false
                      );

                      setShowSummaryModal(
                        true
                      );

                      setTimeout(() => {
                        handleGenerateSummary();
                      }, 100);

                    }}
                  >
                    Save & Continue
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      {showSummaryModal && (

        <div className="summary-modal-overlay">

          <div className="summary-modal">

            <div className="summary-header">

              <h2>
                AI Summary
              </h2>

              <button
                onClick={() =>
                  setShowSummaryModal(
                    false
                  )
                }
              >
                ✕
              </button>

            </div>

            <div className="summary-modes">

              <button
                className={
                  summaryMode === "short"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSummaryMode(
                    "short"
                  )
                }
              >
                Short Summary
              </button>

              <button
                className={
                  summaryMode === "detailed"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSummaryMode(
                    "detailed"
                  )
                }
              >
                Detailed
              </button>

              <button
                className={
                  summaryMode === "study"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSummaryMode(
                    "study"
                  )
                }
              >
                Study Notes
              </button>

              <button
                className={
                  summaryMode === "interview"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSummaryMode(
                    "interview"
                  )
                }
              >
                Interview Notes
              </button>

            </div>

            <button
              className="generate-summary-btn"
              onClick={
                handleGenerateSummary
              }
              disabled={
                summaryLoading
              }
            >
              {
                summaryLoading
                  ? "Generating..."
                  : "Generate Summary"
              }
            </button>

            {
              summaryResults[activeTab] && (

                <>

                  <div
                    className="summary-actions"
                  >

                    <button
                      onClick={
                        copySummary
                      }
                    >
                      Copy
                    </button>

                    <button
                      onClick={
                        downloadSummary
                      }
                    >
                      Download
                    </button>

                  </div>

                  <div className="summary-output">

                    <ReactMarkdown>
                      {summaryResults[activeTab]}
                    </ReactMarkdown>

                  </div>

                </>

              )
            }

          </div>

        </div>

      )
    }
    </>
  );
}

export default FileUpload;