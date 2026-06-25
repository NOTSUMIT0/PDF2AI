import sys
import os
import whisper


if getattr(sys, "frozen", False):

    BASE_DIR = os.path.join(
        sys._MEIPASS,
        "runtime"
    )

else:

    BASE_DIR = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../../runtime"
        )
    )


FFMPEG_DIR = os.path.join(
    BASE_DIR,
    "ffmpeg"
)

FFMPEG_EXE = os.path.join(
    FFMPEG_DIR,
    "ffmpeg.exe"
)

os.environ["PATH"] = (
    FFMPEG_DIR
    + ";"
    + os.environ.get(
        "PATH",
        ""
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "whisper",
    "base.pt"
)

print("FFmpeg executable:", FFMPEG_EXE)

print(
    "Loading Whisper:",
    MODEL_PATH
)

print(
    "Using FFmpeg:",
    FFMPEG_DIR
)

import shutil
import subprocess

print("FFmpeg exists:", os.path.exists(os.path.join(FFMPEG_DIR, "ffmpeg.exe")))
print("FFprobe exists:", os.path.exists(os.path.join(FFMPEG_DIR, "ffprobe.exe")))
print("PATH:", os.environ["PATH"])

print("Which ffmpeg:", shutil.which("ffmpeg"))

try:

    result = subprocess.run(
        ["ffmpeg", "-version"],
        capture_output=True,
        text=True
    )

    print("FFmpeg test OK")
    print(result.stdout.splitlines()[0])

except Exception as e:

    print("FFmpeg launch FAILED")
    print(e)

model = whisper.load_model(
    MODEL_PATH
)