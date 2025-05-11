import React, { useEffect, useState, useRef } from "react";

const Apropos = () => {
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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Pourquoi cette plateforme ?
        </h1>
        <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)]" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full mt-4 sm:mt-6">
        <div className="lg:w-1/2 mt-4 sm:mt-6 lg:mt-0 flex justify-center">
          <img
            src="/src/assets/apropos.svg"
            alt="Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left m-6 sm:m-8">
          <p className="text-base sm:text-lg lg:text-xl font-inter text-[var(--color-blue-1)] mb-4 sm:mb-6 lg:mb-8 tracking-wide sm:leading-normal lg:leading-relaxed text-justify">
            Les étudiants de l'ENSAK réalisent chaque année des projets dans le
            cadre de modules ou de stages. Malheureusement, ces projets sont
            rarement centralisés, ce qui empêche leur valorisation, leur
            consultation ou leur suivi. <br /> <br /> Cette plateforme offre une
            solution simple et efficace pour les étudiants, les enseignants et
            les responsables de filière.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Apropos;
