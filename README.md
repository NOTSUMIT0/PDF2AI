# PDF2AI

PDF2AI is a full-stack AI document conversion platform that transforms PDF files into clean, structured, AI-ready content using Microsoft's MarkItDown engine and OCR technology for scanned documents.

The platform is designed to prepare documents for Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) systems, vector databases, knowledge bases, AI agents, semantic search engines, and modern AI workflows.

---

## Overview

Modern AI systems perform best when working with structured and lightweight text formats rather than raw PDF files.

PDF2AI converts PDFs into AI-ready Markdown, TXT, and RAG-friendly JSON formats while preserving meaningful document structure and minimizing unnecessary formatting overhead.

The platform provides a complete workflow including:

* PDF Upload
* OCR Processing
* Document Analysis
* Markdown Generation
* RAG Export
* Analytics Dashboard
* Conversion History
* Desktop Application Support

---

## Why PDF2AI?

Large Language Models such as ChatGPT, Claude, Gemini, DeepSeek, Llama, and Mistral operate within limited context windows.

Direct PDF ingestion often introduces:

* Layout artifacts
* Formatting noise
* Unnecessary metadata
* Broken spacing
* Increased token consumption

This results in:

* Higher inference costs
* Reduced context efficiency
* Poor retrieval quality
* Lower response accuracy

PDF2AI solves this problem by generating structured, AI-friendly content optimized for modern AI systems.

---

## Key Features

### PDF Conversion

* PDF to Markdown conversion
* Powered by Microsoft MarkItDown
* FastAPI backend architecture
* Drag-and-drop upload support
* Large file handling
* Conversion progress tracking

### OCR Support

* OCRmyPDF integration
* Automatic scanned PDF detection
* Image-based PDF processing
* Text extraction from scanned documents
* OCR status reporting
* Seamless OCR workflow

### AI-Ready Output

* Clean Markdown generation
* Structured document formatting
* Preserved headings and sections
* AI workflow optimization
* Knowledge base preparation
* Semantic search preparation

### RAG-Ready JSON Export

Generate structured JSON exports suitable for:

* LangChain
* LlamaIndex
* ChromaDB
* Pinecone
* Weaviate
* Qdrant
* Vector Database Pipelines
* Knowledge Base Systems

Example:

```json
{
  "document_name": "document.pdf",
  "metadata": {
    "pages": 10,
    "token_estimate": 2500
  },
  "chunks": [
    {
      "id": 1,
      "tokens": 350,
      "content": "..."
    }
  ]
}
```

### Export Options

* Markdown (.md)
* Plain Text (.txt)
* JSON (.json)
* Clipboard Copy
* RAG-ready chunk export

### Document Analytics

* Total Characters
* Word Count
* Token Estimation
* Reading Time
* Average Words Per File
* Recent Document Tracking
* Conversion Statistics

### Recent Files Management

* Conversion history
* Search functionality
* Local storage persistence
* Quick file access
* Document preview support

### Desktop Application

* Electron Desktop Application
* Windows Installer
* Native Desktop Experience
* Offline Processing
* Local Backend Integration

### User Experience

* Modern Dashboard
* Dark Theme
* Light Theme
* Responsive Layout
* Toast Notifications
* Animated Processing Overlay
* OCR Progress Display
* Improved Export Center

### Privacy & Security

* Local document processing
* No cloud storage requirement
* User-controlled data
* Local conversion history
* Secure file handling

---

## Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Lucide React
* CSS

### Backend

* FastAPI
* Python
* Uvicorn

### Conversion Engine

* Microsoft MarkItDown

### OCR Engine

* OCRmyPDF
* Tesseract OCR

### Desktop Application

* Electron
* Electron Builder

### Storage

* Browser LocalStorage

---

## Application Workflow

1. Upload PDF document
2. Analyze PDF structure
3. Detect scanned or text-based PDF
4. Apply OCR if required
5. Convert using MarkItDown
6. Generate Markdown content
7. Analyze document statistics
8. Create AI-ready exports
9. Save conversion history
10. Export Markdown, TXT, or JSON

---

## Supported Formats

### Input

* PDF

### Output

* Markdown (.md)
* Text (.txt)
* JSON (.json)

---

## RAG Workflow

PDF2AI's JSON export is designed to simplify Retrieval-Augmented Generation workflows.

Typical pipeline:

PDF → PDF2AI → JSON Chunks → Embeddings → Vector Database → LLM

Supported systems include:

* ChromaDB
* Pinecone
* Weaviate
* Qdrant
* FAISS
* LangChain
* LlamaIndex

---

## Current Version

### Version 1.1.1

Included Features:

* PDF Conversion
* OCR Support
* Markdown Preview
* JSON Export
* RAG-Ready Chunk Export
* Recent Files Management
* Search Functionality
* Conversion Analytics
* Conversion Center
* Export Center
* Settings Page
* About Page
* Dark Theme
* Light Theme
* Electron Desktop Application
* Windows Installer
* Processing Overlay
* Document Analysis

---

## Roadmap

### Version 1.2

* Batch PDF Conversion
* ZIP Export Package
* AI Summaries
* Direct ChromaDB Export
* Direct Pinecone Export
* Knowledge Base Builder

### Future Releases

* Semantic Search
* Document Comparison
* Auto Updates
* Cloud Synchronization
* Team Workspaces
* Advanced AI Processing

---

## Installation

### Clone Repository

```bash
git clone https://github.com/NOTSUMIT0/PDF2AI.git

cd PDF2AI
```

### Backend

```bash
cd backend

python -m venv .venv

.\.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Desktop Application

```bash
cd frontend

npm install

npm run build

npm run dist-electron
```

Generated installer:

```text
frontend/release/PDF2AI Setup x.x.x.exe
```

---

## Author

Sumit Kumar

PDF2AI was built to simplify document preparation for AI systems, retrieval workflows, vector databases, and modern knowledge management pipelines.

---

## Acknowledgements

Special thanks to:

* Microsoft MarkItDown
* FastAPI
* OCRmyPDF
* Tesseract OCR
* Electron
* React

for powering the technologies behind PDF2AI.

---

## License

This project is licensed under the MIT License.
