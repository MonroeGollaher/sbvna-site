const galleryModules = import.meta.glob("../content/gallery/*.json", {
  eager: true
});

export default function Gallery() {
  const items = Object.values(galleryModules).map((m) => m.default || m);

  return (
    <div className="page-wrapper">
      <h2>Photo Gallery</h2>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
        }}
      >
        {items.map((it) => (
          <div
            key={it.title}
            style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}
          >
            <h3 style={{ marginTop: 0 }}>{it.title}</h3>
            {it.image ? (
              <img
                src={it.image}
                alt={it.title}
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 10
                }}
              />
            ) : null}
            {it.caption ? <p style={{ color: "#666" }}>{it.caption}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
