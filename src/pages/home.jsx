import home from "../content/home/home.json";
import "./home.css";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h2 className="hero__title">{home.title}</h2>
          <p className="hero__subtitle">{home.intro}</p>
        </div>
      </section>
    </>
  );
}
