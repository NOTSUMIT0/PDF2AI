export const saveRecentFile = (fileData) => {
  const existing =
    JSON.parse(
      localStorage.getItem("recentFiles")
    ) || [];

  const updated = [
    fileData,
    ...existing,
  ];

  localStorage.setItem(
    "recentFiles",
    JSON.stringify(updated.slice(0, 50))
  );
};

export const getRecentFiles = () => {
  return (
    JSON.parse(
      localStorage.getItem("recentFiles")
    ) || []
  );
};