import TiltCard from "../utils/tiltCard";
import { motion } from "motion/react";

import adminImg from "/src/assets/Admin.svg";
import BackToTop from "../utils/BackToTop";
import { Reveal } from "../utils/Reveal";
// import SliderToggle from "../SliderToggle";

export default function Bienvenue({ isDarkMode, setIsDarkMode }) {
  return (
    <div className={`${isDarkMode ? "dark" : ""} `}>
      {/* <SliderToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />   */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between justify-center px-6 lg:px-16 py-12 bg-blue-50 gap-10 h-screen dark:bg-blue-2-dark">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left flex flex-col justify- ">
          <Reveal isDarkMode={isDarkMode}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-10 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
              Welcome to your Admin Space -{" "}
              <span className="relative">
                Program Director{" "}
                <svg
                  viewBox="0 0 286 73"
                  fill="none"
                  className="absolute -left-0 -right-0 -top-1 bottom-0 -translate-y-8"
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
                    strokeWidth="4"
                    className="z-10"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>
          <Reveal isDarkMode={isDarkMode} width="100%">
            <p className="text-sm sm:text-base lg:text-lg font-inter text-[var(--color-blue-1)] dark:text-blue-50 mb-6 sm:mb-8 lg:mb-10 tracking-wide sm:leading-snug lg:leading-normal">
              Access a comprehensive overview of projects, manage users, and
              easily export data useful for educational supervision.
            </p>
          </Reveal>
          <Reveal isDarkMode={isDarkMode} width="100%">
            <button
              className="reverse-default-btn lg:self-start self-center"
              onClick={() => {
                const dashboardElement = document.getElementById("dashboard");
                if (dashboardElement) {
                  const offset = 80; // 100px margin from top
                  const elementPosition =
                    dashboardElement.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Get Started
            </button>
          </Reveal>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 mt-6 sm:mt-8 lg:mt-0 lg:flex justify-center w-4/5">
          <Reveal isDarkMode={isDarkMode} width="100%">
            {/* <img
            src="/src/assets/Admin.svg"
            alt="Illustration"
            className="w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
          /> */}
            <TiltCard img={adminImg} />
          </Reveal>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
