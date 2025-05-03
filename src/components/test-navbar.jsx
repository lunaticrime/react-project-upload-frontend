import React, { useState, useEffect } from "react";
import { NavbarMenu } from "../mockData/data";
import { FaSearch, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IconMenu } from "@tabler/icons-react";
import { IoCloseOutline } from "react-icons/io5";
import ResponsiveMenu from "./responsiveMenu";

const TestNavbar = () => {
  const [open, setOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);
  {
    /* temporary solution bidman zedt dark/light toggle*/
  }

  return (
    <>
      <nav className="bg-blue-50 sticky top-0 z-50 shadow-md">
        {" "}
        {/* khas nzid dark:bg-chiColor */}
        <div className="px-4 sm:px-8 lg:px-1 xl:px-16 w-screen flex justify-between items-center py-6 m-auto max-w-screen">
          {/* logo */}
          <a href="/" className="">
            <img
              alt="École nationale des sciences appliquées Kenitra"
              src={
                isDarkMode
                  ? "https://ensa.uit.ac.ma/wp-content/uploads/2024/12/cropped-logobleuhori-600x145.png"
                  : "https://ensa.uit.ac.ma/wp-content/uploads/2025/03/LOGO-ENSA.png"
              }
              className="lg:w-[500px] lg:h-auto h-15 w-auto"
            />
            {/* 9leb les liens dyal tsawer , tania hia dyal dark mode */}
          </a>
          {/* menu */}
          <div className="w-screen hidden lg:block">
            <ul className="flex justify-center items-center gap-8 lg:gap-4 xl:gap-8 text-blue-1 font-bold capitalize">
              {NavbarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      className="inline-block py-1 px-3 hover:text-blue-2 font-semibold relative group"
                    >
                      {item.title}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-1 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* icons */}
          <div className="flex items-center gap-2">
            <button className="text-xl rounded-full p-2 duration-200 text-blue-1 hover:bg-blue-1 hover:text-blue-50 cursor-pointer">
              <FaSearch />
            </button>
            <button className="text-2xl rounded-full p-2 duration-200 hidden sm:block text-blue-1 hover:bg-blue-1 hover:text-blue-50 cursor-pointer">
              <FaLinkedin />
            </button>
            <button className="text-2xl rounded-full p-2 duration-200 hidden sm:block text-blue-1 hover:bg-blue-1 hover:text-blue-50 cursor-pointer">
              <FaInstagram />
            </button>
            <button className="text-blue-1 font-semiblond rounded-md px-6 py-2 duration-200 hidden lg:block border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50">
              Se connecter
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
                <IoCloseOutline className="text-4xl" />
              ) : (
                <IconMenu stroke={2} className="text-4xl" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div>
        <ResponsiveMenu open={open} />
      </div>
    </>
  );
};

export default TestNavbar;
