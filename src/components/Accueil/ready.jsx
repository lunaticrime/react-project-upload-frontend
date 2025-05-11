import React, { useEffect, useState, useRef } from "react";

const Ready = () => {
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
      className={`mt-30 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-[var(--color-background)] gap-10 sm:gap-20 lg:gap-40 transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <img
          src="/src/assets/ready.svg"
          alt="Illustration"
          className="w-3/4 sm:w-2/3 lg:w-full object-contain transition-transform duration-300 ease-in-out"
        />
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Prêt à mettre en valeur vos projets ?
        </h1>
        <button className="mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] font-semibold rounded-full shadow-md hover:opacity-90 hover:translate-y-[-3px] hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer font-poppins uppercase">
          Commencer maintenant
        </button>
        <p className="mt-4 text-sm sm:text-base text-[var(--color-blue-1)] font-inter italic max-w-md mx-auto lg:mx-0">
          Découvrez une plateforme intuitive pour gérer vos projets académiques
          en toute simplicité.
        </p>
      </div>
    </div>
  );
};

export default Ready;
