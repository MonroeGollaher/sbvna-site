import about from "../content/about/about.json";
import "./about.css";

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
  return (
    <div className="page-wrapper">
      <h2>{about.title}</h2>
      <p>{about.blurb}</p>
      <img
        src={about.headerImage}
        alt={about.headerImageAlt || ""}
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 12,
          margin: "12px auto",
          display: "block"
        }}
        loading="lazy"
      />
      {about.sections.map((section) => (
        <div key={section.title} className="about-section">
          <h3>{section.title}</h3>
          {renderBlurb(section.blurb)}
          {section.image ? (
            <>
              <img
                src={section.image}
                alt={section.imageAlt || section.title}
                style={{
                  width: "100%",
                  maxWidth: 900,
                  borderRadius: 12,
                  margin: "12px auto",
                  display: "block"
                }}
                loading="lazy"
              />
              <p className="caption">{section.imageCaption}</p>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
