export const getGroqApiKey = () => {
  return localStorage.getItem("groq_api_key") || "";
};

export const saveGroqApiKey = (key) => {
  localStorage.setItem(
    "groq_api_key",
    key
  );
};

export const removeGroqApiKey = () => {
  localStorage.removeItem(
    "groq_api_key"
  );
};