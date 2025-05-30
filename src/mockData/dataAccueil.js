import { FaUserGraduate, FaChalkboardTeacher, FaUserCog } from "react-icons/fa"; // Updated import

export const navLinks = [
  { id: 1, name: "Accueil", link: "#accueil" },
  { id: 2, name: "À propos", link: "#apropos" },
  { id: 3, name: "Fonctionnalités", link: "#fonctionnalites" },
  { id: 4, name: "Contact", link: "#footer" },
];

export const features = [
  {
    id: 1,
    title: "Project submission",
    description:
      "Easily submit your academic projects for centralization.",
  },
  {
    id: 2,
    title: "Monitoring & Validation",
    description:
      "Track the status of your projects and get approvals quickly.",
  },
  {
    id: 3,
    title: "Statistics",
    description:
      "Analyze project data with detailed statistics.",
  },
  {
    id: 4,
    title: "Comments & Ratings",
    description:
      "Receive feedback and ratings on your projects from teachers and peers.",
  },
  {
    id: 5,
    title: "Searchable archives",
    description:
      "Access project archives for consultation and inspiration.",
  },
];

export const utilisateurs = [
  {
    id: 1,
    Icon: FaUserGraduate,
    title: "Étudiants",
    description:
      "Soumettez vos projets, suivez leur progression et apportez des modifications facilement.",
  },
  {
    id: 2,
    Icon: FaChalkboardTeacher,
    title: "Enseignants",
    description:
      "Validez, commentez et évaluez les projets pour guider vos étudiants efficacement.",
  },
  {
    id: 3,
    Icon: FaUserCog, // Changed icon to FaUserCog
    title: "Responsables",
    description:
      "Supervisez l'ensemble des projets, analysez les statistiques et exportez les données.",
  },
];
