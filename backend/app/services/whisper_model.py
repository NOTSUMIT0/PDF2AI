import sys
import whisper
import os

if getattr(sys, "frozen", False):

    BASE_DIR = sys._MEIPASS

else:

    BASE_DIR = os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    )

MODEL_PATH = os.path.join(
    BASE_DIR,
    "runtime",
    "whisper",
    "base.pt"
)

print(
    f"Loading Whisper Model: {MODEL_PATH}"
)

model = whisper.load_model(
    MODEL_PATH
)