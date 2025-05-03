"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon, // Import the user icon
} from "@heroicons/react/24/outline";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSliding, setIsSliding] = useState(false); // State for sliding animation
  const [activeLink, setActiveLink] = useState("Accueil"); // State to track active link

  const openMenu = () => {
    setMobileMenuOpen(true); // Open menu immediately
    setIsSliding(true); // Start sliding animation
    setTimeout(() => setIsSliding(false), 300); // Reset sliding state after animation
  };

  const closeMenu = () => {
    setIsSliding(true); // Start sliding animation
    setTimeout(() => {
      setMobileMenuOpen(false); // Close menu after animation
      setIsSliding(false); // Reset sliding state
    }, 300); // Match the duration of the CSS transition
  };

  return (
    <header className="bg-[#f2f5ff]">
      {" "}
      {/* Updated background color */}
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://ensa.uit.ac.ma/wp-content/uploads/2024/12/cropped-logobleuhori-600x145.png" // Updated image source
              className="h-15 w-auto"
            />
          </a>
          <div className="h-15 w-px bg-[#51508b] mx-15 hidden lg:block"></div>{" "}
          {/* Vertical line hidden on small screens */}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={openMenu} // Use openMenu function
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:mx-auto">
          {" "}
          {/* Added lg:mx-auto to center the block */}
          {["Accueil", "Fonctionnalités", "À propos", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setActiveLink(link)} // Set active link on click
              className={`relative text-sm/6 font-semibold text-[#51508b] transition-all duration-300 ${
                activeLink === link ? "after:scale-x-100" : "after:scale-x-0"
              } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#3e3d6b] after:origin-left after:transition-transform after:duration-300`}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button className="group flex items-center gap-3 rounded-xl bg-[#51508b] px-4 py-2 text-sm font-semibold text-[#f2f5ff] shadow-sm hover:bg-[#f2f5ff] hover:text-[#51508b] hover:border hover:border-[#51508b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#51508b] cursor-pointer">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#f2f5ff] bg-[#3e3d6b] group-hover:bg-[#f2f5ff] group-hover:border-[#3e3d6b]">
              <UserIcon className="h-4 w-4 text-[#f2f5ff] group-hover:text-[#51508b]" />{" "}
              {/* Icon changes with button hover */}
            </span>
            Se connecter
          </button>
        </div>
      </nav>
      <div className="mx-auto mt-2 w-[95%] border-t border-[#51508b]"></div>{" "}
      {/* Updated horizontal line color */}
      <Dialog
        open={mobileMenuOpen}
        onClose={closeMenu} // Use closeMenu function
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel
          className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transform transition-transform duration-300 ${
            mobileMenuOpen && !isSliding ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <button className="group flex items-center gap-3 rounded-xl bg-[#51508b] px-4 py-2 text-sm font-semibold text-[#f2f5ff] shadow-sm hover:bg-[#f2f5ff] hover:text-[#51508b] hover:border hover:border-[#51508b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#51508b] cursor-pointer">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#f2f5ff] bg-[#3e3d6b] group-hover:bg-[#f2f5ff] group-hover:border-[#3e3d6b]">
                <UserIcon className="h-4 w-4 text-[#f2f5ff] group-hover:text-[#51508b]" />
              </span>
              Se connecter
            </button>
            <button
              type="button"
              onClick={closeMenu} // Use closeMenu function
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                  style={{ color: "#51508b" }}
                >
                  Accueil
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                  style={{ color: "#51508b" }}
                >
                  Fonctionnalités
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                  style={{ color: "#51508b" }}
                >
                  À propos
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                  style={{ color: "#51508b" }}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
