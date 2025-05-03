import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { navLinks } from "../../../mockData/data"; // Import navLinks

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Accueil");

  const openMenu = () => setMobileMenuOpen(true);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-background)] font-goudy shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto flex flex-wrap max-w-7xl items-center justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://ensa.uit.ac.ma/wp-content/uploads/2024/12/cropped-logobleuhori-600x145.png"
              className="h-15 w-auto"
            />
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={openMenu}
            className="rounded-full p-2.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-purple-dark)] transition-all"
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
              onClick={() => setActiveLink(name)}
              className={`relative text-base font-semibold text-[var(--color-purple-dark)] transition-all duration-300 ${
                activeLink === name ? "after:scale-x-100" : "after:scale-x-0"
              } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[var(--color-purple-dark)] after:origin-left after:transition-transform after:duration-300`}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button className="group flex items-center gap-3 rounded-xl bg-[var(--color-purple-dark)] px-6 py-3 text-base font-semibold text-[var(--color-background)] shadow-sm hover:bg-[var(--color-background)] hover:text-[var(--color-purple-dark)] hover:border hover:border-[var(--color-purple-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-purple-dark)] cursor-pointer font-poppins">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-background)] bg-[var(--color-purple-dark)] group-hover:bg-[var(--color-background)] group-hover:border-[var(--color-purple-dark)]">
              <UserIcon className="h-5 w-5 text-[var(--color-background)] group-hover:text-[var(--color-purple-dark)]" />
            </span>
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
            <h2 className="text-xl font-bold text-[var(--color-purple-dark)]">
              Menu
            </h2>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-purple-dark)]"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-6">
            {navLinks.map(({ id, name, link }) => (
              <a
                key={id}
                href={link}
                onClick={closeMenu}
                className="block text-lg font-medium text-[var(--color-purple-dark)] hover:text-[var(--color-purple-dark)] hover:underline text-center transition-colors duration-200"
              >
                {name}
              </a>
            ))}

            <button className="mt-6 w-full group flex items-center justify-center gap-3 rounded-full bg-[var(--color-purple-dark)] px-6 py-3 text-base font-semibold text-[var(--color-background)] shadow-md hover:bg-[var(--color-background)] hover:text-[var(--color-purple-dark)] hover:border hover:border-[var(--color-purple-dark)] transition-all duration-200 font-poppins cursor-pointer">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-background)] bg-[var(--color-purple-dark)] group-hover:bg-[var(--color-background)] group-hover:border-[var(--color-purple-dark)] cursor-pointer">
                <UserIcon className="h-5 w-5 text-[var(--color-background)] group-hover:text-[var(--color-purple-dark)]" />
              </span>
              Se connecter
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
