export default function DashBord() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-12 bg-[var(--color-background)] gap-6 sm:gap-12 lg:gap-20 xl:gap-40">
      {/* Left Section - Title */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Bienvenue sur votre Espace Encadrant - Enseignant
        </h1>
      </div>

      {/* Right Section - Description */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <ul className="list-disc list-inside text-xs sm:text-sm lg:text-lg font-inter text-[var(--color-blue-1)] space-y-1 sm:space-y-2 lg:space-y-4 tracking-wide sm:leading-snug lg:leading-normal">
          <li>Accédez aux détails du projet.</li>
          <li>Téléchargez les fichiers.</li>
          <li>Laissez une remarque.</li>
          <li>Attribuez une note.</li>
          <li>Validez ou refusez la soumission.</li>
        </ul>
      </div>
    </div>
  );
}
