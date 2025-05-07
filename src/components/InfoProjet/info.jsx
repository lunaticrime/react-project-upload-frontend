import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InfoProjet() {

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12 bg-[var(--color-background)]">
      {/* Bouton Retour */}
      <button
        onClick={() => navigate("/dashboard")}
        className="group inline-flex items-center gap-2 sm:gap-3 mb-6 rounded-2xl bg-[var(--color-purple-dark)] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-[var(--color-background)] shadow-md hover:bg-[var(--color-background)] hover:text-[var(--color-purple-dark)] hover:border hover:border-[var(--color-purple-dark)] transition-all duration-300 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
        Retourner au Dashboard
      </button>

      {/* Titre */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-poppins text-[var(--color-purple-dark)] mb-6 underline">
        Informations Du Projet
      </h1>

      {/* Détails du projet */}
      <div className="text-sm sm:text-base md:text-lg font-medium font-poppins text-[var(--color-purple-dark)] space-y-4">
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">📌 <strong>Titre</strong></p>
          <p><span className="hidden sm:inline">:</span> Système de gestion des absences</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">🧾 <strong>Description</strong></p>
          <p><span className="hidden sm:inline">:</span> Application web permettant de suivre les absences des étudiants.</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">📂 <strong>Type</strong></p>
          <p><span className="hidden sm:inline">:</span> Projet de module</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">📅 <strong>Année</strong></p>
          <p><span className="hidden sm:inline">:</span> 2024–2025</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">📥 <strong>Fichiers</strong></p>
          <p><span className="hidden sm:inline">:</span></p>
        </div>
        <div>
          <ul className="ml-6 sm:ml-20 list-disc">
            <li>
              rapport_final.pdf
              <a
                href="/path/to/rapport_final.pdf"
                className="text-[var(--color-purple-dark)] underline ml-2 hover:text-[var(--color-purple-light)]"
              >
                [Télécharger]
              </a>
            </li>
            <li>
              source_code.zip
              <a
                href="/path/to/source_code.zip"
                className="text-[var(--color-purple-dark)] underline ml-2 hover:text-[var(--color-purple-light)]"
              >
                [Télécharger]
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
