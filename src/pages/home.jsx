import { useMemo } from "react";
import EmbeddedVideo from "../components/EmbeddedVideo";
import AnnouncementBanner from "../components/AnnouncementBanner";
import useScrollReveal from "../utils/useScrollReveal";
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
    day: "numeric",
  });

  return {
    enabled: true,
    message: `${next.title} — ${formatted} at ${next.location}`,
    linkText: "View events",
    linkUrl: "/events",
  };
}

export default function Home() {
  const posterRef = useScrollReveal();
  // const videoRef = useScrollReveal();

  const banner = useMemo(() => {
    const eventBanner = getNextEventBanner(eventsPage.events || []);
    return eventBanner || home.banner;
  }, []);

  return (
    <>
      <AnnouncementBanner banner={banner} />
      <section className="hero">
        <div className="hero__content">
          <h2 className="hero__title">{home.title}</h2>
          <p className="hero__subtitle">{home.intro}</p>
          <p className="hero__blurb">{home.blurb}</p>
          <a href="/about" className="hero__btn">
            Learn more
          </a>
        </div>
      </section>

      <section className="poster reveal" ref={posterRef}>
        <div className="poster__inner">
          <img
            className="poster__image"
            src="/images/sbv-poster.webp"
            alt="Historic South Boise Village Neighborhood poster — available for a minimum donation of $10"
          />
          <div className="poster__text">
            <h3>Neighborhood Poster</h3>
            <p>
              Get a beautiful 11" x 17" Historic South Boise Village poster for
              your home. Available for a minimum donation of $10 (cash or check
              only) with free delivery to your door.
            </p>
            <p>
              Contact{" "}
              <a href="mailto:sbvnaboise@gmail.com">sbvnaboise@gmail.com</a> to
              order yours.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="reveal" ref={videoRef}>
        <EmbeddedVideo src="https://vimeo.com/561455388?fl=pl&fe=vl" />
      </section> */}
    </>
  );
}
