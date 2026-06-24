# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.utils.hooks import (
    collect_data_files,
    collect_submodules
)

whisper_datas = collect_data_files(
    "whisper"
)

magika_datas = collect_data_files(
    "magika"
)

ocrmypdf_datas = collect_data_files(
    "ocrmypdf"
)

block_cipher = None

a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('app', 'app'),
        ('runtime', 'runtime'),
        ('.env', '.'),
    ]
    + whisper_datas
    + magika_datas
    + ocrmypdf_datas,

    hiddenimports=[
        *collect_submodules("ocrmypdf"),
        *collect_submodules("whisper"),
        *collect_submodules("markitdown"),
        *collect_submodules("magika"),

        "uvicorn",
        "fastapi",
        "pydantic",
        "yt_dlp",
        "pytesseract",
        "pdfplumber",
        "pandas",
        "openpyxl",
        "pptx",
        "python_docx",
        "ocrmypdf",
        "markitdown",
    ],

    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)

pyz = PYZ(
    a.pure
)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='run_backend',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='run_backend'
)