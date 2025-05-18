import React, { useState } from "react";
// import { X } from "react-feather";

const ModifyUser = ({ user, onClose }) => {
  const [role, setRole] = useState(user?.role || "Etudiant"); // Default role

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    console.log("Form submitted"); // Add your form submission logic here
    onClose(); // Close the modal after submission
  };

  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-50 backdrop-blur-sm
        ${user ? "visible bg-black/30" : "invisible"}
      `}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-[var(--color-background)] rounded-2xl shadow-lg p-8 transition-all relative w-[500px] max-w-full
          ${
            user
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-125 opacity-0 translate-y-4"
          }
        `}
        style={{
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--color-blue-3)] hover:bg-[var(--color-blue-6)] hover:text-[var(--color-blue-1)]"
        >
          {/* <X /> */}X
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--color-blue-1)]">
          Modifier Utilisateur
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-blue-2)] mb-2">
              Nom
            </label>
            <input
              type="text"
              defaultValue={user?.name || ""}
              className="w-full border border-[var(--color-blue-3)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-blue-2)] mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              className="w-full border border-[var(--color-blue-3)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-blue-2)] mb-2">
              Role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-[var(--color-blue-3)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-4)] bg-[var(--color-background)] text-[var(--color-blue-2)] appearance-none"
              >
                <option value="Etudiant">Etudiant</option>
                <option value="Prof">Prof</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-[var(--color-blue-3)]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--color-blue-3)] text-[var(--color-background)] rounded-lg hover:bg-[var(--color-blue-4)]"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyUser;
