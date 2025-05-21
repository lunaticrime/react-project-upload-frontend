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
      id="apropos"
      ref={sectionRef}
      className={`scroll-mt-10 relative pt-10 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12 bg-[var(--color-background)] transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title Section */}
      <div className="text-center w-full">
        <Reveal width="100%" isDarkMode={isDarkMode}>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-3 sm:mb-4 leading-snug tracking-wide">
            Pourquoi cette plateforme ?
          </h1>
          <hr className="w-4/5 mx-auto mb-6 sm:mb-10 border-t-2 border-[var(--color-blue-1)] dark:border-blue-50" />
        </Reveal>
      </div>

      {/* Content Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full mt-2 sm:mt-4">
        <div className="w-full lg:w-1/2 mt-4 sm:mt-6 lg:mt-0 flex justify-center items-center">
          <Reveal width="100%" isDarkMode={isDarkMode}>
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out hidden xl:block">
              <TiltCard img={apropos} />
            </div>
          </Reveal>
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left m-4 sm:m-8">
          <Reveal isDarkMode={isDarkMode}>
            <p className="text-xs sm:text-base md:text-lg xl:text-xl font-inter text-[var(--color-blue-1)] dark:text-blue-50 mb-3 sm:mb-6 tracking-wide leading-normal text-center lg:text-left">
              Les étudiants de l'ENSAK réalisent chaque année des projets dans
              le cadre de modules ou de stages. Malheureusement, ces projets
              sont rarement centralisés, ce qui empêche leur valorisation, leur
              consultation ou leur suivi.
            </p>
          </Reveal>
          <Reveal isDarkMode={isDarkMode}>
            <p className="text-xs sm:text-base md:text-lg xl:text-xl font-inter text-[var(--color-blue-1)] dark:text-blue-50 mb-3 sm:mb-6 tracking-wide leading-normal text-center lg:text-left">
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
