import tempfile
import os

from app.services.whisper_model import (
    model
)

def transcribe_video(
    video_path
):

    try:

        result = model.transcribe(
            video_path
        )

    except Exception as e:

        raise Exception(
            f"Video transcription failed: {str(e)}"
        )

    transcript = result["text"]

    markdown = f"""
# Video Transcript

**File:** {os.path.basename(video_path)}

---

{transcript}
"""

    return markdown