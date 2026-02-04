import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Board from "./pages/Board.jsx";
import Gallery from "./pages/Gallery.jsx";
import Documents from "./pages/Documents.jsx";
import Header from "./components/Header/index.jsx";
import About from "./pages/about.jsx";
import Events from "./pages/events.jsx";
import Resources from "./pages/resources.jsx";
import Admin from "./pages/admin.jsx";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/board" element={<Board />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
