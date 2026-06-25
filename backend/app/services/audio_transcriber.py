import os
import traceback

from app.services.whisper_model import model


def transcribe_audio(audio_path):

    try:

        print("START AUDIO")
        print(audio_path)

        result = model.transcribe(
            audio_path,
            fp16=False
        )

        print("END AUDIO")

    except Exception:

        traceback.print_exc()

        raise

    markdown = f"""
# Audio Transcript

**File:** {os.path.basename(audio_path)}

---

{result["text"]}
"""

    return markdown