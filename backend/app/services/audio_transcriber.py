import os

from app.services.whisper_model import (
    model
)

def transcribe_audio(
    audio_path
):

    try:

        result = model.transcribe(
            audio_path,
            fp16=False
        )

    except Exception as e:

        raise Exception(
            f"Audio transcription failed: {str(e)}"
        )

    markdown = f"""
    # Audio Transcript

    **File:** {os.path.basename(audio_path)}

    ---

    {result["text"]}
    """

    return markdown