import loginRegistrationImg from "../assets/login_registration.svg";

const TogglePanel = ({ isActive, setIsActive, isDarkMode }) => (
  <div className={`toggle-container ${isDarkMode ? "dark" : ""}`}>
    <div className="toggle">
      <div className="toggle-panel toggle-left">
        <img src={loginRegistrationImg} alt="" />
        <h1></h1>
        <p></p>
        <div className="btn-container">
          <span>already have an account?</span>
          <button
            className="buttonCnt"
            onClick={() => {
              setIsActive(!isActive);
              console.log(isActive);
            }}
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="toggle-panel toggle-right">
        <img src={loginRegistrationImg} alt="" />
        <h1></h1>
        <p></p>
        <div className="btn-container">
          <span>don't have an account?</span>
          <button
            className=" buttonCnt"
            onClick={() => {
              setIsActive(!isActive);
              console.log(isActive);
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default TogglePanel;
