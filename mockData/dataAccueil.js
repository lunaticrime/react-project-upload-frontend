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
    title: "Soumission de projet",
    description: "Soumettez facilement vos projets académiques pour centralisation.",
  },
  {
    id: 2,
    title: "Suivi & Validation",
    description: "Suivez l'état de vos projets et obtenez des validations rapidement.",
  },
  {
    id: 3,
    title: "Statistiques",
    description: "Analysez les données des projets grâce à des statistiques détaillées.",
  },
  {
    id: 4,
    title: "Commentaires & notes",
    description: "Recevez des commentaires et des notes pour améliorer vos projets.",
  },
  {
    id: 5,
    title: "Archives consultables",
    description: "Accédez aux archives des projets pour consultation et inspiration.",
  },
];

export const utilisateurs = [
  {
    id: 1,
    Icon: FaUserGraduate,
    title: "Étudiants",
    description: "Soumettez vos projets, suivez leur progression et apportez des modifications facilement.",
  },
  {
    id: 2,
    Icon: FaChalkboardTeacher,
    title: "Enseignants",
    description: "Validez, commentez et évaluez les projets pour guider vos étudiants efficacement.",
  },
  {
    id: 3,
    Icon: FaUserCog, // Changed icon to FaUserCog
    title: "Responsables",
    description: "Supervisez l'ensemble des projets, analysez les statistiques et exportez les données.",
  },
];
