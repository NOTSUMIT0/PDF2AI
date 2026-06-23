import axios from "axios";

export const generateSummary = async (
  markdown,
  mode,
  apiKey
) => {

  const response =
    await axios.post(
      "http://127.0.0.1:8000/summarize",
      {
        markdown,
        mode,
        api_key: apiKey
      }
    );

  return response.data;
};