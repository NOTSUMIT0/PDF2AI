import {
  createContext,
  useContext,
  useState,
} from "react";

const DocumentContext =
  createContext();

export function
DocumentProvider({
  children,
}) {
  const [
    selectedDocument,
    setSelectedDocument,
  ] = useState(null);

  return (
    <DocumentContext.Provider
      value={{
        selectedDocument,
        setSelectedDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export const useDocument = () => useContext(DocumentContext);