import { useMemo } from "react";
import { Link } from "react-router-dom";
import AnnouncementBanner from "../components/AnnouncementBanner";
import useScrollReveal from "../utils/useScrollReveal";
import usePageMeta from "../utils/usePageMeta";
import home from "../content/home/home.json";
import eventsPage from "../content/events/events.json";
import "../styles/home.css";

function getNextEventBanner(events) {
  const now = new Date();
  const oneMonthOut = new Date(now);
  oneMonthOut.setMonth(oneMonthOut.getMonth() + 1);

  const upcoming = events
    .filter((e) => {
      const start = new Date(e.startTime);
      return start > now && start <= oneMonthOut;
    })
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  if (upcoming.length === 0) return null;

  const next = upcoming[0];
  const date = new Date(next.startTime);
  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });

  const where = next.location ? ` at ${next.location}` : "";

  return {
    enabled: true,
    message: `${next.title} — ${formatted}${where}`,
    linkText: "View events",
    linkUrl: "/events"
  };
}

// The manual banner can set a "Show until" date; hide it once that day has passed.
function isBannerCurrent(banner) {
  if (!banner?.expires) return true;
  // A date-only value would parse as midnight UTC, so treat it as the end of that local day
  const expires = banner.expires.includes("T")
    ? new Date(banner.expires)
    : new Date(`${banner.expires}T23:59:59`);
  return expires >= new Date();
}

export default function Home() {
  usePageMeta({
    description:
      "The South Boise Village Neighborhood Association serves the historic South Boise Village neighborhood in Boise, Idaho. Find upcoming events, board members, meeting minutes, bylaws, and neighborhood resources."
  });

  const posterRef = useScrollReveal();
  const nextEvent = (eventsPage.events || [])
    .filter((event) => new Date(event.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))[0];
  const nextDate = nextEvent ? new Date(nextEvent.startTime) : null;

  const banner = useMemo(() => {
    const eventBanner = getNextEventBanner(eventsPage.events || []);
    if (eventBanner) return eventBanner;
    return isBannerCurrent(home.banner) ? home.banner : null;
  }, []);

  return (
    <>
      <AnnouncementBanner banner={banner} />
      <section className="hero">
        <div className="hero__content">
          <p className="home-eyebrow hero__eyebrow">
            South Boise Village · Boise, Idaho
          </p>
          <h1 className="hero__title">
            A little neighborhood.
            <br />A lot of history.
          </h1>
          <p className="hero__subtitle">Welcome to South Boise Village.</p>
          <p className="hero__blurb">{home.blurb}</p>
          <div className="hero__actions">
            <Link to="/about" className="hero__btn">
              Explore the neighborhood <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/board" className="hero__secondary">
              Meet your neighbors <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-event" aria-labelledby="home-event-title">
        <div className="home-event__date" aria-hidden="true">
          {nextDate ? (
            <>
              <span>
                {nextDate.toLocaleDateString("en-US", { month: "short" })}
              </span>
              <strong>{nextDate.getDate()}</strong>
            </>
          ) : (
            <>
              <span>Come</span>
              <strong>say hi.</strong>
            </>
          )}
        </div>
        <div className="home-event__text">
          <p className="home-eyebrow">Around the neighborhood</p>
          <h2 id="home-event-title">
            {nextEvent ? nextEvent.title : "More gatherings ahead."}
          </h2>
          <p>
            {nextEvent
              ? `${nextDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}${nextEvent.location ? ` · ${nextEvent.location}` : ""}`
              : "Park gatherings, neighborhood cleanups, and a chance to catch up. Check back for our next event."}
          </p>
        </div>
        <Link className="home-text-link" to="/events">
          {nextEvent ? "Event details" : "Explore our events"}{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="poster reveal" ref={posterRef}>
        <div className="poster__inner">
          <div className="poster__frame">
            <img
              className="poster__image"
              src="/images/sbv-poster.webp"
              alt="Historic South Boise Village Neighborhood poster — available for a minimum donation of $10"
            />
          </div>
          <div className="poster__text">
            <p className="home-eyebrow">A piece of the Village</p>
            <h2>
              Local pride.
              <br />
              Ready to frame.
            </h2>
            <p>
              Get a beautiful 11" x 17" Historic South Boise Village poster for
              your home. Available for a minimum donation of $10 (cash or check
              only) with free delivery to your door.
            </p>
            <p className="poster__details">
              11″ × 17″ <span aria-hidden="true">·</span> $10 minimum donation
            </p>
            <a className="home-text-link" href="mailto:sbvnaboise@gmail.com">
              Order your poster <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
