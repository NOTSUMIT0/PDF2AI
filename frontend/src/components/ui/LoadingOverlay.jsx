import { useTheme } from "../../contexts/ThemeContext";
import logo from "../../assets/logo.png";


import "../../styles/loading-overlay.css";

function LoadingOverlay({
  title,
  message,
  analysis,
  progress,
  currentFileName,
}) {

  const { theme } =
    useTheme();

  return (

    <div
      className={`loading-overlay ${theme}`}
    >

      <div
        className={`loading-card ${theme}`}
      >

        <img
          src={logo}
          alt="Altair"
          className="loading-logo"
        />

        <h1>
          Altair
        </h1>

        <p className="loading-subtitle">
          AI Document Conversion Platform
        </p>

        {
          currentFileName && (

            <div className="current-file-display">

              {
                analysis?.pages === "YouTube"
                  ? "YouTube URL"
                  : currentFileName
              }

            </div>

          )
        }

        <h2>
          {title}
        </h2>

        <p
          className="overlay-status-message"
        >
          {message}
        </p>

        <div className="loading-message">
          {
            analysis && (

              <div
                className="analysis-info"
              >

                {
                  analysis.pages === "Audio"

                    ? (

                      <>

                        <div>
                          Audio File
                        </div>

                        <div>
                          Engine: Whisper
                        </div>

                        <div>
                          Language: Auto Detect
                        </div>

                        <div>
                          ⏱ Estimated Time:
                          {" "}
                          {analysis.estimated_time}
                        </div>

                      </>

                    )

                    : analysis.pages === "Video"

                      ? (

                        <>

                          <div>
                            Video File
                          </div>

                          <div>
                            Engine: Whisper
                          </div>

                          <div>
                            Audio Extraction:
                            {" "}
                            FFmpeg
                          </div>

                          <div>
                            ⏱ Estimated Time:
                            {" "}
                            {analysis.estimated_time}
                          </div>

                        </>

                      )

                      : analysis.pages === "YouTube"

                        ? (

                          <>

                            <div>
                              YouTube Video
                            </div>

                            <div>
                              Source:
                              {" "}
                              YouTube
                            </div>

                            <div>
                              Engine:
                              {" "}
                              Whisper
                            </div>

                            <div>
                              ⏱ Estimated Time:
                              {" "}
                              {analysis.estimated_time}
                            </div>

                          </>

                        )

                      : (

                        <>

                          <div>
                            Pages:
                            {" "}
                            {analysis.pages}
                          </div>

                          <div>
                            Images:
                            {" "}
                            {analysis.images}
                          </div>

                          <div>
                            OCR:
                            {" "}
                            {
                              analysis.ocr_required
                                ? "Required"
                                : "Not Required"
                            }
                          </div>

                          <div>
                            ⏱ Estimated Time:
                            {" "}
                            {analysis.estimated_time}
                          </div>

                        </>

                      )
                }

              </div>

            )
          }

        </div>

        <div className="loading-progress">

          <div
            className="loading-progress-bar"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

        <p className="loading-percent">
          {progress}%
        </p>

      </div>

    </div>

  );

}

export default LoadingOverlay;