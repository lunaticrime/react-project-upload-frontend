import React, { useEffect, useState, useRef } from "react";
import { utilisateurs } from "../../../mockData/dataAccueil";
import { FaUserGraduate, FaChalkboard, FaUserCog } from "react-icons/fa"; // Updated import

const Utilisateurs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col items-center justify-center px-6 lg:px-16 py-12 bg-[var(--color-background)] transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title Section */}
      <div className="text-center w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Une plateforme pensée pour tous
        </h1>
        <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)]" />
        <div className="pb-10"></div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {utilisateurs.map(({ id, Icon, image, title, description }) => (
          <div
            key={id}
            className="flex flex-col items-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 w-full max-w-sm"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-blue-4), var(--color-blue-1))",
              boxShadow: `0px 4px 15px var(--color-blue-2)`,
            }}
          >
            {Icon ? (
              <Icon className="h-24 w-24 text-[var(--color-background)] mb-2 transition-transform duration-300 ease-in-out" />
            ) : (
              <img
                src={image}
                alt={title}
                className="h-24 w-24 object-cover mb-2 transition-transform duration-300 ease-in-out"
              />
            )}
            <h2 className="text-xl font-bold font-poppins text-[var(--color-background)] mb-6">
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
