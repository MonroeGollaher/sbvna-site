import useDialog from "../../utils/useDialog";
import "./styles.css";

export default function Modal({
  onClose,
  children,
  className = "",
  label = "Dialog"
}) {
  const dialogRef = useDialog(onClose);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
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
