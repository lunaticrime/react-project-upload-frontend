import React, { useEffect, useState, useRef } from "react";
// import { utilisateurs } from "../../../mockData/dataAccueil";
import { FaUserGraduate, FaChalkboard, FaUserCog } from "react-icons/fa"; // Updated import
import { RightToLeft } from "../utils/animate";
import { Reveal } from "../utils/Reveal";

const utilisateurs = [
  {
    id: 1,
    Icon: FaUserGraduate,
    title: "Étudiants",
    description:
      "Soumettez vos projets, suivez leur progression et apportez des modifications facilement.",
  },
  {
    id: 2,
    Icon: FaChalkboard,
    title: "Enseignants",
    description:
      "Validez, commentez et évaluez les projets pour guider vos étudiants efficacement.",
  },
  {
    id: 3,
    Icon: FaUserCog, // Changed icon to FaUserCog
    title: "Responsables",
    description:
      "Supervisez l'ensemble des projets, analysez les statistiques et exportez les données.",
  },
];

const Utilisateurs = ({ isDarkMode }) => {
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
        <Reveal width="100%" isDarkMode={isDarkMode}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
            Une plateforme pensée pour tous
          </h1>
          <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)] dark:border-blue-50" />
        </Reveal>
        <div className="pb-10"></div>
      </div>

      {/* Cards Section */}
      <Reveal isDarkMode={isDarkMode}>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {utilisateurs.map(({ id, Icon, image, title, description }) => (
            <Card id={id} Icon={Icon} title={title} description={description} />
            // <RightToLeft delay={id * 0.4}>
            //   <div
            //     key={id}
            //     className="flex flex-col items-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 w-full max-w-sm min-h-80"
            //     style={{
            //       background:
            //         "linear-gradient(to bottom, var(--color-blue-4), var(--color-blue-1))",
            //       boxShadow: `0px 4px 15px var(--color-blue-2)`,
            //     }}
            //   >
            //     {Icon ? (
            //       <Icon className="h-24 w-24 text-[var(--color-background)] mb-2 transition-transform duration-300 ease-in-out" />
            //     ) : (
            //       <img
            //         src={image}
            //         alt={title}
            //         className="h-24 w-24 object-cover mb-2 transition-transform duration-300 ease-in-out"
            //       />
            //     )}
            //     <h2 className="text-xl font-bold font-poppins text-[var(--color-background)] mb-6">
            //       {title}
            //     </h2>
            //     <p className="text-base font-inter text-[var(--color-background)] text-center">
            //       {description}
            //     </p>
            //   </div>
            // </RightToLeft>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default Utilisateurs;

const Card = ({ id, Icon, title, description }) => {
  return (
    <RightToLeft delay={id * 0.4}>
      <div className="w-full max-w-sm min-h-80 py-1 px-2 rounded-xl border-[1px] border-slate-300 relative overflow-hidden group bg-white dark:bg-blue-1-dark flex flex-col justify-center gap-2 items-center shrink-0 cursor-default">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-1 to-blue-2 dark:from-blue-50 dark:to-blue-200 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
        {/* from-violet-60 to-indigo-600 */}
        <Icon className="absolute z-10 -top-12 -right-12 text-[16rem] text-slate-100 dark:text-blue-2-dark group-hover:text-blue-2 dark:group-hover:text-blue-250 group-hover:rotate-12 transition-transform duration-300" />
        <Icon className="w-24 h-24 text-2xl text-blue-1 dark:text-blue-50 group-hover:text-white dark:group-hover:text-blue-1-dark transition-colors relative z-10 duration-300" />
        <h3 className="font-bold text-lg text-slate-950 dark:text-blue-50 group-hover:text-white dark:group-hover:text-blue-1-dark relative z-10 duration-300">
          {title}
        </h3>
        <p className="text-slate-400 dark:group-hover:text-blue-1-dark group-hover:text-blue-50 relative z-10 duration-300 text-center">
          {description}
        </p>
      </div>
    </RightToLeft>
  );
};
