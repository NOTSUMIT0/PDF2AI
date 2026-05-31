export const getSaveHistory =
  () => {

    const value =
      localStorage.getItem(
        "pdf2ai_save_history"
      );

    return value !== "false";
};

export const setSaveHistory =
  (enabled) => {

    localStorage.setItem(
      "pdf2ai_save_history",
      enabled
    );

};