import React, { useState } from "react";
import apiClient from "../../services/apiClient";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AddUser = ({ onClose, onUserAdded }) => {
  const [nom, setNom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("etudiant");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [mot_de_passe_confirmation, setMotDePasseConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const roleMapping = {
    Student: "etudiant",
    Teacher: "prof",
    Admin: "admin",
  };

  const displayToInternalRole = (displayRole) => {
    return roleMapping[displayRole] || "etudiant";
  };

  const internalToDisplayRole = (internalRole) => {
    return (
      Object.keys(roleMapping).find(
        (key) => roleMapping[key] === internalRole
      ) || "Student"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (mot_de_passe !== mot_de_passe_confirmation) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const userData = {
      name: nom,
      username: username,
      email: email,
      role: role,
      password: mot_de_passe,
      password_confirmation: mot_de_passe_confirmation,
    };

    console.log("Sending user data:", userData);

    try {
      const response = await apiClient.post(`/admin/users`, userData);
      console.log("Response:", response);

      if (response.status === 201) {
        setSuccess(response.data.message || "User added successfully!");
        setNom("");
        setUsername("");
        setEmail("");
        setRole("etudiant");
        setMotDePasse("");
        setMotDePasseConfirmation("");
        if (onUserAdded) {
          onUserAdded(response.data.user);
        }
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(
          response.data.message ||
            "Failed to add user. Please check the details."
        );
      }
    } catch (err) {
      console.error("Error adding user:", err);
      console.log("Error response:", err.response?.data); 
      if (err.response && err.response.data) {
        const messages =
          Object.values(err.response.data.errors || {})
            .flat()
            .join(" ") || err.response.data.message;
        setError(
          messages ||
            "An error occurred while adding the user. Please try again."
        );
      } else {
        setError("An error occurred while adding the user. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-50 backdrop-blur-sm
        bg-black/30 overflow-auto md:pt-20 md:pb-20
      `}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-blue-50 dark:bg-blue-1 rounded-2xl shadow-lg p-8 transition-all relative w-[90%] max-w-[500px] h-auto max-h-[90%] overflow-y-auto
          scale-100 opacity-100 translate-y-0
        `} 
        style={{
          transition: "transform 0.3s ease, opacity 0.3s ease",
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
        }}
      >
        <style>{`
          /* Hide scrollbar for Webkit browsers */
          .overflow-y-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <button
          onClick={onClose}
          className="absolute top-4 right-2 px-6 py-4 rounded-full text-blue-1 dark:text-blue-50 hover:bg-[var(--color-blue-6)] hover:text-[var(--color-blue-1)] cursor-pointer"
          disabled={isLoading}
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-1 dark:text-blue-50">
          Add User
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-2 dark:text-blue-100 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="w-full border border-blue-3 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-4 dark:placeholder:text-blue-50 placeholder:opacity-50 text-blue-1 dark:text-blue-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-2 dark:text-blue-100 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-[var(--color-blue-3)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)] dark:placeholder:text-blue-50 placeholder:opacity-50 text-blue-1 dark:text-blue-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-2 dark:text-blue-100 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[var(--color-blue-3)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)] dark:placeholder:text-blue-50 placeholder:opacity-50 text-blue-1 dark:text-blue-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-2 dark:text-blue-100 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={mot_de_passe}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              minLength="8"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              className="w-full border border-[var(--color-blue-3)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)] dark:placeholder:text-blue-50 placeholder:opacity-50 text-blue-1 dark:text-blue-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-2 dark:text-blue-100 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={mot_de_passe_confirmation}
              onChange={(e) => setMotDePasseConfirmation(e.target.value)}
              required
              minLength="8"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              className="w-full border border-[var(--color-blue-3)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)] dark:placeholder:text-blue-50 placeholder:opacity-50 text-blue-1 dark:text-blue-50"
            />
            <p className="mt-1 text-sm text-gray-500">
              Please confirm your password.
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-2 dark:text-blue-100 mb-2">
              Role
            </label>
            <select
              value={internalToDisplayRole(role)}
              onChange={(e) => setRole(displayToInternalRole(e.target.value))}
              className="w-full border border-[var(--color-blue-3)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)] bg-blue-50 dark:bg-blue-1 text-blue-2 dark:text-blue-50 appearance-none"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
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
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[var(--color-blue-3)] text-[var(--color-background)] rounded-lg hover:bg-[var(--color-blue-4)] cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
