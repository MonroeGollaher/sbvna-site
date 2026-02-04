import resources from "../content/resources/resources.json";
import ResourceSection from "../components/Resources/ResourceSection";

export default function Resources() {
  const { title, blurb, sections = [] } = resources;

  return (
    <div>
      <h2>{title}</h2>
      {blurb ? <p>{blurb}</p> : null}

      {sections.map((section) => (
        <ResourceSection key={section.id || section.title} section={section} />
      ))}
    </div>
  );
}
