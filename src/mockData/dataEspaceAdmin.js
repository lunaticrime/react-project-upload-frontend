// Fichier de données mock pour l'espace Admin/Responsable
// Pour le backend Laravel :
// - Remplacer ces données statiques par des appels API Laravel
// - Les endpoints typiques :
//   - GET /api/users (liste des utilisateurs, avec filtres en query string)
//     => Penser à retourner les données paginées (meta, links pour la pagination côté frontend)
//     => Ajouter des scopes Eloquent pour chaque filtre (rôle, recherche)
//   - GET /api/stats (statistiques pour les charts et cards)
//     => Retourner les agrégats nécessaires (nombre projets, utilisateurs par rôle, etc.)
//   - GET /api/projects/export (pour l'exportation PDF/Excel)
//     => Utiliser Laravel Excel (maatwebsite/excel) pour générer un export filtré selon les paramètres reçus
//     => Retourner un lien de téléchargement sécurisé
// - Pour la gestion des utilisateurs :
//   - Créer, modifier, supprimer via POST/PUT/DELETE sur /api/users
//   - Protéger les routes avec des policies (seuls les admins peuvent modifier/supprimer)
// - Pour la sécurité :
//   - Protéger toutes les routes API avec sanctum/passport et middleware auth:api
//   - Utiliser spatie/laravel-permission pour la gestion fine des rôles et permissions

export const navLinks = [
  { id: 1, name: "Tableau de bord", link: "#dashboard" },
  { id: 2, name: "Gestion des utilisateurs", link: "#gestion-utilisateurs" },
  { id: 3, name: "Exportation", link: "#exportation" },
];

export const projectStats = {
  statusDistribution: [40, 30, 30], // Validé, En Attente, Refusé
  years: ["2020", "2021", "2022", "2023"],
  projectsPerYear: [10, 15, 20, 25], // Nombre de projets par année
};

export const adminCardsData = [
  { id: 1, title: "Total des projets soumis", count: 120 },
  { id: 2, title: "Nombre d'étudiants actifs", count: 300 },
  { id: 3, title: "Nombre d'enseignants actifs", count: 50 },
  { id: 4, title: "Projets soumis cette année", count: 25 },
];

export const usersData = [
  // Ces données doivent être remplacées par la réponse de l'API Laravel
  // Les champs doivent correspondre à ceux du backend (id, name, email, role, lastLogin, etc.)
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    lastLogin: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Student",
    lastLogin: "2023-10-02",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Student",
    lastLogin: "2023-09-30",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    role: "Admin",
    lastLogin: "2023-10-03",
  },
  {
    id: 5,
    name: "Charlie White",
    email: "charlie@example.com",
    role: "Teacher",
    lastLogin: "2023-10-04",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Student",
    lastLogin: "2023-10-05",
  },
  {
    id: 7,
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "Teacher",
    lastLogin: "2023-10-06",
  },
  {
    id: 8,
    name: "Sarah Lee",
    email: "sarah@example.com",
    role: "Admin",
    lastLogin: "2023-10-07",
  },
  {
    id: 9,
    name: "David Clark",
    email: "david@example.com",
    role: "Student",
    lastLogin: "2023-10-08",
  },
  {
    id: 10,
    name: "Sophia Martinez",
    email: "sophia@example.com",
    role: "Teacher",
    lastLogin: "2023-10-09",
  },
  {
    id: 11,
    name: "James Anderson",
    email: "james@example.com",
    role: "Admin",
    lastLogin: "2023-10-10",
  },
  {
    id: 12,
    name: "Olivia Thomas",
    email: "olivia@example.com",
    role: "Student",
    lastLogin: "2023-10-11",
  },
  {
    id: 13,
    name: "William Taylor",
    email: "william@example.com",
    role: "Teacher",
    lastLogin: "2023-10-12",
  },
  {
    id: 14,
    name: "Isabella Moore",
    email: "isabella@example.com",
    role: "Student",
    lastLogin: "2023-10-13",
  },
  {
    id: 15,
    name: "Benjamin Harris",
    email: "benjamin@example.com",
    role: "Admin",
    lastLogin: "2023-10-14",
  },
  {
    id: 16,
    name: "Mia Walker",
    email: "mia@example.com",
    role: "Student",
    lastLogin: "2023-10-15",
  },
  {
    id: 17,
    name: "Lucas Young",
    email: "lucas@example.com",
    role: "Teacher",
    lastLogin: "2023-10-16",
  },
  {
    id: 18,
    name: "Amelia Hall",
    email: "amelia@example.com",
    role: "Student",
    lastLogin: "2023-10-17",
  },
  {
    id: 19,
    name: "Henry Allen",
    email: "henry@example.com",
    role: "Admin",
    lastLogin: "2023-10-18",
  },
  {
    id: 20,
    name: "Evelyn King",
    email: "evelyn@example.com",
    role: "Teacher",
    lastLogin: "2023-10-19",
  },
  {
    id: 21,
    name: "Alexander Wright",
    email: "alexander@example.com",
    role: "Student",
    lastLogin: "2023-10-20",
  },
  {
    id: 22,
    name: "Charlotte Scott",
    email: "charlotte@example.com",
    role: "Admin",
    lastLogin: "2023-10-21",
  },
  {
    id: 23,
    name: "Daniel Green",
    email: "daniel@example.com",
    role: "Teacher",
    lastLogin: "2023-10-22",
  },
  {
    id: 24,
    name: "Victoria Adams",
    email: "victoria@example.com",
    role: "Student",
    lastLogin: "2023-10-23",
  },
  {
    id: 25,
    name: "Matthew Baker",
    email: "matthew@example.com",
    role: "Admin",
    lastLogin: "2023-10-24",
  },
  {
    id: 26,
    name: "Ella Nelson",
    email: "ella@example.com",
    role: "Student",
    lastLogin: "2023-10-25",
  },
  {
    id: 27,
    name: "Sebastian Carter",
    email: "sebastian@example.com",
    role: "Teacher",
    lastLogin: "2023-10-26",
  },
  {
    id: 28,
    name: "Grace Mitchell",
    email: "grace@example.com",
    role: "Student",
    lastLogin: "2023-10-27",
  },
  {
    id: 29,
    name: "Jack Perez",
    email: "jack@example.com",
    role: "Admin",
    lastLogin: "2023-10-28",
  },
  {
    id: 30,
    name: "Ava Roberts",
    email: "ava@example.com",
    role: "Teacher",
    lastLogin: "2023-10-29",
  },
];

export const filterData = {
  role: [
    { id: 0, value: "default", label: "Filter by Role" },
    { id: 1, value: "Admin", label: "Admin" },
    { id: 2, value: "Student", label: "Student" },
    { id: 3, value: "Teacher", label: "Teacher" },
  ],
  years: [
    { id: 0, value: "default", label: "Filtrer par Année" },
    { id: 1, value: "2020", label: "2020" },
    { id: 2, value: "2021", label: "2021" },
    { id: 3, value: "2022", label: "2022" },
    { id: 4, value: "2023", label: "2023" },
  ],
  status: [
    { id: 0, value: "default", label: "Filtrer par Statut" },
    { id: 1, value: "approved", label: "🟢 Validé" },
    { id: 2, value: "pending", label: "🟡 En Attente" },
    { id: 3, value: "rejected", label: "🔴 Refusé" },
  ],
  types: [
    { id: 0, value: "default", label: "Filtrer par Type" },
    { id: 1, value: "rapport", label: "Rapport" },
    { id: 2, value: "présentation", label: "Présentation" },
    { id: 3, value: "autre", label: "Autre" },
  ],
};
