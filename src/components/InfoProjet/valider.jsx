import React from "react";
import { filterData } from "../../mockData/dataEspaceProf";

export default function Valider({ statusValue, submissionDate }) {
  const statusItem = filterData.status.find(
    (item) => item.value === statusValue
  );

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 pb-12 bg-blue-50 dark:bg-blue-2-dark font-poppins text-blue-1 dark:text-blue-50">
      <h1 className="py-6 sm:py-8 text-left text-lg sm:text-xl md:text-2xl mb-6 underline">
        Validation du Projet
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10 text-sm sm:text-base md:text-lg font-medium mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
          <p className="min-w-[10rem]">
            🕒 <strong>Statut Actuel</strong>
          </p>
          <p className="pl-1 sm:pl-2">
            {statusItem ? statusItem.label : "Inconnu"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
          <p className="min-w-[10rem]">
            📅 <strong>Soumis le</strong>
          </p>
          <p className="pl-1 sm:pl-2">{submissionDate}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 mt-6">
        {statusValue === "pending" ? (
          <>
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-blue-1 dark:bg-blue-50 px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white dark:text-blue-1 shadow-md hover:bg-white dark:hover:bg-blue-1 hover:text-blue-1 dark:hover:text-blue-50 border hover:border-blue-1 dark:hover:border-blue-50 transition-all duration-200 cursor-pointer">
              ✅ Valider
            </button>
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-blue-1 dark:bg-blue-50 px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white dark:text-blue-1 shadow-md hover:bg-white dark:hover:bg-blue-1 hover:text-blue-1 dark:hover:text-blue-50 border hover:border-blue-1 dark:hover:border-blue-50 transition-all duration-200 cursor-pointer">
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
