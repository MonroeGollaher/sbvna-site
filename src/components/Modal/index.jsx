import { createPortal } from "react-dom";
import useDialog from "../../utils/useDialog";
import "./styles.css";

export default function Modal({
  onClose,
  children,
  className = "",
  label = "Dialog",
  onKeyDown,
  bodyKey,
  footer
}) {
  const dialogRef = useDialog(onClose);

  // Keep the viewport overlay outside page spacing and stacking contexts.
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`modal ${className}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <button className="modal__close" aria-label="Close" onClick={onClose}>
          &times;
        </button>
        <div key={bodyKey} className="modal__body">{children}</div>
        {footer ? <div className="modal__footer">{footer}</div> : null}
      </div>
    </div>,
    document.body
  );
}
