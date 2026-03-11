import { useState } from "react";
import about from "../content/about/about.json";
import ScrollReveal from "../components/ScrollReveal";
import Lightbox from "../components/Lightbox";
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

export default function About() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="page-wrapper">
      <h2 className="animate-fade-up">{about.title}</h2>
      <p className="animate-fade-up delay-1">{about.blurb}</p>
      <ScrollReveal>
        <div
          className="about-image-card"
          onClick={() =>
            setLightbox({
              src: about.headerImage,
              alt: about.headerImageAlt || ""
            })
          }
        >
          <img
            src={about.headerImage}
            alt={about.headerImageAlt || ""}
            loading="lazy"
          />
        </div>
      </ScrollReveal>
      {about.sections.map((section, i) => (
        <ScrollReveal
          key={section.title}
          className="about-section"
          delay={i * 0.05}
        >
          {section.layout === "flex" && section.image ? (
            <div className="about-section__flex">
              <div
                className="about-image-card"
                onClick={() =>
                  setLightbox({
                    src: section.image,
                    alt: section.imageAlt || section.title
                  })
                }
              >
                <img
                  src={section.image}
                  alt={section.imageAlt || section.title}
                  loading="lazy"
                />
              </div>
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
                  <div
                    className="about-image-card"
                    onClick={() =>
                      setLightbox({
                        src: section.image,
                        alt: section.imageAlt || section.title
                      })
                    }
                  >
                    <img
                      src={section.image}
                      alt={section.imageAlt || section.title}
                      loading="lazy"
                    />
                  </div>
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
