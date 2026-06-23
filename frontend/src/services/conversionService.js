import axios from "axios";

const API_URL = "http://localhost:8000";

export const convertDocument = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/convert`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const analyzeDocument =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await axios.post(
        `${API_URL}/analyze`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};

export const convertYoutube =
  async (url) => {

    const response =
      await axios.post(

        `${API_URL}/youtube`,

        {
          url
        }

      );

    return response.data;

};