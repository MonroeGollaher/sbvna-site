import about from "../content/about/about.json";

export default function About() {
  return (
    <div>
      <h2>{about.title}</h2>
      <p>{about.blurb}</p>
      <img
        src={about.headerImage}
        alt={about.headerImageAlt || section.title}
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 12,
          margin: "12px 0",
          display: "block"
        }}
        loading="lazy"
      />
      {about.sections.map((section) => (
        <div key={section.title}>
          <h3>{section.title}</h3>
          <p>{section.blurb}</p>
          {section.image ? (
            <>
              <img
                src={section.image}
                alt={section.imageAlt || section.title}
                style={{
                  width: "100%",
                  maxWidth: 900,
                  borderRadius: 12,
                  margin: "12px 0",
                  display: "block"
                }}
                loading="lazy"
              />
              <p>{section.imageCaption}</p>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
