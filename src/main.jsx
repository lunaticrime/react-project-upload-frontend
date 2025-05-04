import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EspaceProf from "./pages/EspaceProf";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <EspaceProf /> 
  </StrictMode>
);
