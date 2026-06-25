import tempfile
import os
import yt_dlp
import shutil

from app.services.audio_transcriber import (
    transcribe_audio
)

import sys

if getattr(sys, "frozen", False):

    FFMPEG_DIR = os.path.join(
        sys._MEIPASS,
        "runtime",
        "ffmpeg"
    )

else:

    FFMPEG_DIR = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../../runtime/ffmpeg"
        )
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

        "format": "bestaudio/best",

        "outtmpl": output_template,
        
        "ffmpeg_location": FFMPEG_DIR,

        "quiet": True,

        "noplaylist": True,

        "nocheckcertificate": True,

        "geo_bypass": True,

        "extractor_args": {

            "youtube": {

                "player_client": [

                    "android",

                    "ios",

                    "web"

                ]

            }

        },

        "http_headers": {

            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36"

        }

    }

    try:

        with yt_dlp.YoutubeDL(
            ydl_opts
        ) as ydl:

            info = ydl.extract_info(
                url,
                download=True
            )

            downloaded_file = None

            for file in os.listdir(temp_dir):

                full_path = os.path.join(
                    temp_dir,
                    file
                )

                if os.path.isfile(full_path):

                    if not file.endswith(
                        ".json"
                    ):

                        downloaded_file = full_path
                        break

            if not downloaded_file:

                raise Exception(
                    "Downloaded audio file not found."
                )

    except Exception as e:

        raise Exception(
            f"YouTube download failed: {str(e)}"
        )

    try:

        transcript = transcribe_audio(
            downloaded_file
        )

    except Exception as e:

        raise Exception(
            f"YouTube transcription failed: {str(e)}"
        )

    finally:

        try:
            os.remove(downloaded_file)
        except:
            pass

        try:
            shutil.rmtree(temp_dir)
        except:
            pass

    markdown = f"""

    # YouTube Transcript

    - Title: {info.get('title', 'Unknown')}

    - Channel: {info.get('uploader', 'Unknown')}

    - URL: {url}

    ---

    {transcript}

    """

    return markdown