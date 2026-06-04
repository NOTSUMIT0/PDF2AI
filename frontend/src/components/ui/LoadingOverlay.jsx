import { useTheme } from "../../contexts/ThemeContext";
import logo from "../../assets/logo.png";


import "../../styles/loading-overlay.css";

function LoadingOverlay({
  title,
  message,
  analysis,
  progress,
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
          alt="PDF2AI"
          className="loading-logo"
        />

        <h1>
          PDF2AI
        </h1>

        <p className="loading-subtitle">
          AI Document Conversion Platform
        </p>

        <h2>
          {title}
        </h2>

        <div className="loading-message">
          {
            analysis && (

              <div className="analysis-info">

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
                  {
                    analysis.estimated_time
                  }
                </div>

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