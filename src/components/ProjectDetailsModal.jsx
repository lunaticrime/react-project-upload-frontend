import React, { Fragment } from "react";
import { FaTimes, FaRegHeart, FaComment, FaHeart } from "react-icons/fa"; // Import close icon, other icons, and FaHeart
import loginRegistrationImg from "../assets/login_registration.svg"; // Import placeholder image

const ProjectDetailsModal = ({
  isOpen,
  onClose,
  project,
  handleLike, // Receive handleLike from parent
  handleAddComment, // Receive handleAddComment from parent
  likedPosts, // Receive likedPosts state from parent
  commentInputs, // Receive commentInputs state from parent
  handleCommentInput, // Receive handleCommentInput handler from parent
}) => {
  if (!isOpen || !project) return null;

  const isLiked = likedPosts.includes(project.id); // Determine if the project is liked

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-blue-1-dark rounded-lg shadow-xl p-6 relative w-full max-w-5xl max-h-[90vh] overflow-y-auto transition-all transform scale-100 opacity-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-700 transition-colors duration-200"
          aria-label="Close project details dialog"
        >
          <FaTimes className="h-5 w-5" />
        </button>

        {/* Modal Content - Two Columns */}
        <div className="flex flex-col md:flex-row gap-6 mt-4 items-center">
          {/* Left Column - Image */}
          <div className="w-full md:w-3/5 flex-shrink-0 ">
            <img
              src={
                project.image
                  ? `${import.meta.env.VITE_STORAGE_URL}${
                      project.image.startsWith("/") ? "" : "/"
                    }${project.image}`
                  : loginRegistrationImg // Use imported placeholder
              }
              alt={project.titre}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          {/* Right Column - Details and Interactions */}
          <div className="w-full md:w-2/5 flex flex-col">
            <h2 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-50">
              {project.titre}
            </h2>
            <p className="text-gray-700 dark:text-blue-100 mb-4">
              {project.caption}
            </p>
            <p className="text-gray-800 dark:text-blue-50 mb-4 text-sm">
              {project.description}
            </p>

            {/* Like and Comment Buttons */}
            <div className="flex space-x-4 mb-4 border-t border-gray-200 dark:border-blue-700 pt-4">
              {/* Like Button */}
              <button
                onClick={() => handleLike(project.id)} // Use handleLike prop
                className={`flex items-center gap-1 ${
                  isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}{" "}
                {/* Conditional rendering based on isLiked */}
                <span>{project.likes_count || 0}</span>
              </button>
              {/* Comment Button */}
              <button
                onClick={() => handleToggleComments(project.id)} // Assuming handleToggleComments will be passed or managed differently
                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <FaComment />
                <span>{project.comments ? project.comments.length : 0}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-4 border-t border-gray-200 dark:border-blue-700 pt-4 flex-grow">
              <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-50">
                Comments
              </h3>
              {/* Add Comment Input - Moved to the start of comments section */}
              <div className="mb-4 flex gap-2 items-center">
                <input
                  type="text"
                  className="flex-grow rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 px-3 py-2 text-sm text-gray-900 dark:text-blue-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a comment..."
                  value={commentInputs[project.id] || ""}
                  onChange={(e) =>
                    handleCommentInput(project.id, e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment(project.id);
                  }}
                />
                <button
                  onClick={() => handleAddComment(project.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
                >
                  Post
                </button>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
                {/* Map through project.comments */}{" "}
                {/* Placeholder comments */}
                {project.comments && project.comments.length > 0 ? (
                  project.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="text-sm text-gray-800 dark:text-blue-50 bg-gray-100 dark:bg-blue-700 rounded px-3 py-2"
                    >
                      <span className="font-semibold">
                        {comment.user?.name || "Unknown User"}:
                      </span>{" "}
                      {comment.comment}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No comments yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
