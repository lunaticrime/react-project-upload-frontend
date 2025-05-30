import TiltCard from "../utils/tiltCard";
import adminImg from "/src/assets/Admin.svg";
import BackToTop from "../utils/BackToTop";
import { Reveal } from "../utils/Reveal";
// import SliderToggle from "../SliderToggle";

export default function Bienvenue({ isDarkMode, setIsDarkMode }) {
  return (
    <div className={`${isDarkMode ? "dark" : ""} `}>
      {/* <SliderToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />   */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between justify-center px-6 lg:px-16 py-12 bg-blue-50 gap-10 h-screen dark:bg-blue-2-dark">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left flex flex-col justify- ">
          <Reveal isDarkMode={isDarkMode}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] dark:text-blue-50 mb-10 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
              Welcome to your Admin Space - Program Director
            </h1>
          </Reveal>
          <Reveal isDarkMode={isDarkMode} width="100%">
            <p className="text-sm sm:text-base lg:text-lg font-inter text-[var(--color-blue-1)] dark:text-blue-50 mb-6 sm:mb-8 lg:mb-10 tracking-wide sm:leading-snug lg:leading-normal">
              Access a comprehensive overview of projects, manage users, and
              easily export data useful for educational supervision.
            </p>
          </Reveal>
          <Reveal isDarkMode={isDarkMode} width="100%">
            <button
              className="reverse-default-btn lg:self-start self-center"
              onClick={() => {
                const dashboardElement = document.getElementById("dashboard");
                if (dashboardElement) {
                  const offset = 80; // 100px margin from top
                  const elementPosition =
                    dashboardElement.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Get Started
            </button>
          </Reveal>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 mt-6 sm:mt-8 lg:mt-0 lg:flex justify-center w-4/5">
          <Reveal isDarkMode={isDarkMode} width="100%">
            {/* <img
            src="/src/assets/Admin.svg"
            alt="Illustration"
            className="w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
          /> */}
            <TiltCard img={adminImg} />
          </Reveal>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
