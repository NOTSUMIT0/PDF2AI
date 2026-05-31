export const getTheme = () => {
  return (
    localStorage.getItem(
      "pdf2ai_theme"
    ) || "dark"
  );
};

export const setTheme = (
  theme
) => {
  localStorage.setItem(
    "pdf2ai_theme",
    theme
  );
};