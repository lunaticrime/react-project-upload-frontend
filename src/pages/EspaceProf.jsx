import React, { useState, useEffect } from "react";
import Navbar from "../components/test-navbar";
import Title from "../components/EspaceProf/Title";
import Filter from "../components/EspaceProf/Filtre";
import DashBord from "../components/EspaceProf/DashBord";
import Footer from "../components/footer"; // Import the Footer component
import BackToTop from "../components/utils/BackToTop"; // Import BackToTop component
import { tableData } from "../mockData/dataEspaceProf";

function EspaceProf() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  }); // Initialize dark mode state from localStorage

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode); // Persist dark mode state
  }, [isDarkMode]);

  const itemsPerPage = 10;

  // Filter states
  const [selectedYear, setSelectedYear] = useState("default");
  const [selectedModule, setSelectedModule] = useState("default");
  const [selectedStatus, setSelectedStatus] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered data
  const filteredData = tableData.filter((item) => {
    return (
      (selectedYear === "default" || item.year === selectedYear) &&
      (selectedModule === "default" || item.module === selectedModule) &&
      (selectedStatus === "default" || item.status === selectedStatus) &&
      (searchQuery === "" ||
        item.student.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
    );
  });

  return (
    <>
      <div
        className={`bg-blue-50 dark:bg-blue-2-dark ${
          isDarkMode ? "dark" : ""
        } transition-all duration-300`}
      >
        {/* <Navbar /> */}
        <Title />
        <h2 className="text-3xl font-bold text-center text-blue-1 dark:text-blue-50 mt-20 mb-10">
          Manage Your Projects
        </h2>
        <Filter
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <DashBord data={filteredData} itemsPerPage={itemsPerPage} />
        <BackToTop /> {/* Add BackToTop component */}
        <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </>
  );
}

export default EspaceProf;
