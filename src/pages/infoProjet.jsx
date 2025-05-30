import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Navbar from "../components/EspaceProf/navbar";
import Title from "../components/InfoProjet/Title";
import Info from "../components/InfoProjet/info";
import Forum from "../components/InfoProjet/forum";
import Valider from "../components/InfoProjet/valider";
import { tableData } from "../mockData/dataEspaceProf";
import BackToTop from "../components/utils/BackToTop"; // Import BackToTop component
import Footer from "../components/footer"; // Import Footer component

// Page de détails d'un projet
// Pour le backend Laravel :
// - Récupérer les détails du projet via une API (GET /api/projects/{id})
//   => ProjectController@show, retourner un ProjectResource détaillé
// - Les fichiers associés doivent être récupérés via l'API ou un storage Laravel
//   => Stocker les fichiers dans storage/app/public et exposer via Storage::url()
//   => Retourner un tableau de fichiers dans la réponse API (nom, url, type)
// - Les commentaires et notes peuvent être envoyés via POST /api/projects/{id}/comments ou /notes
//   => Créer un modèle Comment lié au projet (relation hasMany)
//   => Pour la note, ajouter un champ "note" sur le projet ou une table de notes séparée
// - Pour la validation/refus, prévoir une route PATCH /api/projects/{id}/status avec un middleware d'autorisation
// - Sécuriser l'accès aux détails selon le rôle (enseignant, admin, étudiant propriétaire)

function InfoProjet() {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  }); // Initialize dark mode state from localStorage

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode); // Persist dark mode state
  }, [isDarkMode]);

  // Conversion de l'id en entier pour la recherche dans le mockData
  const project = tableData.find((item) => item.id === parseInt(id));

  if (!project) {
    // Gestion du cas où le projet n'existe pas (404 côté backend)
    return (
      <div
        className={`bg-blue-50 dark:bg-blue-2-dark ${
          isDarkMode ? "dark" : ""
        } transition-all duration-300`}
      >
        <div className="p-5">
          <h1 className="text-2xl font-bold text-red-500 dark:text-red-300">
            Projet introuvable
          </h1>
        </div>
        <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <BackToTop />
      </div>
    );
  }

  return (
    <div
      className={`bg-blue-50 dark:bg-blue-2-dark ${
        isDarkMode ? "dark" : ""
      } transition-all duration-300`}
    >
      <Title
        projectName={project.projectName}
        studentName={project.student}
        isDarkMode={isDarkMode}
      />
      <Info
        projectName={project.projectName}
        description={project.description}
        type={project.module}
        year={project.year}
        files={[
          // Les liens de fichiers doivent venir du backend (storage Laravel)
          { name: "rapport_final.pdf", link: "/path/to/rapport_final.pdf" },
          { name: "source_code.zip", link: "/path/to/source_code.zip" },
        ]}
        isDarkMode={isDarkMode}
      />
      <Forum isDarkMode={isDarkMode} />
      <Valider
        statusValue={project.status}
        submissionDate="2025-05-07"
        isDarkMode={isDarkMode}
        projectId={project.id}
      />
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <BackToTop />
    </div>
  );
}

export default InfoProjet;
