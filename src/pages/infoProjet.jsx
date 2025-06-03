// infoProjet.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/InfoProjet/Title";
import Info from "../components/InfoProjet/info";
import Forum from "../components/InfoProjet/forum";
import Valider from "../components/InfoProjet/valider";
import BackToTop from "../components/utils/BackToTop";
import Footer from "../components/footer";
import apiClient from "../services/apiClient";

// Make sure this environment variable is set in your .env file (e.g., VITE_APP_URL=http://localhost:8000)
const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:8000";
const STORAGE_BASE_URL = `${APP_URL}/storage/`; // Define STORAGE_BASE_URL here for consistency

function InfoProjet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });

  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectionComment, setRejectionComment] = useState("");

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const fetchCsrfToken = async () => {
    try {
      // Assuming apiClient is configured with the correct base URL (e.g., http://localhost:8000)
      // and CSRF route is /sanctum/csrf-cookie
      await apiClient.get("/sanctum/csrf-cookie"); // This route is in api.php
      console.log("CSRF cookie fetched.");
    } catch (err) {
      console.error("Failed to fetch CSRF cookie:", err);
    }
  };

  const fetchProjectDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await fetchCsrfToken();

    console.log(
      "Cookies available before fetching project details:",
      document.cookie
    );
    const currentToken = localStorage.getItem("token");
    console.log(
      "Fetching project details. Token in localStorage:",
      currentToken ? "Present" : "Missing"
    );

    try {
      // The route is /projets/{projet}
      // apiClient should handle prefixing /api if necessary, or its baseURL includes it.
      const response = await apiClient.get(`/projets/${id}`);
      console.log("Project data fetched:", response.data);
      setProjectData(response.data);
    } catch (e) {
      console.error(
        "Erreur lors de la récupération des détails du projet:",
        e.response?.data?.message || e.message // More detailed error
      );
      setError(e.response?.data?.message || e.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleUpdateProjectStatus = async (
    projectIdToUpdate,
    newStatus,
    comment = ""
  ) => {
    setIsLoading(true); // Set loading at the beginning
    const currentProjectId = projectIdToUpdate || id;
    await fetchCsrfToken();
    
    const currentToken = localStorage.getItem("token");
    console.log(
      "Updating project status. Token in localStorage:",
      currentToken ? "Present" : "Missing"
    );

    try {
      const payload = { status: newStatus };
      if (newStatus === "rejected") {
        if (comment.trim() === "") {
          // Changed alert to console.error and return for better UX
          console.error("A comment is required to reject this project.");
          setIsLoading(false);
          return;
        }
        payload.comment = comment;
      }

      // The route is /projets/{projet}/review
      const response = await apiClient.post(
        `/projets/${currentProjectId}/review`,
        payload
      );

      setProjectData(response.data.projet); // Update project data with fresh data from response
      // Changed alert to console.log for better UX
      console.log(
        `Projet ${
          newStatus === "approved" ? "approuvé" : "rejeté"
        } avec succès!`
      );
      setRejectionComment(""); // Clear comment
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
      // Changed alert to console.error for better UX
      console.error(`Erreur: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Define a function to get the correct file URL
  const getProjectFileUrl = (filePath) => {
    if (!filePath) {
      return null; // Or a default placeholder if needed for files
    }
    // Check if the URL is already a full external URL
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    // Otherwise, it's a local storage path, prepend STORAGE_BASE_URL
    return `${STORAGE_BASE_URL}${filePath}`;
  };

  // Define a function to get the correct image URL with fallback
  const getProjectImageUrl = (imagePath) => {
    const url = getProjectFileUrl(imagePath);
    return url || "https://placehold.co/600x400/EBF8FF/3182CE?text=Image+Projet";
  };


  if (isLoading && !projectData) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen bg-blue-50 dark:bg-blue-2-dark ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <p className="text-xl text-blue-1 dark:text-blue-50">
          Chargement des détails du projet...
        </p>
      </div>
    );
  }

  if (error && !projectData) { // Keep showing error if projectData is null
    return (
      <div
        className={`bg-blue-50 dark:bg-blue-2-dark ${
          isDarkMode ? "dark" : ""
        } transition-all duration-300 min-h-screen flex flex-col`}
      >
        <div className="flex-grow p-5 text-center">
          <h1 className="text-2xl font-bold text-red-500 dark:text-red-300">
            Erreur: {error}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-1 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }
  
  // If projectData is null even after loading and no specific error string, show generic message
  if (!projectData) {
     return (
      <div
        className={`flex justify-center items-center min-h-screen bg-blue-50 dark:bg-blue-2-dark ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <p className="text-xl text-red-500 dark:text-red-300">
          Impossible de charger les données du projet. Veuillez réessayer.
        </p>
         <button
            onClick={() => navigate(-1)}
            className="ml-4 mt-4 px-4 py-2 bg-blue-1 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Retour
          </button>
      </div>
    );
  }


  // --- Corrected File Preparation ---
  const filesForInfo = [];

  // 1. Project File (PDF, ZIP, DOCX, etc.)
  // projectData.fichier is the path like "projets/fichiers/document.pdf"
  if (projectData.fichier) {
    filesForInfo.push({
      name: `Document: ${projectData.fichier.split("/").pop() || "Fichier principal"}`,
      link: getProjectFileUrl(projectData.fichier), // Use the new helper function
    });
  }

  // 2. Project Image File (if you want it in the downloadable files list)
  // projectData.image is the path like "projets/images/image.jpg"
  if (projectData.image) {
    filesForInfo.push({
      name: `Image: ${projectData.image.split("/").pop() || "Image du projet"}`,
      link: getProjectFileUrl(projectData.image), // Use the new helper function
    });
  }

  // 3. Project Certificate (if approved and path exists)
  
  // --- End of Corrected File Preparation ---

  // For the main display image in the Info component, construct its URL similarly:
  const mainImageUrl = getProjectImageUrl(projectData.image);


  return (
    <div
      className={`bg-blue-50 dark:bg-blue-2-dark ${
        isDarkMode ? "dark" : ""
      } transition-all duration-300 min-h-screen flex flex-col`}
    >
      <div className="flex-grow">
        <Title
          projectName={projectData.titre}
          studentName={
            projectData.user ? projectData.user.name : "Étudiant inconnu"
          }
          isDarkMode={isDarkMode}
        />
        <Info
          projectName={projectData.titre}
          description={projectData.description}
          type={
            projectData.module
              ? projectData.module.name || projectData.module.nom // Ensure 'name' or 'nom' exists
              : "Module inconnu"
          }
          year={projectData.annee || (projectData.submittedDate ? new Date(projectData.submittedDate).getFullYear() : "Année inconnue")}
          files={filesForInfo} // Pass the corrected files array
          isDarkMode={isDarkMode}
          projectImageUrl={mainImageUrl} // Pass the correctly constructed URL for the main image
        />
        <Forum isDarkMode={isDarkMode} projectId={projectData.id} />
        {/* Only show Valider component if user is prof or admin, you'll need user role from auth context */}
        {/* Example: { (currentUser.role === 'prof' || currentUser.role === 'admin') && ( */}
        <Valider
          statusValue={projectData.approval_status}
          submissionDate={
            projectData.submittedDate // Prefer submittedDate if available, fallback to created_at
              ? new Date(projectData.submittedDate).toLocaleDateString()
              : projectData.created_at
              ? new Date(projectData.created_at).toLocaleDateString()
              : "Date inconnue"
          }
          isDarkMode={isDarkMode}
          projectId={projectData.id}
          onUpdateStatus={handleUpdateProjectStatus}
          rejectionComment={rejectionComment}
          setRejectionComment={setRejectionComment}
          profId={projectData.prof_id} // Pass prof_id for authorization check in Valider
          user={projectData.user} // Pass the student user for context
        />
        {/* )} */}
      </div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <BackToTop />
    </div>
  );
}

export default InfoProjet;
