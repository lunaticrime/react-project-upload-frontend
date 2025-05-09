import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const Toggle = ({ setIsDarkMode }) => {
  return (
    <div className="">
      <label
        htmlFor="checkbox"
        className="checkbox-label bg-blue-1 dark:bg-blue-2-dark w-12 h-6 rounded-[50px] relative p-1 cursor-pointer flex justify-between items-center checkbox"
      >
        <input
          type="checkbox"
          className="peer opacity-0 absolute"
          id="checkbox"
          onClick={() => {
            setIsDarkMode((prev) => !prev);
          }}
        ></input>
        <i className="fas fa-moon text-blue-50">
          <FaMoon />
        </i>
        <i className="fas fa-sun text-blue-50">
          <FaSun />
        </i>
        <span className="ball peer-checked:translate-x-[22px]"></span>
      </label>
    </div>
  );
};
export default Toggle;
