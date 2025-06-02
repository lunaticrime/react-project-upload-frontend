// EspaceProf/DashBord.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
// import Pagination from "./pagination"; // Supprimé : la pagination est gérée par EspaceProf
import apiClient from "../../services/apiClient";

// Define filterData for status locally
const filterDataStatus = {
  status: [
    { value: "approved", label: "🟢 Approved" },
    { value: "pending", label: "🟡 Pending" },
    { value: "rejected", label: "🔴 Rejected" },
    // Add more statuses if needed
  ],
};

// onUpdateStatus now expects (projectId, newStatus, comment)
// data est déjà paginée par EspaceProf.
// Les props totalItems, currentPage, onPageChange ne sont plus nécessaires ici si la pagination est externe.
const DashBord = ({ itemsPerPage, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusLabel = (statusValue) => {
    const statusItem = filterDataStatus.status.find(
      (item) => item.value === statusValue
    );
    return statusItem ? statusItem.label : statusValue;
  };

  const handleNavigateToProject = (projectId) => {
    navigate(`/info-projet/${projectId}`);
  };

  return (
    <div className="p-5 min-h-fit dashbord-section">
      {currentData.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <p className="text-xl">Aucun projet trouvé.</p>
          <p>Essayez d'ajuster vos filtres ou votre recherche.</p>
        </div>
      ) : (
        <>
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-blue-100 dark:bg-blue-1-dark border-b-2 border-blue-300 dark:border-blue-50">
                <tr>
                  <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50"></th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                    Nom du projet
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                    Étudiant
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                    Année
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                    Module
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200 dark:divide-blue-50">
                {currentData.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      row.id % 2 === 0
                        ? "bg-blue-50 dark:bg-blue-2-dark"
                        : "bg-white dark:bg-blue-1-dark"
                    }
                  >
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      <button
                        onClick={() => handleNavigateToProject(row.id)}
                        className="text-blue-600 dark:text-blue-200 hover:underline flex items-center"
                        aria-label={`Détails du projet ${row.titre}`}
                      >
                        <FaInfoCircle className="mr-1 text-xl" />
                      </button>
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      {row.titre}
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      {row.user ? row.user.name : "N/A"}
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      {row.annee || "N/A"}
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      {row.module ? row.module.name || row.module.nom : "N/A"}
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      <span
                        className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg inline-block text-left ${
                          row.approval_status === "approved"
                            ? "text-green-900 bg-green-100 dark:text-green-200 dark:bg-green-900"
                            : row.approval_status === "pending"
                            ? "text-yellow-900 bg-yellow-100 dark:text-yellow-200 dark:bg-yellow-900"
                            : row.approval_status === "rejected"
                            ? "text-red-900 bg-red-100 dark:text-red-200 dark:bg-red-900"
                            : "text-gray-900 bg-gray-100 dark:text-gray-200 dark:bg-gray-900"
                        }`}
                        style={{ width: "110px" }}
                      >
                        {getStatusLabel(row.approval_status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {currentData.map((row) => (
              <div
                key={row.id}
                className="bg-white dark:bg-blue-1-dark space-y-3 p-4 rounded-lg shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="text-blue-500 dark:text-blue-50 font-semibold">
                      {row.annee || "N/A"}
                    </div>
                    <div>
                      <span
                        className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg ${
                          row.approval_status === "approved"
                            ? "text-green-900 bg-green-100 dark:text-green-200 dark:bg-green-900"
                            : row.approval_status === "pending"
                            ? "text-yellow-900 bg-yellow-100 dark:text-yellow-200 dark:bg-yellow-900"
                            : row.approval_status === "rejected"
                            ? "text-red-900 bg-red-100 dark:text-red-200 dark:bg-red-900"
                            : "text-gray-900 bg-gray-100 dark:text-gray-200 dark:bg-gray-900"
                        }`}
                      >
                        {getStatusLabel(row.approval_status)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNavigateToProject(row.id)}
                    className="text-blue-600 dark:text-blue-200 hover:underline flex items-center"
                    aria-label={`Détails du projet ${row.titre}`}
                  >
                    <FaInfoCircle className="text-xl" />
                  </button>
                </div>
                <div className="text-sm text-blue-900 dark:text-blue-50 font-semibold">
                  {row.titre}
                </div>
                <div className="text-sm text-blue-900 dark:text-blue-50">
                  Étudiant: {row.user ? row.user.name : "N/A"}
                </div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-50">
                  Module:{" "}
                  {row.module ? row.module.name || row.module.nom : "N/A"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashBord;
