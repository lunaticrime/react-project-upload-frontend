import React, { useEffect, useState, useRef } from "react";
import { features } from "../../../mockData/dataAccueil";
import {
  DocumentIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const Fonctionnalites = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const getIconById = (id) => {
    switch (id) {
      case 1:
        return (
          <DocumentIcon className="h-10 w-10 text-[var(--color-background)] mr-4" />
        );
      case 2:
        return (
          <MagnifyingGlassIcon className="h-10 w-10 text-[var(--color-background)] mr-4" />
        );
      case 3:
        return (
          <ChartBarIcon className="h-10 w-10 text-[var(--color-background)] mr-4" />
        );
      case 4:
        return (
          <ChatBubbleLeftRightIcon className="h-10 w-10 text-[var(--color-background)] mr-4" />
        );
      case 5:
        return (
          <BookOpenIcon className="h-10 w-10 text-[var(--color-background)] mr-4" />
        );
      default:
        return null;
    }
  };

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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Fonctionnalités clés
        </h1>
        <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)]" />
        <div className="pt-10">
          {/* Features Section */}
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {features.map(({ id, title, description }) => (
              <div
                key={id}
                className="flex flex-col items-start p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out w-full max-w-sm"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--color-blue-4), var(--color-blue-1))",
                  boxShadow: `0px 4px 15px var(--color-blue-2)`,
                }}
              >
                <div className="flex items-center mb-4">
                  {getIconById(id)}
                  <h2 className="text-2xl font-bold font-poppins text-[var(--color-background)]">
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
