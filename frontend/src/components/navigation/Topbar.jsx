import { Moon, Sun }
from "lucide-react";

import {
  useTheme,
} from "../../contexts/ThemeContext";

function Topbar() {

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (

    <header className="topbar">

      <div className="topbar-left">

        <h2>
          Altair
        </h2>

        <span>
          AI Document Conversion Platform
        </span>

      </div>

      <div className="topbar-right">

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >

          {theme === "dark"
            ? <Sun size={18} />
            : <Moon size={18} />
          }

          <span>

            {theme === "dark"
              ? "Light Mode"
              : "Dark Mode"
            }

          </span>

        </button>

      </div>

    </header>

  );
}

export default Topbar;