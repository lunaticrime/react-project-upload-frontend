import { useState } from "react";
import { lazyLoad } from "../lazyLoad";

import FormCard from "../components/formCard";
import ProfileHeader from "../components/profileHeader";
import CommandMenu from "../components/commandMenu";
// const FormCard = lazyLoad("../components/formCard.jsx");
// const ProfileHeader = lazyLoad("../components/profileHeader");
// const CommandMenu = lazyLoad("../components/commandMenu");

const Profile = ({ isDarkMode, setIsDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${isDarkMode ? "dark" : ""} relative`}>
      <CommandMenu isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <ProfileHeader
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {isOpen && <FormCard setIsOpen={setIsOpen} />}
      {isOpen && (
        <div className="fixed inset-0 z-40 backdrop-blur-lg bg-black/30 transition-all duration-300"></div>
      )}
    </div>
  );
};
export default Profile;
