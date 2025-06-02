import React from "react";
import { Reveal } from "../utils/Reveal";
// import { adminCardsData } from "../../../mockData/dataEspaceAdmin";
const adminCardsData = [
  { id: 1, title: "Total Submitted Projects", count: 120 },
  { id: 2, title: "Number of Active Students", count: 300 },
  { id: 3, title: "Number of Active Teachers", count: 50 },
  { id: 4, title: "Projects Submitted This Year", count: 25 },
];

const Cards = ({ isDarkMode }) => {
  const getBorderColor = (id) => {
    switch (id) {
      case 1:
        return "border-red-500";
      case 2:
        return "border-green-500";
      case 3:
        return "border-purple-500";
      case 4:
        return "border-orange-500";
      default:
        return "border-blue-500";
    }
  };

  return (
    <>
      <Reveal isDarkMode={isDarkMode} width="100%">
        <div className="mb-20 flex flex-wrap justify-center gap-10 w-full p-4">
          {adminCardsData.map(({ id, title, count }) => (
            <div
              key={id}
              className={`flex flex-col bg-white dark:bg-blue-3 border-t-6 ${getBorderColor(
                id
              )} items-center p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full max-w-xs cursor-pointer`}
            >
              <h2
                className={`${
                  title === "Number of Active Teachers" ? "text-lg" : "text-xl"
                } font-bold font-poppins text-center text-[var(--color-background)] dark:text-blue-50 mb-2`}
              >
                {title}
              </h2>
              <p className="text-3xl font-bold font-poppins text-center text-[var(--color-background)] dark:text-blue-50">
                {count}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
};

export default Cards;
