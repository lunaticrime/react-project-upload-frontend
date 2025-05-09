// www.hover.dev/components/toggles#slider-toggle
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative -z-10";

const SliderToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="relative flex w-fit items-center rounded-full z-10">
      <button
        className={`${TOGGLE_CLASSES} ${
          !isDarkMode ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setIsDarkMode(false);
        }}
      >
        <FiSun className="relative z-0 text-lg md:text-sm" />
        <span className="relative z-0">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          isDarkMode ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setIsDarkMode(true);
        }}
      >
        <FiMoon className="relative z-0 text-lg md:text-sm" />
        <span className="relative z-0">Dark</span>
      </button>
      <div
        className={`absolute inset-0 -z-20 flex ${
          isDarkMode ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full dark:bg-blue-2-dark bg-blue-2 "
        />
      </div>
    </div>
  );
};

export default SliderToggle;
