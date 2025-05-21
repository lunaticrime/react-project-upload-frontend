import React, { useEffect, useState, useRef } from "react";
import { Reveal } from "../utils/Reveal";
import apropos from "../../assets/apropos.svg";
import TiltCard from "../utils/tiltCard";
const Apropos = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative pt-20 flex flex-col items-center justify-center px-6 lg:px-16 py-12 bg-[var(--color-background)] transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title Section */}
      <div className="text-center w-full">
        <Reveal width="100%" isDarkMode={isDarkMode}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl w-full font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
            Pourquoi cette plateforme ?
          </h1>
          <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)] dark:border-blue-50" />
        </Reveal>
      </div>

      {/* Content Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full mt-4 sm:mt-6">
        <div className="lg:w-1/2 mt-4 sm:mt-6 lg:mt-0 flex justify-center w-full">
          <Reveal width="100%" isDarkMode={isDarkMode}>
            {/* <img
            src="/src/assets/apropos.svg"
            alt="Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
          /> */}
            <TiltCard img={apropos} />
          </Reveal>
        </div>
        <div className="lg:w-1/2 text-center lg:text-left m-6 sm:m-8">
          <Reveal isDarkMode={isDarkMode}>
            <p className="text-base sm:text-lg lg:text-xl font-inter text-[var(--color-blue-1)] dark:text-blue-50 mb-4 sm:mb-6 lg:mb-8 tracking-wide sm:leading-normal lg:leading-relaxed text-justify">
              Les étudiants de l'ENSAK réalisent chaque année des projets dans
              le cadre de modules ou de stages. Malheureusement, ces projets
              sont rarement centralisés, ce qui empêche leur valorisation, leur
              consultation ou leur suivi.
            </p>
          </Reveal>
          <Reveal isDarkMode={isDarkMode}>
            <p className="text-base sm:text-lg lg:text-xl font-inter text-[var(--color-blue-1)] dark:text-blue-50 mb-4 sm:mb-6 lg:mb-8 tracking-wide sm:leading-normal lg:leading-relaxed text-justify">
              Cette plateforme offre une solution simple et efficace pour les
              étudiants, les enseignants et les responsables de filière.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Apropos;
