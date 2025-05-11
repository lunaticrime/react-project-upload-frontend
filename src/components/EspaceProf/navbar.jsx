import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa"; // Import React user icon and new React icon
import { navLinks } from "../../../mockData/dataEspaceProf";

export default function Example({ userName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Accueil");
  const navigate = useNavigate(); // Initialize navigate

  const openMenu = () => setMobileMenuOpen(true);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    navigate("/accueil"); // Redirect to the homepage
  };

  const logoSrc = "/src/assets/logoLight.png";

  const handleSmoothScroll = (event, link) => {
    event.preventDefault();
    if (link === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-background)] font-goudy shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <nav
        aria-label="Global"
        className="mx-auto flex flex-wrap max-w-7xl items-center justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="Logo" src={logoSrc} className="h-15 w-auto" />
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
              onClick={(event) => {
                setActiveLink(name);
                handleSmoothScroll(event, link);
              }}
              className={`relative text-base font-semibold text-[var(--color-blue-1)] transition-all duration-300 ${
                activeLink === name ? "after:scale-x-100" : "after:scale-x-0"
              } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[var(--color-blue-1)] after:origin-left after:transition-transform after:duration-300`}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 rounded-full bg-[var(--color-blue-2)] px-5 py-2.5 text-base font-semibold text-[var(--color-background)] shadow-md hover:bg-[var(--color-blue-4)] hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-poppins"
          >
            <FaUserCircle className="h-7 w-7 group-hover:hidden" />{" "}
            {/* Default user icon */}
            <ArrowRightOnRectangleIcon className="h-7 w-7 hidden group-hover:block" />{" "}
            {/* Hover logout icon */}
            <span className="group-hover:hidden">{userName} Exemple</span>{" "}
            {/* Default text */}
            <span className="hidden group-hover:block">
              Se déconnecter
            </span>{" "}
            {/* Hover text */}
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

          {/* User Name at the Top */}
          <div className="text-center mb-15">
            <span className="text-sm sm:text-lg font-bold text-[var(--color-blue-1)] bg-[var(--color-background)] px-3 sm:px-4 py-2 rounded-lg shadow-md border border-[var(--color-blue-1)] inline-block">
              Connecté en tant que Exemple {userName}
            </span>
          </div>

          <div className="space-y-6">
            {navLinks.map(({ id, name, link }) => (
              <a
                key={id}
                href={link}
                onClick={(event) => {
                  closeMenu();
                  handleSmoothScroll(event, link);
                }}
                className="block text-lg font-medium text-[var(--color-blue-1)] hover:text-[var(--color-blue-1)] hover:underline text-center transition-colors duration-200"
              >
                {name}
              </a>
            ))}

            {/* Déconnecter Button at the Bottom */}
            <button
              onClick={handleLogout}
              className="mt-6 w-full group flex items-center justify-center gap-3 rounded-full bg-[var(--color-background)] px-6 py-3 text-base font-semibold text-[var(--color-blue-1)] shadow-md border border-[var(--color-blue-1)] hover:bg-[var(--color-blue-1)] hover:text-[var(--color-background)] hover:border-[var(--color-background)] transition-all duration-200 font-poppins cursor-pointer"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-blue-1)] bg-[var(--color-background)] group-hover:bg-[var(--color-blue-1)] group-hover:border-[var(--color-background)] cursor-pointer">
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-[var(--color-blue-1)] group-hover:text-[var(--color-background)]" />
              </span>
              Déconnecter
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
