from app.services.whisper_model import (
    model
)

def transcribe_audio(
    audio_path
):

    result = model.transcribe(
        audio_path
    )

    return result["text"]