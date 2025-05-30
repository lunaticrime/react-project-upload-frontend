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
          bg-blue-50 dark:bg-blue-1 rounded-2xl shadow-lg p-8 transition-all relative w-[500px] max-w-full
          scale-100 opacity-100 translate-y-0
        `}
        style={{
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-6 py-4 rounded-full text-blue-1 dark:text-blue-50 hover:bg-[var(--color-blue-6)] hover:text-[var(--color-blue-1)] cursor-pointer"
        >
          {/* <X /> */}X
        </button>
        <h2 className="text-xl font-bold text-center mb-6 text-blue-1 dark:text-blue-50">
          Delete User
        </h2>
        <p className="text-sm mb-6 text-center text-blue-2 dark:text-blue-100">
          Are you sure you want to delete the following user?
        </p>
        <div className="mb-6 border-t border-b border-[var(--color-blue-3)]  py-4">
          <p className="text-sm font-medium text-blue-2 dark:text-blue-100 flex justify-between">
            <span className="font-bold">Name:</span>
            <span>{user?.name}</span>
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
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
