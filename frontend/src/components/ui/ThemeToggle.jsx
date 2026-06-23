import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "../../contexts/ThemeContext";

function ThemeToggle() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {theme === "light"
        ? <Moon size={18} />
        : <Sun size={18} />}
    </button>
  );
}

export default ThemeToggle;