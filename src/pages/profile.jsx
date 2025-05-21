import { useState } from "react";

import FormCard from "../components/formCard";
import ProfileHeader from "../components/profileHeader";
// import CommandMenu from "../components/commandMenu";
// const FormCard = lazyLoad("../components/formCard.jsx");
// const ProfileHeader = lazyLoad("../components/profileHeader");
// const CommandMenu = lazyLoad("../components/commandMenu");
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/profile-sidebar";

const Profile = ({ isDarkMode, setIsDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${isDarkMode ? "dark" : ""} relative`}>
      {/* <CommandMenu isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          {/* <SidebarTrigger /> */}
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
        </main>
      </SidebarProvider>
    </div>
  );
};
export default Profile;
