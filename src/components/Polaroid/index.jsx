import "./styles.css";

export function Polaroid({ src, alt = "", caption, onClick }) {
  const content = (
    <>
      <img className="polaroid__image" src={src} alt={alt} loading="lazy" />
      {caption ? <p className="polaroid__caption">{caption}</p> : null}
    </>
  );

  // Render a real button when it is interactive, so it is keyboard-reachable
  // and announced as a control rather than as plain content.
  if (onClick) {
    return (
      <button
        type="button"
        className="polaroid polaroid--clickable"
        onClick={onClick}
        aria-label={caption || alt || undefined}
      >
        {content}
      </button>
    );
  }

  return <div className="polaroid">{content}</div>;
}

export function PolaroidGrid({ children }) {
  return <div className="polaroids">{children}</div>;
}
