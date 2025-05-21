import React, { useEffect, useState, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

import { Reveal } from "../utils/Reveal";
// import { features } from "../../../mockData/dataAccueil";
// import {
//   DocumentIcon,
//   MagnifyingGlassIcon,
//   ChartBarIcon,
//   ChatBubbleLeftRightIcon,
//   BookOpenIcon,
// } from "@heroicons/react/24/outline";
import { FiUser } from "react-icons/fi";
import { LeftToRight } from "../utils/animate";
const getIconById = (id) => {
  switch (id) {
    case 1:
      return (
        <FiUser className="h-10 w-10 text-[var(--color-background)] mr-4" />
      );
    case 2:
      return (
        <FiUser className="h-10 w-10 text-[var(--color-background)] mr-4" />
      );
    case 3:
      return (
        <FiUser className="h-10 w-10 text-[var(--color-background)] mr-4" />
      );
    case 4:
      return (
        <FiUser className="h-10 w-10 text-[var(--color-background)] mr-4" />
      );
    case 5:
      return (
        <FiUser className="h-10 w-10 text-[var(--color-background)] mr-4" />
      );
    default:
      return null;
  }
};
const features = [
  {
    id: 1,
    title: "Soumission de projet",
    description:
      "Soumettez facilement vos projets académiques pour centralisation.",
  },
  {
    id: 2,
    title: "Suivi & Validation",
    description:
      "Suivez l'état de vos projets et obtenez des validations rapidement.",
  },
  {
    id: 3,
    title: "Statistiques",
    description:
      "Analysez les données des projets grâce à des statistiques détaillées.",
  },
  {
    id: 4,
    title: "Commentaires & notes",
    description:
      "Recevez des commentaires et des notes pour améliorer vos projets.",
  },
  {
    id: 5,
    title: "Archives consultables",
    description:
      "Accédez aux archives des projets pour consultation et inspiration.",
  },
];
const Fonctionnalites = ({ isDarkMode }) => {
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
      className={`flex flex-col items-center justify-center px-6 lg:px-16 py-12 bg-[var(--color-background)] pt-20 transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title Section */}
      <div className="text-center w-full">
        <Reveal width="100%" isDarkMode={isDarkMode}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl w-full font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
            Fonctionnalités clés
          </h1>
          <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)] dark:border-blue-50" />
        </Reveal>
        <Reveal isDarkMode={isDarkMode}>
          <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)]" />
        </Reveal>
        <Reveal isDarkMode={isDarkMode}>
          <div className="pt-10">
            {/* Features Section */}
            <div className="flex flex-wrap justify-center gap-4 w-full p-5">
              {features.map(({ id, title, description }) => (
                // <div
                //   key={id}
                //   className="flex flex-col items-start p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out w-full max-w-sm"
                //   style={{
                //     background:
                //       "linear-gradient(to bottom, var(--color-blue-4), var(--color-blue-1))",
                //     boxShadow: `0px 4px 15px var(--color-blue-2)`,
                //   }}
                // >
                //   <div className="flex items-center mb-4">
                //     {getIconById(id)}
                //     <h2 className="text-2xl font-bold font-poppins text-[var(--color-background)]">
                //       {title}
                //     </h2>
                //   </div>
                //   <p className="text-lg font-inter text-[var(--color-background)] text-justify">
                //     {description}
                //   </p>
                // </div>
                <LeftToRight delay={(6 - id) * 0.4}>
                  <Card
                    id={id}
                    title={title}
                    description={description}
                    isDarkMode={isDarkMode}
                  />
                </LeftToRight>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Fonctionnalites;

const Card = ({ id, title, description, isDarkMode }) => {
  return (
    <motion.div
      key={id}
      whileHover="hover"
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
          duration: 0.5,
        },
      }}
      className={`relative h-80 w-full max-w-[15rem] shrink-0 overflow-hidden rounded-2xl ${
        isDarkMode ? "bg-blue-1-dark" : "bg-blue-1"
      } p-8 cursor-default`}
    >
      <div className="relative z-10 text-blue-50 flex flex-col justify-around h-full">
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className=" my-2 block origin-top-left font-mono text-2xl font-black leading-[1.2]"
        >
          {getIconById(id)}
          {title}
        </motion.span>
        <p className="text-lg font-inter text-justify">{description}</p>
      </div>
      <Background isDarkMode={isDarkMode} />
    </motion.div>
  );
};
const Background = ({ isDarkMode }) => {
  return (
    <motion.svg
      width="256"
      height="320"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 0.5,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.75,
            y: -25,
            scaleX: 2.5,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
          // delay: 0.2,
        }}
        cx="250" //160.5
        cy="90" //114.5
        r="120" //101.5
        fill={isDarkMode ? "#104070" : "#1976c9"}
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
            scaleX: 2.5,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
          // delay: 0.2,
        }}
        cx="50" //160.5
        cy="360" //265.5
        rx="101.5" //101.5
        ry="43.5"
        fill={isDarkMode ? "#104070" : "#1976c9"}
      />
    </motion.svg>
  );
};
