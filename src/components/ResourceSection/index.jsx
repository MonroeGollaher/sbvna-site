import ResourceItem from "./ResourceItem";
import "./styles.css";

const ResourceSection = ({ section }) => {
  const { id, title, description, items = [] } = section;

  return (
    <section className="resource-section" id={id}>
      <h3 className="resource-section__title">{title}</h3>
      {description ? <p className="resource-section__desc">{description}</p> : null}

      {items.length > 0 ? (
        <div className="resource-grid">
          {items.map((item, idx) => (
            <ResourceItem
              key={item.id || `${id || title}-${idx}`}
              item={item}
            />
          ))}
        </div>
      ) : (
        <p>No resources listed.</p>
      )}
    </section>
  );
};

export default ResourceSection;
