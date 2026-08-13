import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Board from "./pages/board.jsx";
import Gallery from "./pages/gallery.jsx";
import Documents from "./pages/documents.jsx";
import Header from "./components/Header/index.jsx";
import About from "./pages/about.jsx";
import Events from "./pages/events.jsx";
import Resources from "./pages/resources.jsx";
import NotFound from "./pages/notFound.jsx";
import Footer from "./components/Footer/index.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      {/* tabIndex lets the skip link move focus here, not just scroll to it */}
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/board" element={<Board />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
