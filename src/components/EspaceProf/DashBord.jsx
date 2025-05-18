import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { filterData } from "../../../mockData/dataEspaceProf";
import Pagination from "./pagination";
import { FaInfoCircle } from "react-icons/fa";

const filterData = {
  years: [
    { id: 0, value: "default", label: "Filtrer par année" }, // Default value
    { id: 1, value: "2023", label: "2023" },
    { id: 2, value: "2022", label: "2022" },
    { id: 3, value: "2021", label: "2021" },
    { id: 4, value: "2020", label: "2020" },
  ],
  modules: [
    { id: 0, value: "default", label: "Filtrer par module" }, // Default value
    { id: 1, value: "Module 1", label: "Module 1" }, // Ensure values match tableData
    { id: 2, value: "Module 2", label: "Module 2" },
    { id: 3, value: "Module 3", label: "Module 3" },
    { id: 4, value: "Module 4", label: "Module 4" },
  ],
  status: [
    { id: 0, value: "default", label: "Filtrer par status" }, // Default value
    { id: 1, value: "pending", label: "🟡 En Attente" },
    { id: 2, value: "approved", label: "🟢 Validé" },
    { id: 3, value: "rejected", label: "🔴 Refusé" },
  ],
};
const DashBord = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Initialize navigate
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusLabel = (status) => {
    const statusItem = filterData.status.find((item) => item.value === status);
    return statusItem ? statusItem.label : status;
  };

  return (
    <div className="p-5 h-screen">
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-blue-100 border-b-2 border-blue-300">
            <tr>
              <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left text-blue-800"></th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                Nom du projet
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                Étudiant
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                Année
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                Module
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-200">
            {currentData.map((row) => (
              <tr
                key={row.id}
                className={row.id % 2 === 0 ? "bg-blue-50" : "bg-white"}
              >
                <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/info-projet/${row.id}`)} // Pass only the ID
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FaInfoCircle className="mr-1 text-xl" />
                  </button>
                </td>
                <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                  {row.projectName}
                </td>
                <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                  {row.student}
                </td>
                <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                  {row.year}
                </td>
                <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                  {row.module}
                </td>
                <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg inline-block text-left ${
                      row.status === "approved"
                        ? "text-green-900 bg-green-100"
                        : row.status === "pending"
                        ? "text-yellow-900 bg-yellow-100"
                        : "text-red-900 bg-red-100"
                    }`}
                    style={{ width: "110px" }}
                  >
                    {getStatusLabel(row.status)}
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
            className="bg-white space-y-3 p-4 rounded-lg shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <div className="text-blue-500">{row.year}</div>
                <div>
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg ${
                      row.status === "approved"
                        ? "text-green-900 bg-green-100"
                        : row.status === "pending"
                        ? "text-yellow-900 bg-yellow-100"
                        : "text-red-900 bg-red-100"
                    }`}
                  >
                    {getStatusLabel(row.status)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/info-projet/${row.id}`)} // Pass only the ID
                className="text-blue-600 hover:underline flex items-center"
              >
                <FaInfoCircle className="text-xl" />
              </button>
            </div>
            <div className="text-sm text-blue-900">{row.projectName}</div>
            <div className="text-sm text-blue-900 font-medium">
              {row.student}
            </div>
            <div className="text-sm font-medium text-blue-800">
              {row.module}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DashBord;
