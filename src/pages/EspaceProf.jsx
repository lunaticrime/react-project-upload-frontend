import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/test-navbar"; // Assurez-vous des chemins corrects
import Title from "../components/EspaceProf/Title"; // Assurez-vous des chemins corrects
import Filter from "../components/EspaceProf/Filtre"; // Assurez-vous des chemins corrects
import DashBord from "../components/EspaceProf/DashBord"; // Assurez-vous des chemins corrects
import Footer from "../components/footer"; // Assurez-vous des chemins corrects
import BackToTop from "../components/utils/BackToTop"; // Assurez-vous des chemins corrects
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient"; // Assurez-vous du chemin correct
import { FaSignOutAlt } from "react-icons/fa";

const ITEMS_PER_PAGE = 10; // Définir la taille de la pagination

function EspaceProf() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const navigate = useNavigate();

  // États des filtres, gérés ici
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // État pour toutes les données brutes des projets
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États de pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction utilitaire pour obtenir l'année d'un projet (copie de DashBord pour cohérence)
  const getProjectYear = (project) => {
    if (project.submittedDate) {
      return new Date(project.submittedDate).getFullYear();
    }
    if (project.created_at) {
      return new Date(project.created_at).getFullYear();
    }
    return "N/A";
  };

  // Fonction pour récupérer toutes les données des projets de l'API
  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get("/projets"); // API qui retourne TOUS les projets non filtrés
        setAllProjects(response.data);
      } catch (err) {
        console.error("Error fetching all projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []); // Exécuté une seule fois au montage pour récupérer toutes les données

  // Logique de filtrage des projets (optimisée avec useMemo)
  // Cette fonction s'exécute à chaque fois qu'un filtre change ou que allProjects change
  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    // Appliquer le filtre par recherche textuelle
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.titre.toLowerCase().includes(lowerCaseQuery) ||
          project.user?.name.toLowerCase().includes(lowerCaseQuery) // Assurez-vous que user existe
      );
    }

    // Appliquer le filtre par année
    if (selectedYear && selectedYear !== "") { // "" correspond à "Filter by Year"
      filtered = filtered.filter((project) => {
        const projectYear = getProjectYear(project).toString();
        return projectYear === selectedYear;
      });
    }

    // Appliquer le filtre par module
    if (selectedModule && selectedModule !== "") { // "" correspond à "Filter by Module"
      filtered = filtered.filter(
        (project) => String(project.module?.id) === selectedModule // Assurez-vous que module existe
      );
    }

    // Appliquer le filtre par statut
    if (selectedStatus && selectedStatus !== "") { // "" correspond à "Filter by Status"
      filtered = filtered.filter(
        (project) => project.approval_status === selectedStatus
      );
    }

    return filtered;
  }, [allProjects, searchQuery, selectedYear, selectedModule, selectedStatus]);

  // Réinitialiser la page courante quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProjects]); // Déclenché quand filteredProjects change

  // Logique de pagination
  const totalFilteredItems = filteredProjects.length;
  const totalPages = Math.ceil(totalFilteredItems / ITEMS_PER_PAGE);

  const currentProjectsForDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]); // S'exécute quand filteredProjects ou currentPage change

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fonction appelée par le composant Filter pour appliquer les filtres
  const handleApplyFilters = (search, year, module, status) => {
    setSearchQuery(search);
    setSelectedYear(year);
    setSelectedModule(module);
    setSelectedStatus(status);
    // setCurrentPage(1) est géré par l'useEffect sur filteredProjects
  };

  // Fonction appelée par le composant Filter pour réinitialiser les filtres
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedModule("");
    setSelectedStatus("");
    setCurrentPage(1); // Réinitialiser la pagination aussi
  };

  const handleSignOut = () => {
    localStorage.clear(); // Clear all data from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <div
        className={`bg-blue-50 dark:bg-blue-2-dark ${
          isDarkMode ? "dark" : ""
        } transition-all duration-300 min-h-screen`}
      >
        {/* <Navbar /> */}
        <Title />
        <h2 className="text-3xl font-bold text-center text-blue-1 dark:text-blue-50 mt-20 mb-10">
          Manage Your Projects
        </h2>

        {/* Passer tous les états et les fonctions de rappel au composant Filter */}
        <Filter
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onApplyFilters={handleApplyFilters} // Important
          onResetFilters={handleResetFilters} // Important
        />

        {loading ? (
          <p className="text-center text-blue-1 dark:text-blue-50">Loading projects...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Passer les données déjà filtrées et paginées à DashBord */}
            <DashBord
              data={currentProjectsForDisplay}
              itemsPerPage={ITEMS_PER_PAGE}
              // onInfoClick n'est plus nécessaire ici si DashBord gère sa propre navigation
            />

            {/* Contrôles de pagination */}
            {totalFilteredItems > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 border rounded-md bg-blue-500 text-white disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 border rounded-md ${
                      currentPage === page
                        ? "bg-blue-700 text-white"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 border rounded-md bg-blue-500 text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        <div className="flex justify-end mt-6 mb-6 mr-12"> {/* Adjusted margin for button */}
          <button
            onClick={handleSignOut}
            className="flex items-center text-blue-50 font-semibold rounded-md px-4 py-2 gap-2 border-2 cursor-pointer whitespace-nowrap bg-red-500 border-red-500 hover:bg-red-600 hover:text-white shadow-md transition-all duration-300 ease-in-out"
          >
            <FaSignOutAlt className="h-5 w-5" />
            Sign Out
          </button>
        </div>
        <div className="h-16"></div>
        <BackToTop />
        <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </>
  );
}

export default EspaceProf;