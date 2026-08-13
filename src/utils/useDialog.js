import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");

/**
 * Shared behaviour for the modal dialogs: Escape to close, body scroll lock,
 * focus moved into the dialog on open, focus trapped inside while it is open,
 * and focus returned to whatever opened it on close.
 *
 * Returns a ref to attach to the dialog container.
 */
export default function useDialog(onClose) {
  const containerRef = useRef(null);

  // Callers pass an inline arrow (`() => setSelected(null)`), which is a new
  // function every render. Keep it in a ref so the setup below runs once per
  // open instead of re-trapping focus on every parent render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const container = containerRef.current;
    const previouslyFocused = document.activeElement;

    document.body.style.overflow = "hidden";

    // Move focus into the dialog so the next Tab stays inside it.
    const first = container?.querySelector(FOCUSABLE);
    (first || container)?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (e.key !== "Tab" || !container) return;

      const items = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  return containerRef;
}
