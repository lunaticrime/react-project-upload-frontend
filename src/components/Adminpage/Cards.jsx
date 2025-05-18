import React from "react";
// import { adminCardsData } from "../../../mockData/dataEspaceAdmin";
const adminCardsData = [
  { id: 1, title: "Total des projets soumis", count: 120 },
  { id: 2, title: "Nombre d'étudiants actifs", count: 300 },
  { id: 3, title: "Nombre d'enseignants actifs", count: 50 },
  { id: 4, title: "Projets soumis cette année", count: 25 },
];
const Cards = () => {
  return (
    <div className="mb-20 flex flex-wrap justify-center gap-20 w-full p-4">
      {adminCardsData.map(({ id, title, count }) => (
        <div
          key={id}
          className="flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full max-w-xs"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-blue-4), var(--color-blue-1))",
            boxShadow: `0px 4px 10px var(--color-blue-2)`,
          }}
        >
          <h2
            className={`${
              title === "Nombre d'enseignants impliqués" ? "text-lg" : "text-xl"
            } font-bold font-poppins text-center text-[var(--color-background)] mb-2`}
          >
            {title}
          </h2>
          <p className="text-3xl font-bold font-poppins text-center text-[var(--color-background)]">
            {count}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
