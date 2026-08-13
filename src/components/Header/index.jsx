import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import "./styles.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About", mobileLabel: "About South Boise Village" },
  { to: "/board", label: "Meet the Board", mobileLabel: "Board" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/documents", label: "Documents" },
  { to: "/resources", label: "Resources" }
];

function linkClass({ isActive }) {
  return isActive ? "nav-link nav-link--active" : "nav-link";
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on route change by adjusting state during render,
  // rather than in an effect (avoids a cascading second render).
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setIsOpen(false);
  }

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="brand" aria-label="South Boise Village Home">
          <span className="brand__title">South Boise Village</span>
          <span className="brand__subtitle">Neighborhood Association</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="nav nav--desktop" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass} end={to === "/"}>
              {label}
            </NavLink>
          ))}

          <a className="nav-link nav-link--button" href="/admin/">
            Admin
          </a>

          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="header__mobile-controls">
          <ThemeToggle />
          <button
            type="button"
            className={isOpen ? "menu-button menu-button--open" : "menu-button"}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="menu-button__bar" />
            <span className="menu-button__bar" />
            <span className="menu-button__bar" />
          </button>
        </div>
      </div>

      {/* Mobile menu — inert while collapsed so links stay out of the tab order */}
      <div
        id="mobile-menu"
        className={isOpen ? "mobile-menu mobile-menu--open" : "mobile-menu"}
        inert={!isOpen}
      >
        <nav className="nav nav--mobile" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ to, label, mobileLabel }) => (
            <NavLink key={to} to={to} className={linkClass} end={to === "/"}>
              {mobileLabel || label}
            </NavLink>
          ))}

          <a className="nav-link nav-link--button" href="/admin/">
            Admin
          </a>
        </nav>
      </div>

      {/* Optional overlay (click to close) */}
      {isOpen ? (
        <button
          className="overlay"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
        />
      ) : null}
    </header>
  );
}
