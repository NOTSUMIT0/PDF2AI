from fastapi import APIRouter
from pydantic import BaseModel

from groq import Groq

from dotenv import load_dotenv

import os

load_dotenv()

router = APIRouter()


class SummaryRequest(BaseModel):
    markdown: str
    mode: str
    api_key: str


def build_prompt(
    markdown,
    mode
):

    if mode == "short":

        return f"""
Create a concise summary.

Return:
- Key Points
- Important Takeaways

Document:

{markdown}
"""

    elif mode == "detailed":

        return f"""
Provide:

# Overview
# Key Topics
# Important Details
# Conclusion

Document:

{markdown}
"""

    elif mode == "study":

        return f"""
Create study notes.

Return:

# Chapter Summary

# Important Topics

# Key Definitions

# Exam Questions

# Quick Revision Notes

Document:

{markdown}
"""

    elif mode == "interview":

        return f"""
Create interview preparation notes.

Return:

# Skills

# Technologies

# Key Concepts

# Possible Interview Questions

# Expected Answers

Document:

{markdown}
"""

    return markdown


@router.post("/summarize")
async def summarize(
    request: SummaryRequest
):

    client = Groq(
      api_key=request.api_key
  )

    markdown = request.markdown

    if len(markdown) > 12000:

        markdown = markdown[:12000]

    prompt = build_prompt(
        markdown,
        request.mode
    )

    completion = (
        client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0.3,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
    )

    summary = (
        completion
        .choices[0]
        .message
        .content
    )

    return {
        "success": True,
        "summary": summary
    }