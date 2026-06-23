const STORAGE_KEY =
  "recentFiles";

export const saveRecentFile = (
  fileData
) => {

  const existing =
    JSON.parse(
      localStorage.getItem(
        STORAGE_KEY
      )
    ) || [];

  const updated = [
    fileData,
    ...existing,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      updated.slice(0, 50)
    )
  );

};

export const getRecentFiles =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        )
      ) || []
    );

};

export const deleteRecentFile =
  (id) => {

    const files =
      getRecentFiles();

    const updated =
      files.filter(
        (file) =>
          file.id !== id
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

};

export const clearRecentFiles =
  () => {

    localStorage.removeItem(
      STORAGE_KEY
    );

};