import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./pagination"; // Assuming this component is correct
import { FaEdit, FaTrash } from "react-icons/fa";
import ModifyUser from "./Modify"; // Ensure this component is implemented for API calls
import DeleteUser from "./deleteUser"; // Already modified to use API
import apiClient from "../../services/apiClient";

// Use Vite env variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Helper to format date (optional)
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-CA", {
      // Example: YYYY-MM-DD
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch (e) {
    return dateString; // return original if invalid
  }
};

const UserManagementDashBoard = ({
  itemsPerPage = 10,
  refreshTrigger,
  roleFilter = "",
  searchTerm = "",
}) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (
    page = 1,
    search = searchTerm,
    role = roleFilter
  ) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("page", page);
      if (search) params.append("search_nom", search);
      if (role) params.append("filter_role", role);

      const response = await apiClient.get(`/admin/users?${params.toString()}`);
      setUsers(response.data.data || []);
      setCurrentPage(response.data.current_page || 1);
      setTotalPages(response.data.last_page || 1);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Could not load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchTerm, roleFilter);
  }, [currentPage, searchTerm, roleFilter, refreshTrigger]); // Re-fetch if page, search, role or refreshTrigger changes

  const handlePageChange = (page) => {
    setCurrentPage(page); // This will trigger useEffect to fetch new page data
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModifyPopup(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeletePopup(true);
  };

  const handleUserModified = (updatedUser) => {
    // Option 1: Refetch all users to ensure data consistency
    fetchUsers(currentPage, searchTerm, roleFilter);
    // Option 2: Update locally (more complex if sorting/filtering changes position)
    // setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setShowModifyPopup(false);
    setSelectedUser(null);
  };

  const handleUserDeleted = (deletedUserId) => {
    // Option 1: Refetch
    // fetchUsers(currentPage, searchTerm, roleFilter);
    // Check if the current page becomes empty after deletion
    if (users.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to previous page
    } else {
      fetchUsers(currentPage, searchTerm, roleFilter); // Refetch current page
    }

    // Option 2: Update locally
    // setUsers(prevUsers => prevUsers.filter(u => u.id !== deletedUserId));
    setShowDeletePopup(false);
    setSelectedUser(null);
  };

  const handleClosePopup = () => {
    setShowModifyPopup(false);
    setShowDeletePopup(false);
    setSelectedUser(null);
  };

  if (loading && users.length === 0) {
    // Show loading only if no users are displayed yet
    return <div className="p-5 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="p-5 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-5 min-h-fit">
      {showModifyPopup &&
        selectedUser && ( // Ensure selectedUser is not null
          <ModifyUser
            user={selectedUser}
            onClose={handleClosePopup}
            onUserModified={handleUserModified} // Pass callback to handle update
          />
        )}
      {showDeletePopup &&
        selectedUser && ( // Ensure selectedUser is not null
          <DeleteUser
            user={selectedUser}
            onClose={handleClosePopup}
            onConfirmDelete={handleUserDeleted} // Changed from onConfirm to onUserDeleted for clarity
          />
        )}
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        {users.length > 0 ? (
          <table className="w-full">
            <thead className="bg-blue-100 dark:bg-blue-1-dark border-b-2 border-blue-300 dark:border-blue-50">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                  Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                  Email
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                  Role
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50">
                  Date Inscription
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left text-blue-800 dark:text-blue-50 w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200 dark:divide-blue-50">
              {users.map(
                (
                  user // Changed 'row' to 'user' for clarity
                ) => (
                  <tr
                    key={user.id}
                    className={
                      user.id % 2 === 0 // Or use index if IDs are not sequential
                        ? "bg-blue-50 dark:bg-blue-2-dark"
                        : "bg-white dark:bg-blue-1-dark"
                    }
                  >
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      {user.nom} {/* Laravel model uses 'nom' */}
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap capitalize">
                      {user.role}
                    </td>
                    <td className="p-3 text-sm text-blue-900 dark:text-blue-50 whitespace-nowrap">
                      {/* Laravel model has 'date_inscription', not 'lastLogin' in the provided PHP */}
                      {formatDate(user.created_at)}
                    </td>
                    <td className="p-3 text-sm text-blue-900 whitespace-nowrap flex gap-4">
                      <FaEdit
                        onClick={() => handleEdit(user)}
                        className="text-[var(--color-blue-3)] hover:text-[var(--color-blue-4)] cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                        title="Edit"
                      />
                      <FaTrash
                        onClick={() => handleDelete(user)}
                        className="text-red-500 hover:text-red-600 cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                        title="Delete"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-blue-800 dark:text-blue-50 font-semibold p-5">
            {loading ? "Loading..." : "Aucun utilisateur trouvé."}
          </p>
        )}
      </div>

      {/* Responsive Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-blue-1-dark space-y-3 p-4 rounded-lg shadow"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-900 dark:text-blue-50 font-medium">
                {user.nom}
              </div>
              <div className="flex gap-4">
                <FaEdit
                  onClick={() => handleEdit(user)}
                  className="text-[var(--color-blue-3)] hover:text-[var(--color-blue-4)] cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                  title="Edit"
                />
                <FaTrash
                  onClick={() => handleDelete(user)}
                  className="text-red-500 hover:text-red-600 cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                  title="Delete"
                />
              </div>
            </div>
            <div className="text-sm text-blue-900 dark:text-blue-50">
              Email: {user.email}
            </div>
            <div className="text-sm text-blue-900 dark:text-blue-50 capitalize">
              Role: {user.role}
            </div>
            <div className="text-sm text-blue-900 dark:text-blue-50">
              Registered: {formatDate(user.created_at)}
            </div>
          </div>
        ))}
        {users.length === 0 && !loading && (
          <p className="text-center text-blue-800 dark:text-blue-50 font-semibold col-span-full p-5">
            Aucun utilisateur trouvé.
          </p>
        )}
      </div>

      {users.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserManagementDashBoard;
