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
import { FaSignOutAlt } from "react-icons/fa"; // Import sign out icon

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
  const [availableYears, setAvailableYears] = useState([]); // State for available years

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
      // Extract unique years from fetched projects
      const years = [
        ...new Set(
          response.data.map((project) =>
            new Date(project.created_at).getFullYear()
          )
        ),
      ]
        .sort((a, b) => b - a) // Sort years in descending order
        .map((year) => ({ value: String(year), label: String(year) }));
      setAvailableYears([{ value: "", label: "Filter by Year" }, ...years]); // Add default option
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

  const handleSignOut = () => {
    // Clear authentication state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
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
          availableYears={availableYears} // Pass available years
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
        <div className="flex justify-end m-6">
          <button
            onClick={handleSignOut}
            className="flex items-center text-blue-50 font-semibold rounded-md px-4 py-2 gap-2 border-2 cursor-pointer whitespace-nowrap bg-red-500 border-red-500 hover:bg-red-600 hover:text-white shadow-md transition-all duration-300 ease-in-out"
          >
            <FaSignOutAlt className="h-5 w-5" />
            Sign Out
          </button>
        </div>
        <div className="h-16"></div> {/* Spacer element */}
        <BackToTop /> {/* Add BackToTop component */}
        <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </>
  );
}

export default EspaceProf;
