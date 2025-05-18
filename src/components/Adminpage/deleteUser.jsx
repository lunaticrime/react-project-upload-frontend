import React from "react";
// import { X } from "react-feather";

const DeleteUser = ({ user, onClose, onConfirm }) => {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-50 backdrop-blur-sm
        bg-black/30
      `}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-[var(--color-background)] rounded-2xl shadow-lg p-8 transition-all relative w-[500px] max-w-full
          scale-100 opacity-100 translate-y-0
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
        <h2 className="text-xl font-bold text-center mb-6 text-[var(--color-blue-1)]">
          Supprimer Utilisateur
        </h2>
        <p className="text-sm text-[var(--color-blue-2)] mb-6 text-center">
          Êtes-vous sûr de vouloir supprimer l'utilisateur suivant ?
        </p>
        <div className="mb-6 border-t border-b border-[var(--color-blue-3)] py-4">
          <p className="text-sm font-medium text-[var(--color-blue-3)] flex justify-between">
            <span className="font-bold">Nom:</span>
            <span>{user?.name}</span>
          </p>
          <p className="text-sm font-medium text-[var(--color-blue-3)] flex justify-between mt-2">
            <span className="font-bold">Email:</span>
            <span>{user?.email}</span>
          </p>
          <p className="text-sm font-medium text-[var(--color-blue-3)] flex justify-between mt-2">
            <span className="font-bold">Role:</span>
            <span>{user?.role}</span>
          </p>
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
            type="button"
            onClick={onConfirm}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
