import React, { useState, useEffect } from "react";
import { NavbarMenu } from "../mockData/data";
import { FaSearch, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IconMenu } from "@tabler/icons-react";
import { IoCloseOutline } from "react-icons/io5";
// import ResponsiveMenu from "./responsiveMenu";
import { IconUserCircle } from "@tabler/icons-react";
import Toggle from "./ui/SliderToggle2";
import { useCommandMenu } from "./CommandMenuContext";
import lightLogo from "../assets/lightLogo.png";
import darkLogo from "../assets/darkLogo.png";

const ResponsiveMenu = React.lazy(() => import("./responsiveMenu"));

const TestNavbar = ({ isDarkMode, setIsDarkMode }) => {
  const [open, setOpen] = useState(false);
  const { openCommandMenu } = useCommandMenu();

  {
    /* temporary solution bidman zedt dark/light toggle*/
  }

  return (
    <header className=" top-0 z-100">
      <nav
        className={`bg-blue-50 dark:bg-blue-1-dark z-50 shadow-md ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {" "}
        {/* khas nzid dark:bg-chiColor /// done✅ */}
        <div className="px-4 sm:px-8 lg:px-1 xl:px-16 w-screen flex justify-between items-center py-6 m-auto max-w-screen">
          {/* logo */}
          <a href="/" className="flex">
            <img
              alt="École nationale des sciences appliquées Kenitra"
              src={isDarkMode ? lightLogo : darkLogo}
              className="lg:w-[500px] lg:h-auto h-15 w-auto"
            />
            {/* 9leb les liens dyal tsawer , tania hia dyal dark mode/// done✅ */}
          </a>
          {/* menu */}
          <div className="w-screen hidden lg:block">
            <ul className="flex justify-center items-center gap-8 lg:gap-4 xl:gap-8 text-blue-1 dark:text-blue-50 font-bold capitalize">
              {NavbarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      className="inline-block py-1 px-3 hover:text-blue-2 dark:hover:text-blue-200 font-semibold relative group"
                    >
                      {item.title}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-1  dark:bg-blue-50 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCommandMenu}
              className="text-xl rounded-full p-2 duration-200 text-blue-1 hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark cursor-pointer"
            >
              <FaSearch />
            </button>
            <button className="text-2xl rounded-full p-2 duration-200 hidden sm:block text-blue-1 hover:bg-blue-1 hover:text-blue-50 cursor-pointer dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark">
              <FaLinkedin />
            </button>
            <button className="text-2xl rounded-full p-2 duration-200 hidden sm:block text-blue-1 hover:bg-blue-1 hover:text-blue-50 cursor-pointer dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark">
              <FaInstagram />
            </button>
            <button
              className="text-blue-1 font-semibold rounded-md px-4 py-2 duration-200 hidden lg:flex gap-2 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
              onClick={() => (window.location.href = "/login")}
            >
              <IconUserCircle stroke={2} className="self-center" />
              <span>Sign In</span>
            </button>
            <div
              className="lg:hidden"
              onClick={() => {
                setOpen(!open);
                console.log(open);
              }}
            >
              {" "}
              {/* hamburger menu */}
              {open ? (
                <IoCloseOutline className="text-4xl dark:text-white" />
              ) : (
                <IconMenu stroke={2} className="text-4xl dark:text-white" />
              )}
            </div>
            <div className="hidden lg:block">
              <Toggle setIsDarkMode={setIsDarkMode} />
            </div>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div>
        <ResponsiveMenu
          open={open}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
        />
      </div>
    </header>
  );
};

export default TestNavbar;
