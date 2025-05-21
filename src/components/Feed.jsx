import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loginRegistrationImg from "../assets/login_registration.svg";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    title: "Project 1",
    caption: "This is the first project post.",
    author: {
      id: 101,
      name: "Oualid 1",
      avatar: loginRegistrationImg,
    },
    likes: 10,
    comments: [{ id: 1, author: "Oualid 7", text: "Nice project!" }],
    thumbnail: loginRegistrationImg,
  },
  {
    id: 2,
    title: "Project 2",
    caption: "This is the second project post.",
    author: {
      id: 102,
      name: "Oualid 2",
      avatar: loginRegistrationImg,
    },
    likes: 15,
    comments: [],
    thumbnail: loginRegistrationImg,
  },
  {
    id: 3,
    title: "Project 3",
    caption: "This is the third project post.",
    author: {
      id: 103,
      name: "Oualid 3",
      avatar: loginRegistrationImg,
    },
    likes: 20,
    comments: [],
    thumbnail: loginRegistrationImg,
  },
];

const whoToFollow = [
  { id: 201, name: "Hossam E.", avatar: loginRegistrationImg },
  { id: 202, name: "Jilali E.", avatar: loginRegistrationImg },
  { id: 203, name: "Abdelbasset A.", avatar: loginRegistrationImg },
];

const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [likedPosts, setLikedPosts] = useState([]); // store liked post ids
  const [showComments, setShowComments] = useState({}); // { [postId]: true/false }
  const [commentInputs, setCommentInputs] = useState({}); // { [postId]: "" }
  const navigate = useNavigate();

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      // Unlike
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      // Like
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
      setLikedPosts([...likedPosts, postId]);
    }
  };
  //   const handleProfileClick = (authorId) => {
  //     navigate(`/profile/${authorId}`);
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleToggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const handleCommentInput = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), author: "You", text },
              ],
            }
          : post
      )
    );
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <>
      <SidebarTrigger />
      <div className="w-full flex justify-center bg-blue-50 dark:bg-blue-2-dark py-8 min-h-screen">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Feed Center */}
          <div className="w-full md:w-2/3 flex flex-col gap-6 px-4 sm:px-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-blue-1-dark rounded-lg shadow-md p-4"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full mr-2 cursor-pointer border-2 border-blue-200"
                    onClick={handleProfileClick}
                  />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-50">
                    {post.author.name}
                  </h3>
                </div>
                <img
                  src={post.thumbnail}
                  alt="Project thumbnail"
                  className="w-full h-56 object-cover rounded-md mb-3 border border-blue-100"
                />
                <h2 className="text-xl font-bold mb-1 text-blue-900 dark:text-blue-50">
                  {post.title}
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
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <FaComment /> <span>{post.comments.length}</span>
                  </button>
                </div>
                {showComments[post.id] && (
                  <div className="mt-2 border-t border-blue-100 pt-2">
                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-2">
                      {post.comments.length === 0 && (
                        <span className="text-gray-400 text-sm">
                          No comments yet.
                        </span>
                      )}
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="text-sm text-gray-800 dark:text-blue-50 bg-blue-50 dark:bg-blue-2-dark rounded px-2 py-1"
                        >
                          <span className="font-semibold mr-1">
                            {comment.author}:
                          </span>
                          {comment.text}
                        </div>
                      ))}
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
    </>
  );
};

export default Feed;
