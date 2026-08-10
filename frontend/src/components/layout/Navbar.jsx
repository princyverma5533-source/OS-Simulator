import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme";

function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <button className="navbar__menu-button" type="button" onClick={onMenuClick} aria-label="Toggle sidebar">
          <span />
          <span />
          <span />
        </button>

        <Link className="navbar__logo" to="/" aria-label="OS Simulator home">OS</Link>

        <div>
          <p className="navbar__eyebrow">Operating System Simulator</p>
          <h1>OS Simulator</h1>
        </div>
      </div>

      <div className="navbar__actions">
        <Link className="navbar__link" to="/">Home</Link>
        <Link className="navbar__link" to="/about">About</Link>
        <Link className="navbar__link" to="/help">Help</Link>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? "◐ Dark" : "☀ Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
