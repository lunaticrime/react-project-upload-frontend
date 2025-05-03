import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IconUserCircle } from "@tabler/icons-react";

const ResponsiveMenu = ({ open = false }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-[108px] left-0 w-full h-[calc(100vh-108px)] z-10 bg-gray-900/50 backdrop-blur-md flex justify-center items-center"
        >
          <div className="text-xl font-semibold capitalize bg-blue-1 dark:bg-blue-1-dark text-white py-10 m-6 rounded-xl w-5xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li className="text-blue-50 font-semiblond flex text-center gap-2 justify-between rounded-md px-6 py-2 duration-200 border-2 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark">
                <IconUserCircle stroke={2} className="self-center" />
                <div>Se connecter</div>
              </li>
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1 dark:border-blue-2-dark dark:hover:bg-blue-2-dark hover:cursor-pointer">
                Accueil
              </li>
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1 dark:border-blue-2-dark dark:hover:bg-blue-2-dark hover:cursor-pointer">
                À propos
              </li>
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1 dark:border-blue-2-dark dark:hover:bg-blue-2-dark hover:cursor-pointer">
                Services
              </li>
              <li className="py-2 px-24 hover:bg-blue-2 hover:text-white border-blue-2 border-b-1 dark:border-blue-2-dark dark:hover:bg-blue-2-dark hover:cursor-pointer">
                Contact
              </li>
              <li className="flex items-center gap-2">
                <button className=" text-2xl rounded-full p-2 duration-200 sm:hidden ">
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
