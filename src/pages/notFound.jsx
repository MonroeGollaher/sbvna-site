import { Link } from "react-router-dom";
import usePageMeta from "../utils/usePageMeta";

export default function NotFound() {
  usePageMeta({ title: "Page not found" });

  return (
    <div className="page-wrapper">
      <h1 className="animate-fade-up">Page not found</h1>
      <p className="animate-fade-up delay-1">
        We couldn&rsquo;t find that page. It may have been moved or renamed.
      </p>
      <p>
        <Link className="btn" to="/">
          Back to home
        </Link>
      </p>
    </div>
  );
}
