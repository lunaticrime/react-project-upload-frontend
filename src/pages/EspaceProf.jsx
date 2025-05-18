import React, { useState } from "react";
import Navbar from "../components/EspaceProf/navbar";
import Title from "../components/EspaceProf/Title";
import Filter from "../components/EspaceProf/Filtre";
import DashBord from "../components/EspaceProf/DashBord";
import { tableData } from "../../mockData/dataEspaceProf";

// Page principale de l'espace Professeur
// Pour le backend Laravel :
// - Récupérer la liste des projets via une API (GET /api/projects)
//   => Utiliser un contrôleur ProjectController@index et retourner les projets paginés (avec Resource Laravel)
// - Les filtres (année, module, statut, recherche) devront être envoyés en tant que paramètres de requête
//   => Ex: /api/projects?year=2023&module=Module%201&status=approved&search=nom
//   => Utiliser des scopes Eloquent pour filtrer côté backend
// - La pagination peut être gérée côté backend pour optimiser la performance
//   => Utiliser la méthode paginate() d'Eloquent et retourner meta/links pour la navigation
// - Pour la sécurité, protéger les routes API avec sanctum ou passport (auth:api)
// - Penser à la gestion des rôles (middleware Laravel) pour restreindre l'accès aux enseignants

function EspaceProf() {
  const itemsPerPage = 10;

  // États pour les filtres
  const [selectedYear, setSelectedYear] = useState("default");
  const [selectedModule, setSelectedModule] = useState("default");
  const [selectedStatus, setSelectedStatus] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrage local des données (à remplacer par un appel API filtré côté backend)
  // Ici, on filtre côté frontend, mais en prod, il faudra faire une requête API filtrée
  const filteredData = tableData.filter((item) => {
    return (
      (selectedYear === "default" || item.year === selectedYear) &&
      (selectedModule === "default" || item.module === selectedModule) &&
      (selectedStatus === "default" || item.status === selectedStatus) &&
      (searchQuery === "" ||
        item.student.toLowerCase().includes(searchQuery.toLowerCase())) // Recherche par nom d'étudiant
    );
  });

  return (
    <>
      <Navbar />
      <Title />
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
      {/* <Footer /> */}
    </>
  );
}

export default EspaceProf;
