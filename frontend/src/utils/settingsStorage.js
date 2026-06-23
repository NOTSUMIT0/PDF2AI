export const getSaveHistory =
  () => {

    const value =
      localStorage.getItem(
        "altair_save_history"
      );

    return value !== "false";
};

export const setSaveHistory =
  (enabled) => {

    localStorage.setItem(
      "altair_save_history",
      enabled
    );

};