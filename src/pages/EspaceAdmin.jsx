import React, { useState } from "react";
// import Navbar from "../components/Adminpage/navbar";
import Charts from "../components/Adminpage/Charts";
import Cards from "../components/Adminpage/Cards";
import Filtre from "../components/Adminpage/Filtre";
import DashBord from "../components/Adminpage/DashBord";
import { usersData } from "../mockData/dataEspaceAdmin";
import Bienvenue from "../components/Adminpage/Bienvenue";
import Export from "../components/Adminpage/Export";
import Navbar from "../components/test-navbar";
import Footer from "../components/footer";

export default function EspaceAdmin({ isDarkMode, setIsDarkMode }) {
  const itemsPerPage = 10;
  const [isExportOpen, setIsExportOpen] = useState(false); // State for Export popup

  // Filter states
  const [selectedRole, setSelectedRole] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered data
  const filteredData = usersData.filter((user) => {
    const matchesRole =
      selectedRole === "default" || user.role === selectedRole;
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div
      className={`bg-blue-50 dark:bg-blue-2-dark ${isDarkMode ? "dark" : ""}`}
    >
      {/* <Navbar /> */}
      <Bienvenue isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div id="dashboard">
        <Charts isDarkMode={isDarkMode} />
        <Cards isDarkMode={isDarkMode} />
      </div>
      <div id="gestion-utilisateurs">
        <Filtre
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <DashBord data={filteredData} itemsPerPage={itemsPerPage} />
        {/* Centered Export Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsExportOpen(true)}
            className="sm:flex items-center text-blue-50 font-semibold rounded-md px-4 py-2 flex mb-10 gap-2 border-2 cursor-pointer whitespace-nowrap bg-blue-1 border-blue-1 dark:border-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:text-blue-50 dark:bg-blue-2-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark shadow-md transition-all duration-300 ease-in-out"
          >
            Exporter les données
          </button>
        </div>
      </div>
      {/* Export Popup */}
      <Export
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        className="bg-blue-50 dark:bg-blue-1 opacity-100"
      />
      <div id="exportation" className={`${isDarkMode ? "dark" : ""}`}>
        <Export />
      </div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}
