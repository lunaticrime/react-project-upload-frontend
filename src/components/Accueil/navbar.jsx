import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa"; // Import React user icons
import { navLinks } from "../../../mockData/dataAccueil";

export default function Example({ theme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#");

  const openMenu = () => setMobileMenuOpen(true);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleSmoothScroll = (event, link) => {
    event.preventDefault();
    if (link === "#accueil") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
      setActiveLink(link);
      closeMenu();
    } else {
      const targetElement = document.querySelector(link);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        setActiveLink(link);
        closeMenu();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("div[id]");
      let currentSection = "#";

      if (window.scrollY === 0) {
        currentSection = "#accueil"; // Activate "Accueil" at the top of the page
      } else {
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = `#${section.id}`;
          }
        });

        // Special case for "Contact" section at the bottom
        const footer = document.querySelector("#footer");
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          if (
            footerRect.top <= window.innerHeight &&
            footerRect.bottom >= window.innerHeight
          ) {
            currentSection = "#footer";
          }
        }
      }

      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-background)] font-goudy shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <nav
        aria-label="Global"
        className="mx-auto flex flex-wrap max-w-7xl items-center justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Logo"
              src="/src/assets/logoLight.png"
              className="h-15 w-auto"
            />
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={openMenu}
            className="rounded-full p-2.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-1)] transition-all"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10 lg:mx-auto">
          {navLinks.map(({ id, name, link }) => (
            <a
              key={id}
              href={link}
              onClick={(event) => handleSmoothScroll(event, link)}
              className={`relative text-base font-semibold text-[var(--color-blue-1)] transition-all duration-300 ${
                activeLink === link ? "after:scale-x-100" : "after:scale-x-0"
              } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[var(--color-blue-1)] after:origin-left after:transition-transform after:duration-300`}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button className="group flex items-center gap-3 rounded-full bg-[var(--color-blue-3)] px-6 py-3 text-base font-semibold text-[var(--color-background)] shadow-lg hover:bg-[var(--color-blue-4)] hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-poppins">
              <FaUserCircle className="h-7 w-7" /> {/* Updated to user icon */}
            Se connecter
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={closeMenu}
        className="lg:hidden relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <DialogPanel className="fixed top-20 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[var(--color-blue-1)]">
              Menu
            </h2>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-1)]"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-6">
            {navLinks.map(({ id, name, link }) => (
              <a
                key={id}
                href={link}
                onClick={(event) => handleSmoothScroll(event, link)}
                className="block text-lg font-medium text-[var(--color-blue-1)] hover:text-[var(--color-blue-1)] hover:underline text-center transition-colors duration-200"
              >
                {name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
