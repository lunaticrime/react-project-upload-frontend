import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const ResponsiveMenu = ({ open = false }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-[108px] left-0 w-full h-[calc(100vh-108px)] z-10 bg-gray-900/50 backdrop-blur-md flex justify-center items-center"
        >
          <div className="text-xl font-semibold capitalize bg-blue-1 text-white py-10 m-6 rounded-xl w-5xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1 ">
                Accueil
              </li>
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1">
                À propos
              </li>
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1">
                Services
              </li>
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1">
                Contact
              </li>
              <li className="flex items-center gap-2">
                <button className=" text-2xl rounded-full p-2 duration-200 sm:hidden">
                  <FaLinkedin />
                </button>
                <button className="text-2xl rounded-full p-2 duration-200 sm:hidden">
                  <FaInstagram />
                </button>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
