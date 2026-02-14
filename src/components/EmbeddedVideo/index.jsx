import "./styles.css";

function getEmbedUrl(src) {
  // YouTube: various URL formats
  const ytMatch = src.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  }

  // Vimeo: various URL formats
  const vimeoMatch = src.match(
    /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/
  );
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

function isDirectVideo(src) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

export default function EmbeddedVideo({ src, title = "Embedded video" }) {
  if (!src) return null;

  if (isDirectVideo(src)) {
    return (
      <div className="video">
        <video className="video__player" controls preload="metadata">
          <source src={src} />
        </video>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(src);

  if (embedUrl) {
    return (
      <div className="video">
        <iframe
          className="video__iframe"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Fallback: treat as direct iframe src
  return (
    <div className="video">
      <iframe
        className="video__iframe"
        src={src}
        title={title}
        allowFullScreen
      />
    </div>
  );
}
