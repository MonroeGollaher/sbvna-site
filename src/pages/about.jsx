import { useState } from "react";
import about from "../content/about/about.json";
import ScrollReveal from "../components/ScrollReveal";
import Lightbox from "../components/Lightbox";
import usePageMeta from "../utils/usePageMeta";
import "../styles/about.css";

function renderBlurb(text) {
  const blocks = text.split(/\n\n/);
  const result = [];
  let bulletBuffer = [];

  function flushBullets() {
    if (bulletBuffer.length > 0) {
      result.push(
        <ul key={`ul-${result.length}`}>
          {bulletBuffer.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      bulletBuffer = [];
    }
  }

  blocks.forEach((block) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("- ")) {
      bulletBuffer.push(trimmed.slice(2));
    } else {
      flushBullets();
      if (trimmed) {
        result.push(<p key={`p-${result.length}`}>{trimmed}</p>);
      }
    }
  });

  flushBullets();
  return result;
}

function ImageCard({ src, alt, onOpen }) {
  return (
    <button
      type="button"
      className="about-image-card"
      onClick={() => onOpen({ src, alt })}
      aria-label={alt ? `Expand image: ${alt}` : "Expand image"}
    >
      <img src={src} alt={alt} loading="lazy" />
      <span className="about-image-card__expand" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 4h6v6m0-6-7 7M10 20H4v-6m0 6 7-7" />
        </svg>
      </span>
    </button>
  );
}

export default function About() {
  usePageMeta({
    title: about.title,
    description:
      "History, boundaries, and character of the historic South Boise Village neighborhood in Boise, Idaho."
  });

  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="page-wrapper about-page">
      <header className="about-intro">
        <div className="about-intro__text animate-fade-up">
          <p className="about-eyebrow">Our neighborhood · Boise, Idaho</p>
          <h1>{about.title}</h1>
          <p className="about-intro__blurb">{about.blurb}</p>
        </div>
        <div className="about-intro__map animate-fade-up delay-1">
          <ImageCard
            src={about.headerImage}
            alt={about.headerImageAlt || ""}
            onOpen={setLightbox}
          />
          <p className="about-map-caption">South Boise Village boundaries · Select map to enlarge</p>
        </div>
      </header>

      <div className="about-sections">
        {about.sections.map((section) => (
          <ScrollReveal
            key={section.title}
            className={`about-section${section.title === "Mission Statement" ? " about-section--mission" : ""}${section.title === "Vision Statement" ? " about-section--vision" : ""}`}
          >
            <div className="about-section__heading">
              <h2>{section.title}</h2>
            </div>
            <div className="about-section__content">
              {section.layout === "flex" && section.image ? (
                <div className="about-section__flex">
                  <ImageCard
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    onOpen={setLightbox}
                  />
                  <div className="about-section__text">{renderBlurb(section.blurb)}</div>
                </div>
              ) : (
                <>
                  {renderBlurb(section.blurb)}
                  {section.image ? (
                    <ImageCard
                      src={section.image}
                      alt={section.imageAlt || section.title}
                      onOpen={setLightbox}
                    />
                  ) : null}
                </>
              )}
              {section.imageCaption ? <p className="caption">{section.imageCaption}</p> : null}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {lightbox ? (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </div>
  );
}
