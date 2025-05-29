import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
// import Home from "./pages/home";
// import Login from "./pages/login";
// import Profile from "./pages/profile";
// import CommandMenu from "./components/commandMenu";
import { CommandMenuProvider } from "./components/CommandMenuContext";
const EspaceAdmin = lazy(() => import("./pages/EspaceAdmin"));
const EspaceProf = lazy(() => import("./pages/EspaceProf"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const CommandMenu = lazy(() => import("./components/commandMenu"));
const FeedPage = lazy(() => import("./pages/feedPage"));
const InfoProjet = lazy(() => import("./pages/infoProjet"));
import BarLoader from "./components/utils/loader";
import lightLogo from "./assets/lightLogo.png";
// const CommandMenu = lazyLoad("./components/commandMenu");
// const Home = lazyLoad("pages/home.jsx");
// const Login = lazyLoad("pages/login");
// const Profile = lazyLoad("pages/profile");
// const Home = lazy(() =>
//   import("./pages/home");
// );
// const Login = lazy(() =>
//   import("./pages/login");
// );
// const Profile = lazy(() =>
//   import("./pages/profile");
// );
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/profile-sidebar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    if (saved !== null) return saved === "true";

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
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
            <Route
              path="/"
              element={
                <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              }
            />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
            <Route
              path="/profile"
              element={
                <Profile
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
              }
            />
            <Route path="/admin" element={<EspaceAdmin isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}/>} />
            <Route path="/prof" element={<EspaceProf />} />
            <Route path="/info-projet/:id" element={<InfoProjet />} />
            <Route
              path="/feed"
              element={
                <FeedPage
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
              }
            />
          </Routes>
        </Suspense>
      </CommandMenuProvider>
    </BrowserRouter>
  );
}

export default App;
