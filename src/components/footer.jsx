import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import SliderToggle from "./SliderToggle";

const Footer = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <footer
      className={`bg-blue-1 dark:bg-blue-1-dark flex flex-col items-center justify-center rounded-t-4xl text-blue-50 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch py-10 w-full max-w-7xl px-8 ">
        <div className="flex-1 pr-0 md:px-10 flex flex-col justify-center items-center md:justify-start w-full border-r-0 border-b-1 md:border-r-1 md:border-b-0 border-blue-50 py-4">
          <a href="/" className="block mb-4">
            <img
              src="../assets/lightLogo.png"
              alt="ENSAK"
              className="h-12 w-auto"
            />
          </a>
          <p className="text-sm font-extralight md:text-justify text-center">
            À l'ENSA, nous formons des ingénieurs d'excellence, prêts à innover
            et à relever les défis de demain.
          </p>
        </div>

        <div className="flex-1 py-4 md:px-10 flex flex-col justify-center w-full items-center md:justify-start border-r-0 border-b-1 md:border-r-1 md:border-b-0 border-blue-50">
          <h4 className="text-2xl font-semibold mb-4">Contact</h4>
          <div className="text-sm space-y-1 text-center">
            <p>xxxx@uit.ac.ma</p>
            <p>+123 456 7890</p>
          </div>
        </div>

        <div className="flex-1 py-4 px-6 md:px-10 flex flex-col justify-center items-center md:justify-start">
          <h4 className="text-2xl font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-6 text-2xl">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
          <div className="mt-10 z-10">
            {" "}
            {/* DABA MABAYNCH TOGGLE F FOOTER , WALAKIN ILA DERT Z 10 TIWLI Fo9 RESPONSIVE MENU */}
            <div className="">
              <SliderToggle
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center px-4 pb-8">
        <p className="text-sm font-extralight">
          École Nationale des Sciences Appliquées © 2025 Université Ibn Tofail.
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
