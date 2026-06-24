import sys
import whisper
import os

if getattr(sys, "frozen", False):

    BASE_DIR = os.path.join(
        sys._MEIPASS,
        "runtime"
    )

else:

    BASE_DIR = os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    )

MODEL_PATH = os.path.join(
    BASE_DIR,
    "whisper",
    "base.pt"
)

print(
    f"Loading Whisper Model: {MODEL_PATH}"
)

model = whisper.load_model(
    MODEL_PATH
)