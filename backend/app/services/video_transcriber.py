import os
import traceback

from app.services.whisper_model import model


def transcribe_video(video_path):

    try:

        print("START VIDEO")
        print(video_path)

        result = model.transcribe(
            video_path,
            fp16=False
        )

        print("END VIDEO")

    except Exception:

        traceback.print_exc()

        raise

    transcript = result["text"]

    markdown = f"""
# Video Transcript

**File:** {os.path.basename(video_path)}

---

{transcript}
"""

    return markdown