import { useMemo, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import usePageMeta from "../utils/usePageMeta";
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

const docs = Object.values(docModules).map((m) => m.default || m);

function orderCategories(present) {
  const known = SECTION_ORDER.filter((c) => present.includes(c));
  const unknown = present
    .filter((c) => !SECTION_ORDER.includes(c))
    .sort((a, b) => a.localeCompare(b));
  return [...known, ...unknown];
}

function DocumentPreview({ document }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasPreview = document.image && !document.image.includes("placehold.co/") && !imageFailed;

  if (hasPreview) {
    return (
      <img
        className="doc-card__image"
        src={document.image}
        alt={document.title}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className="doc-card__preview" aria-hidden="true">
      <svg viewBox="0 0 48 56" fill="none" focusable="false">
        <path d="M9 3h20l10 10v40H9Z" fill="var(--color-bg-raised)" />
        <path d="M29 3v10h10M9 3h20l10 10v40H9ZM16 25h16M16 33h16M16 41h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{document.title.replace(/^SBVNA /, "")}</span>
    </div>
  );
}

export default function Documents() {
  usePageMeta({
    title: "Documents",
    description:
      "Bylaws, articles of association, newsletters, annual reports, and meeting minutes for the South Boise Village Neighborhood Association."
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(docs.map((d) => d.category).filter(Boolean))
    );
    return ["All", ...orderCategories(unique)];
  }, []);

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

    return orderCategories(Object.keys(groups)).map((cat) => ({
      category: cat,
      docs: groups[cat]
    }));
  }, [query, category]);

  return (
    <div className="page-wrapper">
      <h1 className="animate-fade-up">Documents</h1>

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
              <div key={d.title} className="card doc-card" data-category={d.category}>
                <DocumentPreview document={d} />
                <div className="doc-card__body">
                  <h4 className="card__title">{d.title}</h4>
                  <p className="doc-card__badge-row">
                    <span className="badge" data-category={d.category}>{d.category}</span>
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
