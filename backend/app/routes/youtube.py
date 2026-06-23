from fastapi import APIRouter

from pydantic import BaseModel

from app.services.youtube_transcriber import (
    transcribe_youtube
)

router = APIRouter()

class YoutubeRequest(
    BaseModel
):

    url: str

@router.post(
    "/youtube"
)
async def youtube_to_markdown(
    request: YoutubeRequest
):

    transcript = (
        transcribe_youtube(
            request.url
        )
    )

    markdown = f"""

# YouTube Transcript

Source:
{request.url}

---

{transcript}

"""

    return {

        "success": True,

        "documents": [

            {

                "name":
                    "youtube_transcript.md",

                "markdown":
                    markdown

            }

        ]

    }