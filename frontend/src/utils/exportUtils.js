export const downloadFile = (
  content,
  filename,
  type
) => {

  const blob = new Blob( [content], { type } ); 

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    filename;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(
    url
  );

};

export const estimateTokens = (
  text
) => {

  return Math.ceil(
    text.length / 4
  );

};

export const createChunks = (
  markdown,
  documentName,
  chunkSize = 1500
) => {

  const chunks = [];

  let index = 0;

  for (
    let i = 0;
    i < markdown.length;
    i += chunkSize
  ) {

    const content =
      markdown.slice(
        i,
        i + chunkSize
      );

    chunks.push({

      chunk_id:
        ++index,

      content,

      tokens:
        estimateTokens(
          content
        ),

      characters:
        content.length,

      metadata: {

        source:
          documentName,

        chunk_number:
          index,

        generated_by:
          "PDF2AI"

      }

    });

  }

  return chunks;

};

export const exportJsonFile = (
  file
) => {

  const jsonData = {

    document_name:
      file.name,

    metadata: {

      size_mb:
        (
          file.size /
          1024 /
          1024
        ).toFixed(2),

      pages:
        file.analysis?.pages || 0,

      images:
        file.analysis?.images || 0,

      token_estimate:
        estimateTokens(
          file.markdown
        ),  

      scanned:
        file.analysis?.scanned || false,

      ocr_required:
        file.analysis?.ocr_required || false,

      generated_by:
        "PDF2AI",

      exported_at:
        new Date()
          .toISOString()

    },

    rag_export: {

      compatible_with: [

        "LangChain",

        "LlamaIndex",

        "ChromaDB",

        "FAISS",

        "Qdrant",

        "Pinecone"

      ],

      chunk_strategy:
        "fixed_length",

      embedding_model:
        null

    },

    chunks:
      createChunks(
        file.markdown,
        file.name
      )

  };

  downloadFile(

    JSON.stringify(
      jsonData,
      null,
      2
    ),

    file.name.replace(
      ".pdf",
      ".json"
    ),

    "application/json"

  );

};
