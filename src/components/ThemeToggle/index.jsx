import { useState, useEffect } from "react";
import "./styles.css";

function getInitialTheme() {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch { /* Use the default when browser storage is unavailable. */ }
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);

  const toggle = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="theme-toggle__icon">
        {theme === "light" ? "\u263E" : "\u2600"}
      </span>
    </button>
  );
}
