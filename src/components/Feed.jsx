import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loginRegistrationImg from "../assets/login_registration.svg";
import apiClient from "../services/apiClient";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { SidebarTrigger } from "./ui/sidebar";

const whoToFollow = [
  { id: 200, name: "Oualid C.", avatar: loginRegistrationImg },
  { id: 201, name: "Hossam E.", avatar: loginRegistrationImg },
  { id: 202, name: "Jilali E.", avatar: loginRegistrationImg },
  { id: 203, name: "Abdelbasset A.", avatar: loginRegistrationImg },
];
// Mock data for posts
// const mockPosts = [
//   {
//     id: 1,
//     title: "Project 1",
//     caption: "This is the first project post.",
//     author: {
//       id: 101,
//       name: "Oualid 1",
//       avatar: loginRegistrationImg,
//     },
//     likes: 10,
//     comments: [{ id: 1, author: "Oualid 7", text: "Nice project!" }],
//     thumbnail: loginRegistrationImg,
//   },
//   {
//     id: 2,
//     title: "Project 2",
//     caption: "This is the second project post.",
//     author: {
//       id: 102,
//       name: "Oualid 2",
//       avatar: loginRegistrationImg,
//     },
//     likes: 15,
//     comments: [],
//     thumbnail: loginRegistrationImg,
//   },
//   {
//     id: 3,
//     title: "Project 3",
//     caption: "This is the third project post.",
//     author: {
//       id: 103,
//       name: "Oualid 3",
//       avatar: loginRegistrationImg,
//     },
//     likes: 20,
//     comments: [],
//     thumbnail: loginRegistrationImg,
//   },
// ];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); // store liked post ids
  const [showComments, setShowComments] = useState({}); // { [postId]: true/false }
  const [commentInputs, setCommentInputs] = useState({}); // { [postId]: "" }
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Function to open modal
  const handleImageClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    // Re-fetch projects or update the specific project in state if needed
    // For simplicity, we'll rely on the state updates from like/comment handlers
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get("/all-projets");
        setPosts(response.data);

        // Initialize likedPosts state based on the is_liked_by_user flag from the backend
        const initialLikedPosts = response.data
          .filter((post) => post.is_liked_by_user)
          .map((post) => post.id);
        setLikedPosts(initialLikedPosts);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLike = async (postId) => {
    console.log(`Like button clicked for post ID: ${postId}`); // Log click
    // Find the post in the current state
    const postToLike = posts.find((post) => post.id === postId);

    // Determine if the user has already liked this post (assuming backend includes likes for current user or a liked status)
    // For now, we'll use the likedPosts state which needs to be initialized from backend data
    const isLiked = likedPosts.includes(postId);

    try {
      const response = await apiClient.post(`/projets/${postId}/likes`);

      // Update the local likedPosts state based on the backend response
      if (response.data.liked) {
        setLikedPosts([...likedPosts, postId]);
      } else {
        setLikedPosts(likedPosts.filter((id) => id !== postId));
      }

      // Update the likes count in the posts state
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: response.data.likes_count }
            : post
        )
      );

      // Update the selectedProject state if the liked post is currently in the modal
      if (selectedProject && selectedProject.id === postId) {
        setSelectedProject((prevProject) => ({
          ...prevProject,
          likes_count: response.data.likes_count,
        }));
      }
    } catch (error) {
      console.error(
        "Error toggling like:",
        error.response ? error.response.data : error.message
      ); // Log detailed error
      // Optionally show an error message to the user
    }
  };
  //   const handleProfileClick = (authorId) => {
  //     navigate(`/profile/${authorId}`);
  const handleProfileClick = (authorId) => {
    // navigate(`/profile/${authorId}`);
  };

  const handleToggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const handleCommentInput = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    try {
      const response = await apiClient.post(`/projets/${postId}/comments`, {
        comment: text,
      });

      // Get the comment data from the response
      const newCommentData = response.data.comment;

      // Update the posts state with the new comment
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newCommentData] }
            : post
        )
      );

      // Clear the comment input for this post
      setCommentInputs({ ...commentInputs, [postId]: "" });

      // Update the selectedProject state if the commented post is currently in the modal
      if (selectedProject && selectedProject.id === postId) {
        setSelectedProject((prevProject) => ({
          ...prevProject,
          comments: [...prevProject.comments, newCommentData],
        }));
        console.log(`Updated selectedProject comments for post ID ${postId}`);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <>
      <div className="md:hidden flex justify-start items-center">
        <SidebarTrigger />
      </div>
      <div className="w-full flex justify-center bg-blue-50 dark:bg-blue-2-dark pb-8 min-h-screen">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Feed Center */}
          <div className="w-full md:w-2/3 flex flex-col gap-6 px-4 sm:px-6">
            {isLoading && (
              <p className="text-center text-blue-500">Loading projects...</p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!isLoading && !error && posts.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No projects to display.
              </p>
            )}

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-blue-1-dark rounded-lg shadow-md p-4"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={
                      post.user?.profile_photo_url
                        ? `${import.meta.env.VITE_STORAGE_URL}/${
                            post.user.profile_photo_url
                          }`
                        : loginRegistrationImg
                    }
                    alt={post.user?.name || "User"}
                    className="w-10 h-10 rounded-full mr-2 cursor-pointer border-2 border-blue-200"
                    onClick={() => handleProfileClick(post.user?.id)}
                  />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-50">
                    {post.user?.name || "Unknown User"}
                  </h3>
                </div>
                <img
                  src={
                    post.image
                      ? `${import.meta.env.VITE_STORAGE_URL}/${post.image}`
                      : loginRegistrationImg
                  }
                  alt="Project thumbnail"
                  className="w-full h-96 object-cover rounded-md mb-3 border border-blue-100 cursor-pointer"
                  onClick={() => handleImageClick(post)}
                />
                <h2 className="text-xl font-bold mb-1 text-blue-900 dark:text-blue-50">
                  {post.titre}
                </h2>
                <p className="text-gray-700 dark:text-blue-100 mb-4">
                  {post.caption}
                </p>
                <div className="flex space-x-6 mb-2">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${
                      likedPosts.includes(post.id)
                        ? "text-red-500"
                        : "text-gray-500 hover:text-red-500"
                    } focus:outline-none`}
                  >
                    {likedPosts.includes(post.id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}{" "}
                    <span>{post.likes_count || 0}</span>
                  </button>
                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <FaComment />{" "}
                    <span>
                      {post.comments_count ||
                        (post.comments ? post.comments.length : 0)}
                    </span>
                  </button>
                </div>
                {showComments[post.id] && (
                  <div className="mt-2 border-t border-blue-100 pt-2">
                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-2">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="text-sm text-gray-800 dark:text-blue-50 bg-blue-50 dark:bg-blue-2-dark rounded px-2 py-1"
                          >
                            <span className="font-semibold mr-1">
                              {comment.user?.name || "Unknown User"}:
                            </span>
                            {comment.comment}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No comments yet.
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 rounded border border-blue-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-blue-2-dark dark:text-blue-50"
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) =>
                          handleCommentInput(post.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Right Sidebar */}
          <aside className="hidden md:block w-1/3">
            <div className="bg-white dark:bg-blue-1-dark rounded-lg shadow-md p-4 sticky top-32">
              <h2 className="text-lg font-bold mb-4 text-blue-900 dark:text-blue-50">
                Who to follow
              </h2>
              <ul className="flex flex-col gap-4">
                {whoToFollow.map((user) => (
                  <li key={user.id} className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-blue-200"
                    />
                    <span className="font-semibold text-blue-900 dark:text-blue-50">
                      {user.name}
                    </span>
                    <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">
                      Follow
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      {/* Render the modal */}
      <ProjectDetailsModal
        isOpen={showModal}
        onClose={handleCloseModal}
        project={selectedProject}
        // Pass down handlers if modal needs to perform these actions
        handleLike={handleLike}
        handleAddComment={handleAddComment}
        likedPosts={likedPosts}
        commentInputs={commentInputs} // Pass comment input state
        handleCommentInput={handleCommentInput} // Pass comment input handler
      />
    </>
  );
};

export default Feed;
