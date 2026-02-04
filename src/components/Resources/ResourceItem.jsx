import { isExternalUrl } from "./utils";

export default ResourceItem = ({ item }) => {
  switch (item.type) {
    case "link":
      return (
        <li>
          <strong>{item.title}</strong>
          {item.description ? <> — {item.description}</> : null}
          {item.url ? (
            <>
              {" "}
              (
              <a
                href={item.url}
                target={isExternalUrl(item.url) ? "_blank" : undefined}
                rel={isExternalUrl(item.url) ? "noreferrer" : undefined}
              >
                Open link
              </a>
              )
            </>
          ) : null}
        </li>
      );

    case "document":
      return (
        <li>
          <strong>{item.title}</strong>
          {item.fileType ? <> ({item.fileType.toUpperCase()})</> : null}
          {item.url ? (
            <>
              {" "}
              —{" "}
              <a
                href={item.url}
                target={isExternalUrl(item.url) ? "_blank" : undefined}
                rel={isExternalUrl(item.url) ? "noreferrer" : undefined}
              >
                Open
              </a>
            </>
          ) : null}
        </li>
      );

    case "contact":
      return (
        <li>
          <strong>{item.title}</strong>
          {item.name ? <> — {item.name}</> : null}
          <div>
            {item.email ? (
              <div>
                Email: <a href={`mailto:${item.email}`}>{item.email}</a>
              </div>
            ) : null}
            {item.phone ? <div>Phone: {item.phone}</div> : null}
            {item.alternatePhone ? <div>Alt: {item.alternatePhone}</div> : null}
            {item.notes ? <div>Notes: {item.notes}</div> : null}
          </div>
        </li>
      );

    case "text":
      return (
        <li>
          <strong>{item.title}</strong>
          {item.body ? (
            <div style={{ whiteSpace: "pre-wrap" }}>{item.body}</div>
          ) : null}
        </li>
      );

    default:
      return (
        <li>
          <strong>{item.title || "Untitled item"}</strong>
        </li>
      );
  }
};
