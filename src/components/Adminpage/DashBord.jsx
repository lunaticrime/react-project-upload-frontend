import React, { useState } from "react";
import Pagination from "./pagination";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import ModifyUser from "./Modify"; // Import ModifyUser component
import DeleteUser from "./deleteUser"; // Import DeleteUser component

const DashBord = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModifyPopup, setShowModifyPopup] = useState(false); // State to toggle ModifyUser popup
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State to toggle DeleteUser popup
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user data

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user data
    setShowModifyPopup(true); // Show the ModifyUser popup
  };

  const handleDelete = (user) => {
    setSelectedUser(user); // Set the selected user data
    setShowDeletePopup(true); // Show the DeleteUser popup
  };

  const handleConfirmDelete = () => {
    console.log(`User ${selectedUser?.name} deleted`); // Add deletion logic here
    setShowDeletePopup(false); // Close the DeleteUser popup
    setSelectedUser(null); // Clear selected user data
  };

  const handleClosePopup = () => {
    setShowModifyPopup(false); // Close the ModifyUser popup
    setShowDeletePopup(false); // Close the DeleteUser popup
    setSelectedUser(null); // Clear selected user data
  };

  return (
    <div className="p-5 h-screen">
      {/* ModifyUser Popup */}
      {showModifyPopup && (
        <ModifyUser user={selectedUser} onClose={handleClosePopup} />
      )}
      {/* DeleteUser Popup */}
      {showDeletePopup && (
        <DeleteUser
          user={selectedUser}
          onClose={handleClosePopup}
          onConfirm={handleConfirmDelete}
        />
      )}
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        {data.length > 0 ? (
          <table className="w-full">
            <thead className="bg-blue-100 border-b-2 border-blue-300">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                  Nom
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                  Email
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                  Role
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800">
                  Dernière Connexion
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 w-32"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200">
              {currentData.map((row) => (
                <tr
                  key={row.id}
                  className={row.id % 2 === 0 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                    {row.email}
                  </td>
                  <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                    {row.role}
                  </td>
                  <td className="p-3 text-sm text-blue-900 whitespace-nowrap">
                    {row.lastLogin}
                  </td>
                  <td className="p-3 text-sm text-blue-900 whitespace-nowrap flex gap-4">
                    <FaEdit
                      onClick={() => handleEdit(row)} // Call handleEdit on click
                      className="text-[var(--color-blue-3)] hover:text-[var(--color-blue-4)] cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                      title="Modifier"
                    />
                    <FaTrash
                      onClick={() => handleDelete(row)} // Call handleDelete on click
                      className="text-red-500 hover:text-red-600 cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                      title="Supprimer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-blue-800 font-semibold">
            Aucun résultat trouvé.
          </p>
        )}
      </div>

      {/* Responsive Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {currentData.map((row) => (
          <div
            key={row.id}
            className="bg-white space-y-3 p-4 rounded-lg shadow"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-900 font-medium">
                {row.name}
              </div>
              <div className="flex gap-4">
                <FaEdit
                  onClick={() => handleEdit(row)} // Call handleEdit on click
                  className="text-[var(--color-blue-3)] hover:text-[var(--color-blue-4)] cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                  title="Modifier"
                />
                <FaTrash
                  onClick={() => handleDelete(row)} // Call handleDelete on click
                  className="text-red-500 hover:text-red-600 cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                  title="Supprimer"
                />
              </div>
            </div>
            <div className="text-sm text-blue-900">{row.email}</div>
            <div className="text-sm text-blue-900">{row.role}</div>
            <div className="text-sm text-blue-900">{row.lastLogin}</div>
          </div>
        ))}
      </div>

      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DashBord;
