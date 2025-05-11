import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import "./index.css"; // Ensure the updated index.css with blue palette is used
import InfoProjet from "./pages/InfoProjet";
import EspaceProf from "./pages/EspaceProf"; // Import EspaceProf
import Accueil from "./pages/Accueil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<EspaceProf />} />
        <Route path="/info-projet/:id" element={<InfoProjet />} />
        <Route path="/accueil" element={<Accueil />} />
      </Routes>
    </Router>
  </StrictMode>
);
