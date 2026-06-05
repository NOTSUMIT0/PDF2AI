# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.utils.hooks import (
    collect_data_files,
    collect_submodules
)

magika_datas = collect_data_files(
    "magika"
)

ocrmypdf_datas = collect_data_files(
    "ocrmypdf"
)

magika_hidden = collect_submodules(
    "magika"
)

ocrmypdf_hidden = collect_submodules(
    "ocrmypdf"
)

a = Analysis(
    ['run_backend.py'],
    pathex=[],
    binaries=[],

    datas=
        magika_datas +
        ocrmypdf_datas,

    hiddenimports=
        magika_hidden +
        ocrmypdf_hidden,

    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(
    a.pure
)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='run_backend',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)