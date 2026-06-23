import tempfile
import os
import yt_dlp

from app.services.audio_transcriber import (
    transcribe_audio
)

def transcribe_youtube(
    url
):

    temp_dir = tempfile.mkdtemp()

    output_template = os.path.join(
        temp_dir,
        "%(title)s.%(ext)s"
    )

    ydl_opts = {

        "format":
            "bestaudio/best",

        "outtmpl":
            output_template,

        "quiet":
            True,

        "noplaylist":
            True,

    }

    with yt_dlp.YoutubeDL(
        ydl_opts
    ) as ydl:

        info = ydl.extract_info(
            url,
            download=True
        )

        downloaded_file = ydl.prepare_filename(
            info
        )

    transcript = transcribe_audio(
        downloaded_file
    )

    markdown = f"""

# YouTube Transcript

**Title:** {info['title']}

**Channel:** {info['uploader']}

**URL:** {url}

---

{transcript}

"""

    return markdown