import React from "react";

const Ready = () => {
  return (
    <div className="mt-30 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-[var(--color-background)] gap-10 sm:gap-20 lg:gap-40">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <img
          src="/src/assets/ready.svg"
          alt="Illustration"
          className="w-3/4 sm:w-2/3 lg:w-full object-contain"
        />
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-purple-dark)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Prêt à mettre en valeur vos projets ?
        </h1>
        <button className="mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--color-purple-light)] text-[var(--color-background)] font-semibold rounded-full shadow-md hover:bg-[var(--color-background)] hover:text-[var(--color-purple-light)] hover:border hover:border-[var(--color-purple-light)] transition-all duration-200 cursor-pointer font-poppins uppercase">
          Commencer maintenant
        </button>
        <p className="mt-4 text-sm sm:text-base text-[var(--color-purple-dark)] font-inter italic max-w-md mx-auto lg:mx-0">
          Découvrez une plateforme intuitive pour gérer vos projets académiques
          en toute simplicité.
        </p>
      </div>
    </div>
  );
};

export default Ready;
