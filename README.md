# Altair

Altair is an AI document, media, and knowledge conversion platform that transforms documents, images, audio, video, and YouTube content into clean, structured, AI-ready Markdown, text, and RAG-friendly formats.

Powered by Microsoft's MarkItDown engine, Whisper AI, OCR technology, and a modern Electron desktop application, Altair prepares information for Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI agents, vector databases, semantic search, and modern knowledge workflows.

---

## Problem Statement

Large Language Models such as ChatGPT, Claude, Gemini, and open-source LLMs operate within a limited context window. When PDF documents are directly processed, they often introduce unnecessary formatting, layout artifacts, spacing issues, and redundant metadata that consume valuable tokens.

This results in:

* Increased token usage
* Higher inference costs
* Reduced context efficiency
* Poor document retrieval quality
* Lower quality AI responses

Traditional PDFs are designed for human readability rather than machine understanding. AI systems perform significantly better when information is provided in a structured and lightweight format.

## Solution

PDF2AI addresses this challenge by converting PDF documents into clean Markdown using Microsoft's MarkItDown engine.

Instead of sending complex PDF structures directly to an AI model, users can transform documents into AI-ready content that is easier to process, search, index, embed, and analyze.

The generated Markdown preserves meaningful document structure while eliminating unnecessary formatting overhead, making it ideal for:

* Large Language Models (LLMs)
* RAG Pipelines
* Knowledge Bases
* Semantic Search Systems
* AI Agents
* Vector Databases
* Enterprise AI Applications

## Overview

Altair converts documents and multimedia content into structured AI-ready knowledge while preserving meaningful information and minimizing unnecessary formatting overhead.

The platform provides an end-to-end workflow including:

* Document Upload
* Image OCR
* Audio Transcription
* Video Transcription
* YouTube Transcription
* OCR Processing
* Automatic Document Analysis
* Markdown Generation
* TXT Export
* JSON Export
* AI Summaries
* Processing Analytics
* Token Estimation
* Desktop Application
* Local AI-ready Knowledge Export

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
* Dark / Light Themes
* Batch Processing
* Drag and Drop Upload
* Animated Processing Overlay
* OCR Progress
* File Analysis
* Search
* Recent Files
* Export Center
* Settings
* About Page

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
* OpenAI Whisper
* yt-dlp

### Conversion Engine

* Microsoft MarkItDown
* OCRmyPDF
* Tesseract OCR
* Ghostscript
* FFmpeg
* OpenAI Whisper

### OCR Engine

* OCRmyPDF
* Tesseract OCR

### Desktop Application

* Electron
* Electron Builder

### Storage

* Browser LocalStorage
* Local File Processing

---

## Application Workflow

1. Upload Document, Image, Audio, Video, or YouTube URL
2. Analyze File
3. Detect OCR Requirements
4. Detect Processing Pipeline
5. OCR (if required)
6. Speech Recognition (if required)
7. Markdown Generation
8. Document Analysis
9. Token Estimation
10. AI Summary Generation
11. Export Markdown, TXT, or JSON

---

## Supported Formats

### Documents

* PDF
* DOCX
* PPTX
* XLSX
* TXT
* Markdown
* HTML
* CSV

### Images

* PNG
* JPG
* JPEG
* BMP
* TIFF
* WEBP

### Media

* MP3
* WAV
* FLAC
* M4A
* AAC
* OGG
* MP4
* MOV
* AVI
* MKV

### Online Sources

* YouTube URLs

### Outputs

* Markdown (.md)
* Plain Text (.txt)
* JSON (.json)

---

### Image OCR

* OCR for Images
* Automatic Text Extraction
* Tesseract OCR Integration
* Multi-format Image Support
* AI-ready Markdown Output

---

### Media Transcription

* Audio Transcription
* Video Transcription
* Whisper AI
* Automatic Speech Recognition
* Timestamp-free Clean Markdown

---

### YouTube Processing

* YouTube URL Support
* Automatic Audio Extraction
* AI-ready Transcript Generation
* Local Processing

---

### AI Features

* AI Summaries
* Study Notes
* Interview Preparation
* Markdown Optimization
* Token-aware Processing

---

### Smart Analysis

Automatic file analysis before conversion including:

* Page Count
* Image Count
* OCR Detection
* Estimated Processing Time
* File Statistics

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

### Version 2.0.0

Included Features

* Document Conversion
* Image OCR
* Audio Transcription
* Video Transcription
* YouTube Transcription
* AI Summaries
* Markdown Export
* TXT Export
* JSON Export
* RAG Export
* Search
* Recent Files
* Processing Overlay
* OCR Progress
* Smart File Analysis
* Token Analytics
* Electron Desktop Application
* Windows Installer
* Offline Processing
* Settings
* About Page

---

## Roadmap

### Version 2.1

* Batch Folder Conversion
* ZIP Export
* Custom AI Prompts
* Local Embedding Generation
* ChromaDB Export
* Pinecone Export

### Future Releases

* Semantic Search
* Knowledge Graph
* Local RAG Chat
* Plugin System
* Auto Updates
* Cross-platform Support

---

## Installation

### Clone Repository

```bash
git clone https://github.com/NOTSUMIT0/Altair.git

cd Altair
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

* Electron Desktop Application
* Windows Installer
* Native Windows Integration
* Offline Processing
* Bundled OCR Runtime
* Bundled Whisper Runtime
* Bundled FFmpeg Runtime
* No External Dependencies Required

---

## Author

Sumit Kumar

Altair was built to simplify AI-ready knowledge preparation for Large Language Models, Retrieval-Augmented Generation (RAG), AI agents, vector databases, semantic search, research workflows, and modern knowledge management systems.

---

## Acknowledgements

Special thanks to:

* Microsoft MarkItDown
* FastAPI
* OCRmyPDF
* Tesseract OCR
* Electron
* React
* OpenAI Whisper
* FFmpeg
* yt-dlp
* Ghostscript

for powering the technologies behind Altair.

---

## License

This project is licensed under the MIT License.
