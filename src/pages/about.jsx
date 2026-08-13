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
    <div className="page-wrapper">
      <h1 className="animate-fade-up">{about.title}</h1>
      <p className="animate-fade-up delay-1">{about.blurb}</p>
      <ScrollReveal>
        <ImageCard
          src={about.headerImage}
          alt={about.headerImageAlt || ""}
          onOpen={setLightbox}
        />
      </ScrollReveal>
      {about.sections.map((section, i) => (
        <ScrollReveal
          key={section.title}
          className="about-section"
          delay={i * 0.05}
        >
          {section.layout === "flex" && section.image ? (
            <div className="about-section__flex">
              <ImageCard
                src={section.image}
                alt={section.imageAlt || section.title}
                onOpen={setLightbox}
              />
              <div className="about-section__text">
                <h3>{section.title}</h3>
                {renderBlurb(section.blurb)}
                {section.imageCaption ? (
                  <p className="caption">{section.imageCaption}</p>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              <h3>{section.title}</h3>
              {renderBlurb(section.blurb)}
              {section.image ? (
                <>
                  <ImageCard
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    onOpen={setLightbox}
                  />
                  {section.imageCaption ? (
                    <p className="caption">{section.imageCaption}</p>
                  ) : null}
                </>
              ) : null}
            </>
          )}
        </ScrollReveal>
      ))}

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
