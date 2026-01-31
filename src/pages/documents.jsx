import { useMemo, useState } from "react";

const docModules = import.meta.glob("../content/documents/*.json", {
  eager: true
});

export default function Documents() {
  const docs = Object.values(docModules).map((m) => m.default || m);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(docs.map((d) => d.category).filter(Boolean))
    );
    return ["All", ...unique];
  }, [docs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return docs.filter((d) => {
      const matchesCat = category === "All" || d.category === category;
      const matchesQ =
        !q ||
        (d.title || "").toLowerCase().includes(q) ||
        (d.description || "").toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [docs, query, category]);

  return (
    <div>
      <h2>Documents</h2>

      <div
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ddd",
            minWidth: 220
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
        }}
      >
        {filtered.map((d) => (
          <div
            key={d.title}
            style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}
          >
            <h3 style={{ marginTop: 0 }}>{d.title}</h3>
            <p style={{ marginTop: 0, color: "#666" }}>
              Category: {d.category}
            </p>
            {d.description ? <p>{d.description}</p> : null}

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {d.file ? (
                <a
                  href={d.file}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #ddd",
                    borderRadius: 8
                  }}
                >
                  Open file
                </a>
              ) : null}
              {d.externalUrl ? (
                <a
                  href={d.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #ddd",
                    borderRadius: 8
                  }}
                >
                  External link
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
