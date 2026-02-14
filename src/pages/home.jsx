import EmbeddedVideo from "../components/EmbeddedVideo";
import home from "../content/home/home.json";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h2 className="hero__title">{home.title}</h2>
          <p className="hero__subtitle">{home.intro}</p>
          <p className="hero__blurb">{home.blurb}</p>
          <a href="/about">Learn more</a>
        </div>
      </section>

      <section className="poster">
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
      <section>
        <EmbeddedVideo src="https://vimeo.com/561455388?fl=pl&fe=vl" />
      </section>
    </>
  );
}
