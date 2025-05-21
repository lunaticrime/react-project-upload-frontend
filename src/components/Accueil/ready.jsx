import React, { useEffect, useState, useRef } from "react";
import { Reveal } from "../utils/Reveal";
import ready from "../../assets/ready.svg";
import TiltCard from "../utils/tiltCard";
const Ready = ({ isDarkMode }) => {
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
      id="footer"
      ref={sectionRef}
      className={`scroll-mt-28 mt-10 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-8 sm:py-12 bg-[var(--color-background)] gap-8 transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mb-4 sm:mb-6">
        <Reveal width="100%" isDarkMode={isDarkMode}>
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out hidden xl:block">
              <TiltCard img={ready} />
            </div>
          </div>
        </Reveal>
      </div>
      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <Reveal isDarkMode={isDarkMode}>
          <h1 className="text-xl sm:text-2xl md:text-4xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-3 sm:mb-4 leading-snug tracking-wide">
            Prêt à mettre en valeur vos projets ?
          </h1>
        </Reveal>
        <Reveal isDarkMode={isDarkMode}>
          <div className="flex justify-center lg:justify-start w-full">
            <button className="reverse-default-btn my-2 text-xs sm:text-base md:text-lg xl:text-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              Commencer maintenant
            </button>
          </div>
          <p className="mt-3 text-xs sm:text-base md:text-lg xl:text-xl text-[var(--color-blue-1)] dark:text-blue-50 font-inter italic max-w-md mx-auto lg:mx-0">
            Découvrez une plateforme intuitive pour gérer vos projets
            académiques en toute simplicité.
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default Ready;
