import { motion } from "motion/react";
import { Reveal } from "../utils/Reveal";
import TiltCard from "../utils/tiltCard";
import accueilImg from "../../assets/Accueil1.svg";
import RotatingWord from "../utils/RotatingWord";
import { useNavigate } from "react-router-dom";
export default function Accueil({ isDarkMode }) {
  const navigate = useNavigate();
  return (
    <div className="h-[calc(100vh-108px)] flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-[var(--color-background)] gap-10">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left my-auto flex-col items-center justify-center">
        <Reveal isDarkMode={isDarkMode}>
          <div className="py-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide overflow-visible">
              Student Project Management Platform{" "}
              <span className="relative">
                ENSAK{" "}
                <svg
                  viewBox="0 0 286 73"
                  fill="none"
                  className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-2"
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
        <Reveal isDarkMode={isDarkMode} width="100%">
          <p className="text-sm sm:text-base lg:text-[22px] font-inter text-[var(--color-blue-1)] dark:text-blue-200 mb-6 sm:mb-8 lg:mb-10 tracking-wide sm:leading-snug lg:leading-normal">
            Manage your academic projects in one place and
            <RotatingWord />
          </p>
        </Reveal>
        <Reveal isDarkMode={isDarkMode} width="100%">
          <div className="py-5">
            <button
              className="reverse-default-btn"
              onClick={() => navigate("/login")}
            >
              Access your space
            </button>
          </div>
        </Reveal>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 mt-6 sm:mt-8 lg:mt-0 lg:flex justify-center w-full ">
        {/* <img
          src="/src/assets/Accueil1.svg"
          alt="Illustration"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
        /> */}
        <TiltCard img={accueilImg} />
      </div>
    </div>
  );
}
