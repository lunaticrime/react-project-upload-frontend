import React, { useEffect, useState, useRef } from "react";
import { Reveal } from "../utils/Reveal";
import ready from "../../assets/ready.svg";
import TiltCard from "../utils/tiltCard";
const Ready = ({ isDarkMode }) => {
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
      className={`mt-30 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-[var(--color-background)] gap-10 sm:gap-20 lg:gap-40 transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <Reveal width="100%" isDarkMode={isDarkMode}>
          <TiltCard img={ready} />
        </Reveal>
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <Reveal isDarkMode={isDarkMode} width="100%">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
            Ready to showcase your projects?
          </h1>
        </Reveal>
        <Reveal isDarkMode={isDarkMode} width="100%">
          <button className="reverse-default-btn my-2">Start now</button>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-blue-1)] dark:text-blue-200 font-inter italic max-w-md mx-auto lg:mx-0">
            Discover an intuitive platform to manage your academic projects with
            ease.
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default Ready;
