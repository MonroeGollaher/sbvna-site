import "./styles.css";

export function Polaroid({ src, alt = "", caption }) {
  return (
    <div className="polaroid">
      <img className="polaroid__image" src={src} alt={alt} loading="lazy" />
      {caption ? <p className="polaroid__caption">{caption}</p> : null}
    </div>
  );
}

export function PolaroidGrid({ children }) {
  return <div className="polaroids">{children}</div>;
}
