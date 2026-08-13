import resources from "../content/resources/resources.json";
import ResourceSection from "../components/ResourceSection";
import ScrollReveal from "../components/ScrollReveal";
import usePageMeta from "../utils/usePageMeta";

export default function Resources() {
  const { title, blurb, sections = [] } = resources;

  usePageMeta({
    title,
    description:
      "City services, contacts, and helpful links for residents of South Boise Village."
  });


  return (
    <div className="page-wrapper">
      <h1 className="animate-fade-up">{title}</h1>
      {blurb ? <p className="animate-fade-up delay-1">{blurb}</p> : null}

      {sections.map((section) => (
        <ScrollReveal key={section.id || section.title}>
          <ResourceSection section={section} />
        </ScrollReveal>
      ))}
    </div>
  );
}
