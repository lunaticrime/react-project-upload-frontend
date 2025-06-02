import React, { useState } from "react";
import apiClient from "../../services/apiClient";

// Use Vite env variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const DeleteUser = ({ user, onClose, onConfirmDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!user || !user.id) {
      setError("User data is missing.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.delete(`/admin/users/${user.id}`);

      if (response.status === 200) {
        // alert(response.data.message || "User deleted successfully");
        if (onConfirmDelete) {
          onConfirmDelete(user.id); // Pass user id to parent for state update
        }
        onClose(); // Close the modal after successful deletion
      } else {
        setError(response.data.message || "Failed to delete user.");
        // alert(response.data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.error ||
            "An error occurred while deleting the user."
        );
      } else {
        setError("An error occurred while deleting the user.");
      }
      // alert("An error occurred while deleting the user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      // onClick={onClose} // Prevent closing on backdrop click
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-50 backdrop-blur-sm
        bg-black/30
      `}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-blue-50 dark:bg-blue-1 rounded-2xl shadow-lg p-8 transition-all relative w-[500px] max-w-full
          scale-100 opacity-100 translate-y-0
        `}
        style={{
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 px-6 py-4 rounded-full text-blue-1 dark:text-blue-50 hover:bg-[var(--color-blue-6)] hover:text-[var(--color-blue-1)] cursor-pointer"
        >
          X
        </button>
        <h2 className="text-xl font-bold text-center mb-6 text-blue-1 dark:text-blue-50">
          Delete User
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}
        <p className="text-sm mb-6 text-center text-blue-2 dark:text-blue-100">
          Are you sure you want to delete the following user? This action cannot
          be undone.
        </p>
        <div className="mb-6 border-t border-b border-[var(--color-blue-3)] py-4">
          <p className="text-sm font-medium text-blue-2 dark:text-blue-100 flex justify-between">
            <span className="font-bold">Name:</span>
            <span>{user?.nom || user?.name}</span>{" "}
            {/* Adjusted to 'nom' if that's what API returns */}
          </p>
          <p className="text-sm font-medium text-blue-2 dark:text-blue-100 flex justify-between mt-2">
            <span className="font-bold">Email:</span>
            <span>{user?.email}</span>
          </p>
          <p className="text-sm font-medium text-blue-2 dark:text-blue-100 flex justify-between mt-2">
            <span className="font-bold">Role:</span>
            <span>{user?.role}</span>
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
