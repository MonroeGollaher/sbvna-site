import resources from "../content/resources/resources.json";
import ResourceSection from "../components/ResourceSection";
import ScrollReveal from "../components/ScrollReveal";

export default function Resources() {
  const { title, blurb, sections = [] } = resources;

  return (
    <div className="page-wrapper">
      <h2 className="animate-fade-up">{title}</h2>
      {blurb ? <p className="animate-fade-up delay-1">{blurb}</p> : null}

      {sections.map((section) => (
        <ScrollReveal key={section.id || section.title}>
          <ResourceSection section={section} />
        </ScrollReveal>
      ))}
    </div>
  );
}
