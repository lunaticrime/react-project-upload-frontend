import { motion } from "motion/react";
import { Reveal } from "../utils/Reveal";
import TiltCard from "../utils/tiltCard";
import accueilImg from "../../assets/Accueil1.svg";
import RotatingWord from "../utils/RotatingWord";
export default function Accueil({ isDarkMode }) {
  return (
    <div
      id="accueil"
      className="scroll-mt-28 min-h-[60vh] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-8 sm:py-12 bg-[var(--color-background)] gap-8"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <Reveal isDarkMode={isDarkMode}>
          <div className="py-3 sm:py-5">
            <h1 className="text-xl sm:text-2xl md:text-4xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-3 sm:mb-4 leading-snug md:leading-normal xl:leading-20 tracking-wide">
              Plateforme de gestion des projets étudiants{" "}
              <span className="relative">
                ENSAK{" "}
                <svg
                  viewBox="0 0 286 73"
                  fill="none"
                  className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-2 hidden xl:block"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      delay: 0.5,
                      duration: 1.25,
                      ease: "easeInOut",
                    }}
                    d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                    stroke={isDarkMode ? "#1976c9" : "#75b1ff"}
                    strokeWidth="8"
                    className="z-10"
                  />
                </svg>
              </span>{" "}
            </h1>
          </div>
        </Reveal>
        <Reveal isDarkMode={isDarkMode}>
          <p className="text-xs sm:text-base md:text-lg xl:text-2xl font-inter text-[var(--color-blue-1)] dark:text-slate-400 mb-4 sm:mb-6 md:mb-8 tracking-wide leading-snug md:leading-normal">
            Gérez vos projets académiques en un seul endroit et
            <RotatingWord />
          </p>
        </Reveal>
        <Reveal isDarkMode={isDarkMode}>
          <div className="py-3 sm:py-5 flex justify-center lg:justify-start">
            <button className="reverse-default-btn text-xs sm:text-base md:text-lg xl:text-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              Accédez à votre espace
            </button>
          </div>
        </Reveal>
      </div>

      {/* Right Section (image) */}
      <div className="w-full lg:w-1/2 mt-4 sm:mt-8 lg:mt-0 flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out hidden xl:block">
            <TiltCard img={accueilImg} />
          </div>
        </div>
      </div>
    </div>
  );
}
