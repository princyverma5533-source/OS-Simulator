import { useEffect, useState } from "react";
import { ThemeContext } from "./theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("os-simulator-theme") || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("os-simulator-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === "light" ? "dark" : "light");

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
