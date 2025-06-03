import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/InfoProjet/Title";
import Info from "../components/InfoProjet/info";
import Forum from "../components/InfoProjet/forum";
import Valider from "../components/InfoProjet/valider";
import BackToTop from "../components/utils/BackToTop";
import Footer from "../components/footer";
import apiClient from "../services/apiClient";

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

  // Function to fetch CSRF cookie
  const fetchCsrfToken = async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");
      console.log("CSRF cookie fetched.");
    } catch (err) {
      console.error("Failed to fetch CSRF cookie:", err);
    }
  };

  const fetchProjectDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Fetch CSRF token before making authenticated requests
    await fetchCsrfToken();

    // Add this log to inspect cookies just before the API call
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
      const response = await apiClient.get(`/projets/${id}`);
      console.log("Project data fetched:", response.data); // Debugging log
      setProjectData(response.data);
    } catch (e) {
      console.error(
        "Erreur lors de la récupération des détails du projet:",
        e.message
      );
      setError(e.message);
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
    const currentProjectId = projectIdToUpdate || id;
    // Fetch CSRF token before making authenticated requests
    await fetchCsrfToken();

    // Add this log to inspect cookies just before the API call
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
      // Include the rejectionComment from state if status is rejected
      const payload = { status: newStatus };
      // Use the comment parameter if status is rejected
      if (newStatus === "rejected") {
        if (comment.trim() === "") {
          alert("A comment is required to reject this project.");
          setIsLoading(false); // Stop loading if validation fails on frontend
          return; // Stop the API call
        }
        payload.comment = comment;
      }

      const response = await apiClient.post(
        `/projets/${currentProjectId}/review`,
        payload
      );

      fetchProjectDetails();
      alert(
        `Projet ${
          newStatus === "approved" ? "approuvé" : "rejeté"
        } avec succès!`
      );
      // Clear comment after successful update (optional)
      setRejectionComment("");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err.message);
      setError(err.message);
      alert(`Erreur: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
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

  if (error) {
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

  const filesForInfo = [];
  if (projectData.fichier_url) {
    filesForInfo.push({
      name: projectData.fichier?.split("/").pop() || "Fichier principal",
      link: projectData.fichier_url,
    });
  }
  if (projectData.image_url) {
    filesForInfo.push({
      name: projectData.image?.split("/").pop() || "Image du projet",
      link: projectData.image_url,
      type: "image",
    });
  }

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
              ? projectData.module.name || projectData.module.nom
              : "Module inconnu"
          }
          year={
            projectData.created_at
              ? new Date(projectData.created_at).getFullYear()
              : "Année inconnue"
          }
          files={filesForInfo}
          fichier={projectData.fichier}
          isDarkMode={isDarkMode}
          projectImageUrl={
            projectData.image_url ||
            "https://placehold.co/600x400/EBF8FF/3182CE?text=Image+Projet"
          }
        />
        <Forum isDarkMode={isDarkMode} projectId={projectData.id} />
        <Valider
          statusValue={projectData.approval_status}
          submissionDate={
            projectData.created_at
              ? new Date(projectData.created_at).toLocaleDateString()
              : "Date inconnue"
          }
          isDarkMode={isDarkMode}
          projectId={projectData.id}
          onUpdateStatus={handleUpdateProjectStatus}
          rejectionComment={rejectionComment}
          setRejectionComment={setRejectionComment}
        />
      </div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <BackToTop />
    </div>
  );
}

export default InfoProjet;
