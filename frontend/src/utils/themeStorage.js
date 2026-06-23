export const getTheme = () => {
  return (
    localStorage.getItem(
      "altair_theme"
    ) || "dark"
  );
};

export const setTheme = (
  theme
) => {
  localStorage.setItem(
    "altair_theme",
    theme
  );
};