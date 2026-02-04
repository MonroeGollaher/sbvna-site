import eventsPage from "../content/events/events.json";

export default function Events() {
  const { title, blurb, events } = eventsPage;

  // Sort upcoming first (optional but useful)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div className="page-wrapper">
      <h2>{title}</h2>
      {blurb ? <p>{blurb}</p> : null}

      <div style={{ marginTop: 24 }}>
        {sortedEvents.map((event) => {
          const start = new Date(event.startTime);
          const end = event.endTime ? new Date(event.endTime) : null;

          return (
            <article
              key={event.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                background: "#fff"
              }}
            >
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.imageAlt || event.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    maxHeight: 260,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 12
                  }}
                />
              ) : null}

              <h3 style={{ marginTop: 0 }}>{event.title}</h3>

              <p style={{ margin: "4px 0", color: "#666" }}>
                {start.toLocaleDateString()}{" "}
                {start.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit"
                })}
                {end
                  ? ` – ${end.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit"
                    })}`
                  : null}
              </p>

              {event.location ? (
                <p style={{ margin: "4px 0", fontStyle: "italic" }}>
                  {event.location}
                </p>
              ) : null}

              {event.description ? (
                <p style={{ whiteSpace: "pre-wrap" }}>{event.description}</p>
              ) : null}

              {event.ctaUrl ? (
                <a
                  href={event.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    padding: "6px 10px",
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    textDecoration: "none"
                  }}
                >
                  {event.ctaText || "Learn more"}
                </a>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
