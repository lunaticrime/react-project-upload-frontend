export default function Bienvenue() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-[var(--color-background)] gap-10">
      {/* Left Section */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-10 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Bienvenue sur votre Espace Admin - Responsable Filière
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-inter text-[var(--color-blue-1)] mb-6 sm:mb-8 lg:mb-10 tracking-wide sm:leading-snug lg:leading-normal">
          Accédez à une vue d’ensemble complète sur les projets, gérez les
          utilisateurs, et exportez facilement les données utiles à la
          supervision pédagogique.
        </p>
        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] font-semibold rounded-full shadow-md hover:opacity-90 hover:translate-y-[-3px] hover:shadow-lg transition-all duration-200 cursor-pointer font-poppins uppercase">
          Prêt à Commencer
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 mt-6 sm:mt-8 lg:mt-0 flex justify-center">
        <img
          src="/src/assets/Admin.svg"
          alt="Illustration"
          className="w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}
