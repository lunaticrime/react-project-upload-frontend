import React, { useState } from "react";
import Navbar from "../components/Adminpage/navbar";
import Charts from "../components/Adminpage/Charts";
import Cards from "../components/Adminpage/Cards";
import Filtre from "../components/Adminpage/Filtre";
import DashBord from "../components/Adminpage/DashBord";
import { usersData } from "../../mockData/dataEspaceAdmin";
import Bienvenue from "../components/Adminpage/Bienvenue";
import Export from "../components/Adminpage/Export";

// Page principale de l'espace Admin/Responsable
// Pour le backend Laravel :
// - Récupérer la liste des utilisateurs via une API (GET /api/users)
//   => UserController@index, retourner les utilisateurs paginés, possibilité de filtrer par rôle et recherche
//   => Utiliser policies pour sécuriser l'accès (seuls les admins/responsables peuvent voir tous les users)
// - Les filtres (role, recherche) doivent être envoyés en tant que paramètres de requête
//   => Ex: /api/users?role=Prof&search=nom
// - Les statistiques (Charts, Cards) doivent être générées côté backend (GET /api/stats)
//   => Créer un StatsController qui retourne les agrégats nécessaires (nombre projets, étudiants, etc.)
// - L'exportation doit déclencher un endpoint Laravel qui génère le fichier (PDF/Excel)
//   => Utiliser Laravel Excel (maatwebsite/excel) pour générer un export filtré
//   => Protéger l'exportation par un middleware d'autorisation
// - Penser à la gestion des rôles et permissions (spatie/laravel-permission recommandé)

export default function EspaceAdmin() {
  const itemsPerPage = 10;

  // États pour les filtres
  const [selectedRole, setSelectedRole] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrage local des données utilisateurs (à remplacer par un appel API filtré côté backend)
  // Ici, on filtre côté frontend, mais en prod, il faudra faire une requête API filtrée
  const filteredData = usersData.filter((user) => {
    const matchesRole =
      selectedRole === "default" || user.role === selectedRole;
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div id="dashboard">
        <Charts />
        <Cards />
      </div>
      <div id="gestion-utilisateurs">
        <Filtre
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <DashBord data={filteredData} itemsPerPage={itemsPerPage} />
      </div>
      <div id="exportation">
        <Export />
      </div>
    </>
  );
}
