import { useState, useEffect } from "react";
import { enableDarkMode, disableDarkMode } from "./themeUtils";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setIsDark(saved);
    if (saved) enableDarkMode();
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
    setIsDark(!isDark);
  };

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className="slider" />
      </label>
    </div>
  );
}
