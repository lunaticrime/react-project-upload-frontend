import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import InfoProjet from "./pages/InfoProjet";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <InfoProjet /> 
  </StrictMode>
);
