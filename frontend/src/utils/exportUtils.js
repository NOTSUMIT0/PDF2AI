export const downloadFile = (
  content,
  filename,
  type
) => {

  const blob =
    new Blob(
      [content],
      { type }
    );

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

export const createChunks = (
  markdown,
  chunkSize = 1000
) => {

  const chunks = [];

  let index = 0;

  for (
    let i = 0;
    i < markdown.length;
    i += chunkSize
  ) {

    chunks.push({

      id: ++index,

      content:
        markdown.slice(
          i,
          i + chunkSize
        )

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

    sections:
      createSections(
        file.markdown
      ),

    chunks:
      createChunks(
        file.markdown
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

export const createSections = (
  markdown
) => {

  const sections = [];

  const lines =
    markdown.split("\n");

  let currentTitle =
    "Introduction";

  let currentContent =
    [];

  lines.forEach(
    (line) => {

      const clean =
        line.trim();

      if (
        clean &&
        clean.length < 60 &&
        !clean.includes("|")
      ) {

        if (
          currentContent.length
        ) {

          sections.push({

            id:
              sections.length + 1,

            title:
              currentTitle,

            content:
              currentContent.join(
                "\n"
              )

          });

        }

        currentTitle =
          clean;

        currentContent =
          [];

      }
      else {

        currentContent.push(
          line
        );

      }

    }
  );

  if (
    currentContent.length
  ) {

    sections.push({

      id:
        sections.length + 1,

      title:
        currentTitle,

      content:
        currentContent.join(
          "\n"
        )

    });

  }

  return sections;

};