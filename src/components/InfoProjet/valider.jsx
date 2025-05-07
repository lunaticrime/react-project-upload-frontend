import React from "react";
import { filterData } from "../../../mockData/dataEspaceProf";

export default function Valider({ statusValue = "pending", submissionDate = "2025-05-07" }) {
  const statusItem = filterData.status.find((item) => item.value === statusValue);

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 pb-12 bg-[var(--color-background)] font-poppins text-[var(--color-purple-dark)]">
      <h1 className="py-6 sm:py-8 text-left text-lg sm:text-xl md:text-2xl mb-6 underline">
        Validation du Projet
      </h1>

      {/* Section statut et date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10 text-sm sm:text-base md:text-lg font-medium mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
          <p className="min-w-[10rem]">🕒 <strong>Statut Actuel</strong></p>
          <p className="pl-1 sm:pl-2">{statusItem ? statusItem.label : "Inconnu"}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
          <p className="min-w-[10rem]">📅 <strong>Soumis le</strong></p>
          <p className="pl-1 sm:pl-2">{submissionDate}</p>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 mt-6">
        {statusValue === "pending" ? (
          <>
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-[var(--color-purple-dark)] px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-[var(--color-background)] shadow-md hover:bg-[var(--color-background)] hover:text-[var(--color-purple-dark)] hover:border hover:border-[var(--color-purple-dark)] transition-all duration-200 cursor-pointer">
              ✅ Valider
            </button>
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-[var(--color-purple-dark)] px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-[var(--color-background)] shadow-md hover:bg-[var(--color-background)] hover:text-[var(--color-purple-dark)] hover:border hover:border-[var(--color-purple-dark)] transition-all duration-200 cursor-pointer">
              ❌ Refuser
            </button>
          </>
        ) : (
          <button
            disabled
            className="rounded-xl px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-500 bg-gray-200 cursor-not-allowed"
          >
            Aucune action disponible pour ce statut
          </button>
        )}
      </div>
    </div>
  );
}
