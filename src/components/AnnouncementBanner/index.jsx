import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const STORAGE_KEY = "sbvna-banner-dismissed";

export default function AnnouncementBanner({ banner }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!banner?.enabled) return;

    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed === banner.message) return;

    // Small delay so it fades in after the page renders
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, [banner]);

  if (!banner?.enabled || !visible) return null;

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, banner.message);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") dismiss();
  }

  return (
    <div
      className="announcement-banner"
      role="status"
      aria-live="polite"
      onKeyDown={handleKeyDown}
    >
      <div className="announcement-banner__inner">
        <p className="announcement-banner__message">
          {banner.message}
          {banner.linkText && banner.linkUrl ? (
            <>
              {" "}
              <Link to={banner.linkUrl} className="announcement-banner__link">
                {banner.linkText}
              </Link>
            </>
          ) : null}
        </p>
        <button
          className="announcement-banner__close"
          onClick={dismiss}
          aria-label="Dismiss announcement"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
