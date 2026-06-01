# PDF2AI

PDF2AI is a full-stack document conversion platform that transforms PDF files into AI-ready Markdown using Microsoft's MarkItDown engine. The application is designed to help users prepare documents for Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) systems, knowledge bases, and AI-powered workflows.

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

## Benefits

### Reduced Token Consumption

Markdown is significantly lighter than raw document formats and helps maximize the available context window of AI models.

### Better AI Understanding

Structured headings, lists, tables, and sections improve comprehension and response quality.

### Improved Retrieval Accuracy

Clean Markdown enhances chunking, embedding generation, and semantic search performance in RAG systems.

### Faster AI Workflows

AI-ready content reduces preprocessing requirements and accelerates document ingestion pipelines.

### Developer Friendly

Export content as Markdown, TXT, or JSON for integration into custom AI applications and automation workflows.

## Overview

Modern AI systems perform best when working with structured and lightweight text formats. PDF2AI simplifies the conversion process by transforming PDF documents into clean Markdown while preserving document structure whenever possible.

The platform provides a complete workflow including document upload, conversion, analytics, search, export management, history tracking, and user preferences.

## Key Features

### Document Conversion

* PDF to Markdown conversion
* Powered by Microsoft MarkItDown
* Drag and drop file upload
* File validation and size checking
* Conversion status tracking

### AI-Ready Output

* Clean Markdown generation
* Optimized for LLM workflows
* Suitable for RAG pipelines
* Knowledge base preparation
* AI content processing

### Export Options

* Markdown (.md)
* Plain Text (.txt)
* JSON (.json)
* One-click clipboard copy

### File Management

* Recent file history
* Search through converted documents
* Open and review converted content
* Local document storage
* File deletion and management

### Analytics

* Document statistics
* Word count
* Character count
* Estimated token count
* Reading time estimation
* Conversion insights

### User Experience

* Responsive interface
* Dark and Light themes
* Toast notifications
* Persistent settings
* Modern dashboard design

### Privacy & Security

* Local storage for conversion history
* No cloud storage by default
* User-controlled data management
* Secure document processing

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
* Uvicorn
* Python

### Conversion Engine

* Microsoft MarkItDown

### Storage

* Browser LocalStorage

## Project Structure

```text
PDF2AI/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── tests/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│
├── docs/
├── designs/
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/pdf2ai.git

cd pdf2ai
```

## Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv .venv
```

Activate virtual environment:

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend API:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Application Workflow

1. Upload a PDF document.
2. Validate file type and size.
3. Send document to FastAPI backend.
4. Convert PDF using Microsoft MarkItDown.
5. Generate structured Markdown.
6. Display conversion results.
7. Analyze document content.
8. Export in desired format.
9. Store conversion history locally.

## Supported Formats

### Input

* PDF

### Output

* Markdown (.md)
* Text (.txt)
* JSON (.json)

## Current Version

Version: 1.0.0

### Included

* PDF conversion
* Markdown preview
* Export system
* Recent files
* Search
* Analytics
* Settings
* Theme support
* About page
* Conversion center

## Roadmap

### Version 1.1

* OCR support
* Batch conversion
* ZIP exports
* AI summaries
* Custom confirmation dialogs
* Enhanced analytics

### Future Releases

* Vector database export
* Knowledge base builder
* Document comparison
* Advanced search
* Cloud synchronization

## Acknowledgements

This project uses Microsoft's MarkItDown library for document conversion and processing.

MarkItDown is designed to transform documents into Markdown suitable for AI and LLM workflows.

## Author

Sumit Kumar

PDF2AI was developed to simplify document preparation for AI systems, modern knowledge workflows, and retrieval-based applications.

## License

This project is licensed under the MIT License.
