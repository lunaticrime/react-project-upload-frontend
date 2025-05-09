// CommandMenuContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const CommandMenuContext = createContext();

export const CommandMenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setMenuOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const openCommandMenu = () => {
    setMenuOpen(true);
  };

  const closeCommandMenu = () => {
    setMenuOpen(false);
  };

  return (
    <CommandMenuContext.Provider
      value={{ menuOpen, openCommandMenu, closeCommandMenu, setMenuOpen }}
    >
      {children}
    </CommandMenuContext.Provider>
  );
};

export const useCommandMenu = () => {
  const context = useContext(CommandMenuContext);
  if (context === undefined) {
    throw new Error("useCommandMenu must be used within a CommandMenuProvider");
  }
  return context;
};
