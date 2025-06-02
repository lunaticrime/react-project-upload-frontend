import React, { useState, useEffect } from "react";
import Navbar from "../components/test-navbar";
import Title from "../components/EspaceProf/Title";
import Filter from "../components/EspaceProf/Filtre";
import DashBord from "../components/EspaceProf/DashBord";
import Footer from "../components/footer"; // Import the Footer component
import BackToTop from "../components/utils/BackToTop"; // Import BackToTop component
// import { tableData } from "../mockData/dataEspaceProf"; // Remove mock data import
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient"; // Correct import path

function EspaceProf() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  }); // Initialize dark mode state from localStorage

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode); // Persist dark mode state
  }, [isDarkMode]);

  const itemsPerPage = 10;

  // Filter states
  const [selectedYear, setSelectedYear] = useState(""); // Initialize with empty string for no filter
  const [selectedModule, setSelectedModule] = useState(""); // Initialize with empty string for no filter
  const [selectedStatus, setSelectedStatus] = useState(""); // Initialize with empty string for no filter
  const [searchQuery, setSearchQuery] = useState("");

  // State for fetched data
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch projects from the backend
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (selectedYear) params.append("annee", selectedYear);
      if (selectedModule) params.append("module_id", selectedModule);
      if (selectedStatus) params.append("approval_status", selectedStatus);

      const response = await apiClient.get(`/projets`, { params });
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects for EspaceProf:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when component mounts or filters change
  useEffect(() => {
    fetchProjects();
  }, [searchQuery, selectedYear, selectedModule, selectedStatus]); // Dependencies

  const navigate = useNavigate();

  const handleInfoClick = (projectId) => {
    navigate(`/infoProjet/${projectId}`);
  };

  // Modify handleSearch to just update the filter states
  const handleSearch = (search, year, module, status) => {
    setSearchQuery(search);
    setSelectedYear(year);
    setSelectedModule(module);
    setSelectedStatus(status);
    // fetchProjects is triggered by the useEffect dependency array when state changes
  };

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
        {/* Pass filter states and the handleSearch function to Filter component */}
        <Filter
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        {/* Pass fetched projects data to DashBord component */}
        {loading && <p className="text-center">Loading projects...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <DashBord
            data={projects}
            itemsPerPage={itemsPerPage}
            onInfoClick={handleInfoClick}
          />
        )}
        <BackToTop /> {/* Add BackToTop component */}
        <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </>
  );
}

export default EspaceProf;
