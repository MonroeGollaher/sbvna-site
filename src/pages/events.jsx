import eventsPage from "../content/events/events.json";
import ScrollReveal from "../components/ScrollReveal";
import "./events.css";

export default function Events() {
  const { title, blurb, events } = eventsPage;

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div className="page-wrapper">
      <h2 className="animate-fade-up">{title}</h2>
      {blurb ? <p className="animate-fade-up delay-1">{blurb}</p> : null}

      <div className="grid grid--auto events-grid">
        {sortedEvents.map((event) => {
          const start = new Date(event.startTime);
          const end = event.endTime ? new Date(event.endTime) : null;

          return (
            <ScrollReveal as="article" key={event.id} className="card event-card">
              {event.image ? (
                <img
                  className="event-card__image"
                  src={event.image}
                  alt={event.imageAlt || event.title}
                  loading="lazy"
                />
              ) : null}

              <div className="event-card__body">
                <h3 className="card__title">{event.title}</h3>

                <p className="card__meta">
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
                  <p className="event__location">{event.location}</p>
                ) : null}

                {event.description ? (
                  <p className="event__description">{event.description}</p>
                ) : null}

                {event.ctaUrl ? (
                  <div className="card__actions">
                    <a
                      className="btn"
                      href={event.ctaUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {event.ctaText || "Learn more"}
                    </a>
                  </div>
                ) : null}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
