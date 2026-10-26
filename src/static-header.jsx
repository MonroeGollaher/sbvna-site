import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import "./styles/theme.css";
import "./styles/static-header.css";

createRoot(document.getElementById("site-header")).render(
  <BrowserRouter>
    <Header fullPageNavigation />
  </BrowserRouter>
);
