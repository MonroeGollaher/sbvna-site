import ResourceItem from "./ResourceItem";
import "./styles.css";

const ResourceSection = ({ section }) => {
  const { id, title, description, items = [] } = section;

  return (
    <section style={{ marginTop: 24 }} id={id}>
      <h3>{title}</h3>

      {description ? <p>{description}</p> : null}

      {items.length > 0 ? (
        <ul>
          {items.map((item, idx) => (
            <ResourceItem
              key={item.id || `${id || title}-${idx}`}
              item={item}
            />
          ))}
        </ul>
      ) : (
        <p>No resources listed.</p>
      )}
    </section>
  );
};

export default ResourceSection;
