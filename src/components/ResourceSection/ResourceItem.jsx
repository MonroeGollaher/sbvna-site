import { isExternalUrl } from "./utils";

const ResourceItem = ({ item }) => {
  const ext = item.url && isExternalUrl(item.url);

  switch (item.type) {
    case "link":
      return (
        <a
          className="resource-card"
          href={item.url}
          target={ext ? "_blank" : undefined}
          rel={ext ? "noreferrer" : undefined}
        >
          <strong className="resource-card__title">{item.title}</strong>
          {item.description ? (
            <span className="resource-card__desc">{item.description}</span>
          ) : null}
          <span className="resource-card__action">Visit &rarr;</span>
        </a>
      );

    case "document":
      return (
        <a
          className="resource-card"
          href={item.url}
          target={ext ? "_blank" : undefined}
          rel={ext ? "noreferrer" : undefined}
        >
          <strong className="resource-card__title">{item.title}</strong>
          {item.fileType ? (
            <span className="badge">{item.fileType.toUpperCase()}</span>
          ) : null}
          <span className="resource-card__action">Open &rarr;</span>
        </a>
      );

    case "contact":
      return (
        <div className="resource-card">
          <strong className="resource-card__title">{item.title}</strong>
          {item.name ? (
            <span className="resource-card__desc">{item.name}</span>
          ) : null}
          <div className="resource-card__details">
            {item.email ? (
              <span>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </span>
            ) : null}
            {item.phone ? <span>{item.phone}</span> : null}
            {item.alternatePhone ? <span>{item.alternatePhone}</span> : null}
            {item.notes ? (
              <span className="resource-card__note">{item.notes}</span>
            ) : null}
          </div>
        </div>
      );

    case "text":
      return (
        <div className="resource-card">
          <strong className="resource-card__title">{item.title}</strong>
          {item.body ? (
            <span className="resource-card__desc">{item.body}</span>
          ) : null}
        </div>
      );

    default:
      return (
        <div className="resource-card">
          <strong className="resource-card__title">
            {item.title || "Untitled item"}
          </strong>
        </div>
      );
  }
};

export default ResourceItem;
