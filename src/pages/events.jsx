import { useState, useMemo } from "react";
import eventsPage from "../content/events/events.json";
import ScrollReveal from "../components/ScrollReveal";
import "../styles/events.css";

export default function Events() {
  const { title, blurb, events } = eventsPage;
  const [tab, setTab] = useState("upcoming");

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const up = [];
    const pa = [];

    for (const event of events) {
      const eventEnd = event.endTime
        ? new Date(event.endTime)
        : new Date(event.startTime);
      if (eventEnd < now) {
        if (eventEnd >= oneYearAgo) {
          pa.push(event);
        }
      } else {
        up.push(event);
      }
    }

    // Upcoming: soonest first
    up.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    // Past: most recent first
    pa.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    return { upcoming: up, past: pa };
  }, [events]);

  const displayed = tab === "upcoming" ? upcoming : past;

  return (
    <div className="page-wrapper">
      <h2 className="animate-fade-up">{title}</h2>
      {blurb ? <p className="animate-fade-up delay-1">{blurb}</p> : null}

      <div className="events-tabs">
        <button
          className={`events-tab${tab === "upcoming" ? " events-tab--active" : ""}`}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
          {upcoming.length > 0 ? (
            <span className="events-tab__count">{upcoming.length}</span>
          ) : null}
        </button>
        <button
          className={`events-tab${tab === "past" ? " events-tab--active" : ""}`}
          onClick={() => setTab("past")}
        >
          Past
          {past.length > 0 ? (
            <span className="events-tab__count">{past.length}</span>
          ) : null}
        </button>
      </div>

      {displayed.length === 0 ? (
        <p className="events-empty">
          {tab === "upcoming"
            ? "No upcoming events right now — check back soon!"
            : "No past events to show."}
        </p>
      ) : (
        <div className="grid grid--auto events-grid">
          {displayed.map((event) => {
            const start = new Date(event.startTime);
            const end = event.endTime ? new Date(event.endTime) : null;

            return (
              <ScrollReveal
                as="article"
                key={event.id}
                className="card event-card"
              >
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
      )}
    </div>
  );
}
