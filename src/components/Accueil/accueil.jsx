export default function Accueil() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-[var(--color-background)]">
      {/* Left Section */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-purple-dark)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Plateforme de gestion des projets étudiants - ENSAK
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-inter text-[var(--color-purple-dark)] mb-6 sm:mb-8 lg:mb-10 tracking-wide sm:leading-snug lg:leading-normal">
          Centralisez, valorisez et partagez vos projets académiques en un seul
          endroit.
        </p>
        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[var(--color-purple-light)] text-[var(--color-background)] font-semibold rounded-full shadow-md hover:bg-[var(--color-background)] hover:text-[var(--color-purple-light)] hover:border hover:border-[var(--color-purple-light)] transition-all duration-200 cursor-pointer font-poppins">
          Accéder à votre espace
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 mt-6 sm:mt-8 lg:mt-0 flex justify-center">
        <img
          src="/src/assets/Accueil1.svg"
          alt="Illustration"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
