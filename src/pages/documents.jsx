import { useMemo, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import "../styles/documents.css";

const docModules = import.meta.glob("../content/documents/*.json", {
  eager: true
});

const SECTION_ORDER = [
  "Association Articles & Bylaws",
  "Newsletters",
  "Annual Reports",
  "Transportation Surveys",
  "Meeting Minutes",
  "Misc"
];

export default function Documents() {
  const docs = Object.values(docModules).map((m) => m.default || m);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(docs.map((d) => d.category).filter(Boolean))
    );
    const ordered = SECTION_ORDER.filter((c) => unique.includes(c));
    return ["All", ...ordered];
  }, [docs]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = docs.filter((d) => {
      const matchesCat = category === "All" || d.category === category;
      const matchesQ =
        !q ||
        (d.title || "").toLowerCase().includes(q) ||
        (d.description || "").toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });

    const groups = {};
    for (const d of filtered) {
      const cat = d.category || "Misc";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(d);
    }

    return SECTION_ORDER.filter(
      (cat) => groups[cat] && groups[cat].length > 0
    ).map((cat) => ({ category: cat, docs: groups[cat] }));
  }, [docs, query, category]);

  return (
    <div className="page-wrapper">
      <h2 className="animate-fade-up">Documents</h2>

      <div className="filter-bar animate-fade-up delay-1">
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          style={{ minWidth: 220 }}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {grouped.map(({ category: cat, docs: catDocs }) => (
        <ScrollReveal key={cat} className="docs-section">
          <h3 className="docs-section__title">{cat}</h3>
          <div className="grid grid--auto">
            {catDocs.map((d) => (
              <div key={d.title} className="card doc-card">
                {d.image ? (
                  <img
                    className="doc-card__image"
                    src={d.image}
                    alt={d.title}
                    loading="lazy"
                  />
                ) : null}
                <div className="doc-card__body">
                  <h4 className="card__title">{d.title}</h4>
                  <p className="doc-card__badge-row">
                    <span className="badge">{d.category}</span>
                  </p>
                  {d.description ? (
                    <p className="card__meta">{d.description}</p>
                  ) : null}
                  <div className="card__actions">
                    {d.file ? (
                      <a
                        className="btn"
                        href={d.file}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open file
                      </a>
                    ) : null}
                    {d.externalUrl ? (
                      <a
                        className="btn"
                        href={d.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        External link
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
