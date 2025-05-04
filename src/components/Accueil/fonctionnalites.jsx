import React from "react";
import { features } from "../../../mockData/dataAccueil";

const Fonctionnalites = () => {
  return (
    <div
      id="fonctionnalites"
      className="flex flex-col items-center justify-center px-6 lg:px-16 py-12 bg-[var(--color-background)] pt-20"
    >
      {/* Title Section */}
      <div className="text-center w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-purple-dark)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Fonctionnalités clés
        </h1>
        <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-purple-dark)]" />
        <div className="pt-10">
          {/* Features Section */}
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {features.map(({ id, icon, title, description }) => (
              <div
                key={id}
                className="flex flex-col items-start p-6 bg-[var(--color-purple-dark)] rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 w-full max-w-sm"
                style={{
                  boxShadow: `0px 4px 15px var(--color-purple-dark-reflect)`,
                }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4 text-[var(--color-background)]">
                    {icon}
                  </span>
                  <h2 className="text-2xl font-bold font-poppins text-[var(--color-purple-pale)]">
                    {title}
                  </h2>
                </div>
                <p className="text-lg font-inter text-[var(--color-background)] text-justify">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fonctionnalites;
