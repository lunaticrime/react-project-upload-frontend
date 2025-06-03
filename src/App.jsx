// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import { CommandMenuProvider } from "./components/CommandMenuContext";

// Importez PrivateRoute
import PrivateRoute from "./components/PrivateRoute"; // Ajustez le chemin si nécessaire

const EspaceAdmin = lazy(() => import("./pages/EspaceAdmin"));
const EspaceProf = lazy(() => import("./pages/EspaceProf"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const CommandMenu = lazy(() => import("./components/commandMenu"));
const FeedPage = lazy(() => import("./pages/FeedPage"));
const InfoProjet = lazy(() => import("./pages/infoProjet"));
import BarLoader from "./components/utils/loader";
import lightLogo from "./assets/lightLogo.png";

// ... (le reste des imports et la logique de isDarkMode)

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    if (saved !== null) return saved === "true";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark;
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <CommandMenuProvider>
        <Suspense
          fallback={
            <div className="h-screen bg-blue-1 flex flex-col gap-4 justify-center items-center">
              <img
                src={lightLogo}
                alt="logo"
                className="lg:w-2xs lg:h-auto h-15 w-auto"
              />
              <BarLoader />
            </div>
          }
        >
          <CommandMenu />
          <Routes>
            {/* Routes publiques */}
            <Route
              path="/"
              element={
                <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              }
            />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />

            {/* Routes privées */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <EspaceAdmin
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/prof"
              element={
                <PrivateRoute>
                  <EspaceProf />
                </PrivateRoute>
              }
            />
            <Route
              path="/info-projet/:id"
              element={
                <PrivateRoute>
                  <InfoProjet />
                </PrivateRoute>
              }
            />
            <Route
              path="/feed"
              element={
                <PrivateRoute>
                  <FeedPage
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                  />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </CommandMenuProvider>
    </BrowserRouter>
  );
}

export default App;