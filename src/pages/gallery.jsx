import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import Modal from "../components/Modal";
import usePageMeta from "../utils/usePageMeta";
import "../styles/gallery.css";

const galleryModules = import.meta.glob("../content/gallery/*.json", {
  eager: true
});

// Older single-image entries remain valid alongside event albums.
const items = Object.values(galleryModules).map((m) => {
  const item = m.default || m;
  const photos = item.photos?.length ? item.photos : item.image ? [item] : [];
  return { ...item, photos };
}).filter((item) => item.photos.length);

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC"
});

function formatUploadDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

function GalleryTitle({ title }) {
  return title.split(/(\d{4}\s*[-–]\s*\d{4})/g).map((part, index) =>
    /^\d{4}\s*[-–]\s*\d{4}$/.test(part)
      ? <span key={index} className="gallery-card__years">{part.replace(/\s*[-–]\s*/, "–")}</span>
      : part
  );
}

export default function Gallery() {
  usePageMeta({
    title: "Photo Gallery",
    description:
      "Photos of landmarks, parks, and neighborhood life in South Boise Village."
  });
  const [selected, setSelected] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = selected?.photos[photoIndex];

  function navigatePhoto(direction) {
    setPhotoIndex((index) => (index + direction + selected.photos.length) % selected.photos.length);
  }

  function handleKeyDown(event) {
    if (selected.photos.length < 2 || event.defaultPrevented ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
        event.target.closest("input, textarea, select, [contenteditable]")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      navigatePhoto(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <div className="page-wrapper">
      <h1 className="animate-fade-up">Photo Gallery</h1>
      <div className="grid grid--auto gallery-grid">
        {items.map((item) => (
          <ScrollReveal key={item.title} className="card gallery-card">
            <button
              className="gallery-card__open"
              aria-label={`Open ${item.title}, ${item.photos.length} photo${item.photos.length === 1 ? "" : "s"}`}
              onClick={() => { setPhotoIndex(0); setSelected(item); }}
            >
              <img
                className="gallery-card__image"
                src={item.image || item.photos[0].image}
                alt={item.imageAlt || item.photos[0].imageAlt || item.title}
                loading="lazy"
              />
              <div className="gallery-card__content">
                <h3 className="card__title"><GalleryTitle title={item.title} /></h3>
                <p className="card__meta">{item.photos.length} photo{item.photos.length === 1 ? "" : "s"}</p>
                {item.caption ? <p className="card__meta">{item.caption}</p> : null}
                {formatUploadDate(item.uploadDate) ? (
                  <time className="gallery-card__date" dateTime={item.uploadDate}>
                    Added {formatUploadDate(item.uploadDate)}
                  </time>
                ) : null}
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>
      {photo ? (
        <Modal
          className="gallery-modal"
          label={selected.title}
          onClose={() => setSelected(null)}
          onKeyDown={handleKeyDown}
          footer={selected.photos.length > 1 ? (
            <nav className="gallery-modal__nav" aria-label="Photo navigation">
              <button type="button" onClick={() => navigatePhoto(-1)} aria-label="Previous photo">← Previous</button>
              <span role="status" aria-live="polite" aria-atomic="true">{photoIndex + 1} of {selected.photos.length}</span>
              <button type="button" onClick={() => navigatePhoto(1)} aria-label="Next photo">Next →</button>
            </nav>
          ) : null}
        >
          <h2 className="gallery-modal__title">{selected.title}</h2>
          <figure className="gallery-modal__figure">
            <img
              className="gallery-modal__image"
              src={photo.fullImage || photo.image}
              alt={photo.imageAlt || selected.title}
            />
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        </Modal>
      ) : null}
    </div>
  );
}
