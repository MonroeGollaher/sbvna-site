import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link nav-link--active" : "nav-link";

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="brand" aria-label="South Boise Village Home">
          <span className="brand__title">South Boise Village</span>
          <span className="brand__subtitle">Neighborhood Association</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="nav nav--desktop" aria-label="Main navigation">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About South Boise Village
          </NavLink>
          <NavLink to="/board" className={linkClass}>
            Meet the Board
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/gallery" className={linkClass}>
            Gallery
          </NavLink>
          <NavLink to="/documents" className={linkClass}>
            Documents
          </NavLink>
          <NavLink to="/resources" className={linkClass}>
            Resources
          </NavLink>

          <a className="nav-link nav-link--button" href="/admin/">
            Admin
          </a>
        </nav>

        {/* Mobile button */}
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

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={isOpen ? "mobile-menu mobile-menu--open" : "mobile-menu"}
      >
        <nav className="nav nav--mobile" aria-label="Mobile navigation">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About South Boise Village
          </NavLink>
          <NavLink to="/board" className={linkClass}>
            Meet the Board
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/gallery" className={linkClass}>
            Gallery
          </NavLink>
          <NavLink to="/documents" className={linkClass}>
            Documents
          </NavLink>
          <NavLink to="/resources" className={linkClass}>
            Resources
          </NavLink>

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
