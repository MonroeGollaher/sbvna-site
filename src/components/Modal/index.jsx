import { useEffect } from "react";
import "./styles.css";

export default function Modal({ onClose, children, className = "" }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" aria-label="Close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
