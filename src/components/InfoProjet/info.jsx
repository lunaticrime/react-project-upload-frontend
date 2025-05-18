import React from "react";

export default function Info({ projectName, description, type, year, files }) {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12 bg-[var(--color-background)]">
      <h1 className="text-lg sm:text-xl md:text-2xl font-poppins text-[var(--color-blue-1)] mb-6 underline">
        Informations Du Projet
      </h1>
      <div className="text-sm sm:text-base md:text-lg font-medium font-poppins text-[var(--color-blue-1)] space-y-4">
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📌 <strong>Titre</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {projectName}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            🧾 <strong>Description</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📂 <strong>Type</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {type}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📅 <strong>Année</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {year}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📥 <strong>Fichiers</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span>
          </p>
        </div>
        <div>
          <ul className="ml-6 sm:ml-20 list-disc">
            {files.map((file, index) => (
              <li key={index}>
                {file.name}
                <a
                  href={file.link}
                  className="text-[var(--color-blue-1)] underline ml-2 hover:text-[var(--color-blue-3)]"
                >
                  [Télécharger]
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
