import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { IconUserCircle } from "@tabler/icons-react";
import SliderToggle from "./SliderToggle";
import { createPortal } from "react-dom";
import { navLinks } from "../mockData/dataAccueil";

const ResponsiveMenu = ({ open = false, isDarkMode, setIsDarkMode }) => {
  if (!open) return null;

  // Smooth scroll for anchor links
  const handleNavClick = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      if (link === "#footer") {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } else if (link === "#accueil") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(link.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-[108px] left-0 w-full h-[calc(100vh-108px)] z-[9999] bg-gray-900/40 backdrop-blur-sm flex justify-center items-start"
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`w-full max-w-sm mx-auto mt-2 text-lg font-semibold capitalize bg-blue-1 dark:bg-blue-1-dark text-white py-6 px-4 rounded-2xl shadow-2xl border border-blue-2 dark:border-blue-2-dark ${
              isDarkMode ? "dark" : ""
            }`}
          >
            <ul className="flex flex-col justify-center items-center gap-5">
              <li
                className="text-blue-50 font-semibold flex items-center gap-2 justify-center rounded-md px-6 py-2 duration-200 border-2 border-blue-2 dark:border-blue-2-dark cursor-pointer whitespace-nowrap hover:bg-blue-2 hover:text-white dark:hover:bg-blue-2-dark dark:hover:text-blue-1-dark w-full"
                onClick={() => (window.location.href = "/login")}
              >
                <IconUserCircle stroke={2} className="self-center" />
                <span>Se connecter</span>
              </li>
              {navLinks.map(({ id, name, link }) => (
                <li key={id} className="w-full flex justify-center">
                  <a
                    href={link}
                    onClick={(e) => handleNavClick(e, link)}
                    className="block w-full py-2 text-center rounded-md text-base font-medium hover:bg-blue-2 hover:text-white dark:hover:bg-blue-2-dark dark:hover:text-blue-1-dark transition-colors duration-200"
                  >
                    {name}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 mt-2">
                <a
                  href="#"
                  className="text-2xl rounded-full p-2 duration-200 text-blue-50 hover:bg-blue-2 hover:text-white dark:hover:bg-blue-2-dark"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="text-2xl rounded-full p-2 duration-200 text-blue-50 hover:bg-blue-2 hover:text-white dark:hover:bg-blue-2-dark"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="mt-2">
                <SliderToggle
                  setIsDarkMode={setIsDarkMode}
                  isDarkMode={isDarkMode}
                />
              </li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ResponsiveMenu;
