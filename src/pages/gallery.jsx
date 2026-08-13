import ScrollReveal from "../components/ScrollReveal";
import usePageMeta from "../utils/usePageMeta";
import "../styles/gallery.css";

const galleryModules = import.meta.glob("../content/gallery/*.json", {
  eager: true
});

const items = Object.values(galleryModules).map((m) => m.default || m);

export default function Gallery() {
  usePageMeta({
    title: "Photo Gallery",
    description:
      "Photos of landmarks, parks, and neighborhood life in South Boise Village."
  });

  return (
    <div className="page-wrapper">
      <h1 className="animate-fade-up">Photo Gallery</h1>
      <div className="grid grid--auto gallery-grid">
        {items.map((item) => (
          <ScrollReveal key={item.title} className="card gallery-card">
            {item.image ? (
              <img
                className="gallery-card__image"
                src={item.image}
                alt={item.imageAlt || item.title}
                loading="lazy"
              />
            ) : null}
            <h3 className="card__title">{item.title}</h3>
            {item.caption ? <p className="card__meta">{item.caption}</p> : null}
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
