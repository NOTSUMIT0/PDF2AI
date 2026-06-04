import { useTheme } from "../../contexts/ThemeContext";
import logo from "../../assets/logo.png";


import "../../styles/loading-overlay.css";

function LoadingOverlay({
  title,
  message,
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

        <p>
          {message}
        </p>

        <div className="loading-progress">

          <div className="loading-progress-bar" />

        </div>

      </div>

    </div>

  );

}

export default LoadingOverlay;