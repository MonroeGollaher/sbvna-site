import { useEffect } from "react";

const SITE_NAME = "South Boise Village Neighborhood Association";

function setMeta(selector, attr, value, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets the document title and description for the current route.
 *
 * This is a SPA, so index.html only ever ships one title — without this every
 * page shares the same tab label, bookmark name, and search result snippet.
 *
 * Pass `title` as the page name only; the site name is appended. Omit it on
 * the home page to use the site name alone.
 */
export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description
      );
    }

    setMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      title ? `${title} — ${SITE_NAME}` : SITE_NAME
    );
  }, [title, description]);
}
