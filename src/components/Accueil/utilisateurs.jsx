import React from "react";
import { utilisateurs } from "../../../mockData/data";

const Utilisateurs = () => {
  return (
    <div
      id="utilisateurs"
      className="flex flex-col items-center justify-center px-6 lg:px-16 py-12 bg-[var(--color-background)]"
    >
      {/* Title Section */}
      <div className="text-center w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-purple-dark)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Une plateforme pensée pour tous
        </h1>
        <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-purple-dark)]" />
        <div className="pb-10"></div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {utilisateurs.map(({ id, image, title, description }) => (
          <div
            key={id}
            className="flex flex-col items-center p-6 bg-[var(--color-purple-dark)] rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 w-full max-w-sm"
            style={{
              boxShadow: `0px 4px 15px var(--color-purple-dark-reflect)`,
            }}
          >
            <img src={image} alt={title} className="h-24 object-cover mb-2" />{" "}
            {/* Reduced margin-bottom */}
            <h2 className="text-xl font-bold font-poppins text-[var(--color-purple-pale)] mb-6">
              {title}
            </h2>
            <p className="text-base font-inter text-[var(--color-background)] text-center">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Utilisateurs;
