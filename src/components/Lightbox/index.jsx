import useDialog from "../../utils/useDialog";
import "./styles.css";

export default function Lightbox({ src, alt, onClose }) {
  const dialogRef = useDialog(onClose);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Expanded image"}
      tabIndex={-1}
      className="lightbox"
      onClick={onClose}
    >
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      <img
        className="lightbox__image"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
