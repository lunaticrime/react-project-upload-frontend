import React, { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import apiClient from "../services/apiClient";
import { useNavigate, useParams } from "react-router-dom";
// import { lazyLoad } from "../lazyLoad";
import FormCard from "./formCard";
import {
  FaSearch,
  FaPlus,
  FaRegFileArchive,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaQuoteLeft,
} from "react-icons/fa";
import ProfileTabs from "./updatedProfileTabs";
// const ProfileTabs = lazyLoad("./updatedProfileTabs");
import DraggableTabs from "./DraggableTabs";
// const DraggableTabs = lazyLoad("./DraggableTabs");
import SliderToggle from "./SliderToggle";
// const SliderToggle = lazyLoad("./SliderToggle");
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./ui/card";
import { useCommandMenu } from "./CommandMenuContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TabsDemo } from "./profileEdit";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

// Mock data for user profile
const mockUserData = {
  id: 1,
  name: "Oualid",
  username: "oualid",
  email: "oualid@example.com",
  bio: "Full Stack Developer & Student at ENSA Kenitra. Passionate about building cool things and learning new tech!",
  avatar: "./assets/login_registration.svg",
  skills: ["React", "Laravel", "Tailwind"],
  role: "student",
  projects_count: 6,
  followers_count: 120,
  following_count: 180,
  about:
    "Hi! I'm Oualid, a passionate developer who loves building web apps, learning new technologies, and collaborating with others. I enjoy solving problems and turning ideas into reality. When I'm not coding, you'll find me exploring new music, playing chess, or hanging out with friends.",
  social_links: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
  },
};

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "Project 1",
    caption: "Caption for Project 1",
    image: "./assets/login_registration.svg",
    status: "approved",
    approvedBy: "Dr. Oumaira",
    approvedDate: "2024-03-15",
    certificateUrl: "/certificates/project1.pdf",
    description: "A detailed description of Project 1 and its achievements.",
    technologies: ["React", "Node.js", "MongoDB"],
    duration: "3 months",
  },
  {
    id: 2,
    title: "Project 2",
    caption: "Caption for Project 2",
    image: "./assets/login_registration.svg",
    status: "pending",
    submittedDate: "2024-03-10",
    description: "A detailed description of Project 2 and its goals.",
    technologies: ["Python", "Django", "PostgreSQL"],
    duration: "2 months",
  },
  {
    id: 3,
    title: "Project 3",
    caption: "Caption for Project 3",
    image: "./assets/login_registration.svg",
    status: "refused",
    refusedDate: "2024-03-05",
    refusedReason: "Incomplete documentation",
    description: "A detailed description of Project 3 and its challenges.",
    technologies: ["Java", "Spring Boot", "MySQL"],
    duration: "4 months",
  },
  {
    id: 4,
    title: "Project 4",
    caption: "Caption for Project 4",
    image: "./assets/login_registration.svg",
    status: "approved",
    approvedBy: "Prof. Oumaira",
    approvedDate: "2024-02-28",
    certificateUrl: "/certificates/project4.pdf",
    description: "A detailed description of Project 4 and its innovations.",
    technologies: ["Vue.js", "Express", "Redis"],
    duration: "5 months",
  },
  {
    id: 5,
    title: "Project 5",
    caption: "Caption for Project 5",
    image: "./assets/login_registration.svg",
    status: "pending",
    submittedDate: "2024-03-12",
    description: "A detailed description of Project 5 and its objectives.",
    technologies: ["Angular", "Firebase", "TypeScript"],
    duration: "3 months",
  },
  {
    id: 6,
    title: "Project 6",
    caption: "Caption for Project 6",
    image: "./assets/login_registration.svg",
    status: "approved",
    approvedBy: "Dr. Oumaira",
    approvedDate: "2024-03-01",
    certificateUrl: "/certificates/project6.pdf",
    description: "A detailed description of Project 6 and its impact.",
    technologies: ["React Native", "GraphQL", "AWS"],
    duration: "6 months",
  },
];

const ProfileHeader = ({ isDarkMode, setIsDarkMode, isOpen, setIsOpen }) => {
  const { userIdInRoute } = useParams();
  const userIdToDisplay = userIdInRoute;

  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedProject, setSelectedProject] = useState(null);
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

  const { openCommandMenu } = useCommandMenu();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  const [editProfileData, setEditProfileData] = useState({
    name: "",
    username: "",
    bio: "",
    skills: [],
    about: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // useEffect for fetchCurrentAuthUser
  useEffect(() => {
    const fetchCurrentAuthUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log("Attempting to fetch authenticated user with token...");
          const response = await apiClient.get("/user");
          setAuthenticatedUser(response.data);
          console.log("Authenticated user fetched:", response.data);
        } catch (err) {
          console.error(
            "Failed to fetch current authenticated user (useEffect 1):",
            err
          );
          if (err.response && err.response.status === 401) {
            console.log(
              "Token invalid or expired. Clearing token and user from localStorage."
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      } else {
        console.log("No token found in localStorage for fetchCurrentAuthUser.");
      }
    };
    fetchCurrentAuthUser();
  }, [navigate]);

  // useEffect for fetchProfilePageData
  useEffect(() => {
    const fetchProfilePageData = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      let targetApiRoute;

      if (userIdToDisplay) {
        targetApiRoute = `/profiles/${userIdToDisplay}`;
      } else {
        if (!token) {
          setError("Veuillez vous connecter pour voir votre profil.");
          setIsLoading(false);
          return;
        }
        targetApiRoute = "/profile";
      }

      console.log(`Fetching profile data from ${targetApiRoute}`);
      try {
        const response = await apiClient.get(targetApiRoute);
        const profileData = response.data;
        setUserData(profileData);

        let displayedProjects = [];
        if (profileData.role === "etudiant" && profileData.projets_crees) {
          displayedProjects = profileData.projets_crees;
        } else if (profileData.role === "prof") {
          displayedProjects = profileData.projets_supervises || [];
          if (profileData.projets_crees) {
            displayedProjects = [
              ...new Set(
                [...displayedProjects, ...profileData.projets_crees].map(
                  (p) => p.id
                )
              ),
            ].map((id) =>
              [...displayedProjects, ...profileData.projets_crees].find(
                (p) => p.id === id
              )
            );
          }
        } else if (profileData.projets_crees) {
          displayedProjects = profileData.projets_crees;
        }
        setProjects(displayedProjects);
      } catch (err) {
        console.error(
          `Failed to fetch profile data from ${targetApiRoute}:`,
          err
        );
        if (err.response) {
          if (err.response.status === 401 && !userIdToDisplay) {
            setError("Session expirée ou invalide. Veuillez vous reconnecter.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } else if (err.response.status === 404) {
            setError("Profil non trouvé.");
            setUserData(null);
          } else {
            setError(
              err.response.data?.message ||
                err.message ||
                "Impossible de charger les données du profil."
            );
          }
        } else {
          setError(err.message || "Une erreur réseau est survenue.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userIdToDisplay || localStorage.getItem("token")) {
      fetchProfilePageData();
    } else if (!isLoading) {
      setError("Veuillez vous connecter pour accéder à cette page.");
      setIsLoading(false);
    }
  }, [userIdToDisplay, navigate]);

  // Add this useEffect to initialize editProfileData when userData changes
  useEffect(() => {
    if (userData) {
      setEditProfileData({
        name: userData.name || "",
        username: userData.username || "",
        bio: userData.bio || "",
        skills: userData.skills || [],
        about: userData.about || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    setEditProfileData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setEditError("Image size should be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setEditError("Please select an image file");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(false);
    setIsEditing(true);

    try {
      const formData = new FormData();
      formData.append("name", editProfileData.name);
      formData.append("username", editProfileData.username);
      formData.append("bio", editProfileData.bio);
      formData.append("about", editProfileData.about);
      formData.append("skills", JSON.stringify(editProfileData.skills));

      // Append the selected image if it exists
      if (selectedImage) {
        formData.append("profile_photo", selectedImage);
      }

      // Use the dedicated POST endpoint for profile updates that handles file uploads
      const response = await apiClient.post("/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type for FormData
        },
      });

      const updatedUserData = response.data.user;

      setUserData(updatedUserData);
      setEditSuccess(true);

      // Clear the selected image and preview after successful upload
      setSelectedImage(null);
      setImagePreview(null);

      // Update local storage if it's the current user's profile
      if (isCurrentUserProfile) {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            ...updatedUserData,
          })
        );
      }

      // Close the dialog after a short delay
      setTimeout(() => {
        setIsEditing(false);
        setEditSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Profile update failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join(" ")
          : "Failed to update profile. Please try again.");
      setEditError(errorMessage);
      setIsEditing(false);
    }
  };

  const handleProfileUpdate = (updatedUserDataFromModal) => {};

  const handleProjectCreated = (newProject) => {
    if (isCurrentUserProfile && userData?.role === "etudiant") {
      setProjects((prevProjects) => [newProject, ...prevProjects]);
    }
    setIsAddProjectDialogOpen(false);
  };

  const getStatusColor = (status) => {
    // ... (implementation)
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200";
    }
  };
  const getStatusText = (status) => {
    // ... (implementation)
    if (!status) return "N/A";
    const statusMap = {
      approved: "Approuvé",
      pending: "En attente",
      rejected: "Rejeté",
    };
    return (
      statusMap[status] || status.charAt(0).toUpperCase() + status.slice(1)
    );
  };

  const storageBaseUrl = "http://localhost:8000/storage/";
  const isCurrentUserProfile =
    authenticatedUser && userData && authenticatedUser.id === userData.id;

  if (isLoading && !userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement du profil...
      </div>
    );
  }
  if (error && !userData) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }
  if (!userData && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 dark:text-gray-400 p-4 text-center">
        <p>Impossible d'afficher le profil.</p>
        <p className="text-sm">Veuillez vérifier l'URL ou vous connecter.</p>
        <button
          onClick={() => navigate("/auth")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Aller à la page de connexion
        </button>
      </div>
    );
  }

  return userData ? (
    <div className={`relative z-10 ${isOpen ? "pointer-events-none" : ""}`}>
      <div className="h-[55vh] lg:h-[50vh] bg-blue-50 dark:bg-blue-1-dark text-blue-50">
        <div className="bg-linear-90 from-blue-1 to-blue-200 h-1/4 lg:h-1/2 flex items-start justify-start">
          {/* <SidebarTrigger /> */}
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start mx-20 h-fit -translate-y-[20%] lg:-translate-y-0">
          <div className="flex flex-col lg:flex-row ">
            <div
              style={{
                backgroundImage: `url(${(() => {
                  if (userData.profile_photo_url) {
                    // Append a timestamp to the URL to bust browser cache
                    const timestamp = new Date().getTime();
                    return `${storageBaseUrl}${userData.profile_photo_url}?t=${timestamp}`;
                  } else {
                    return "./assets/login_registration.svg";
                  }
                })()})`,
              }}
              className="picture w-50 h-50 lg:w-3xs lg:h-[256px] rounded-full bg-slate-500 border-8 border-slate-50 dark:border-blue-1-dark lg:-translate-y-1/2 bg-[url(./assets/login_registration.svg)] bg-cover"
            ></div>
            <div className="flex flex-col gap-2 items-center lg:items-start justify-start my-5 mx-5 text-blue-1-dark dark:text-blue-50">
              <h1 className="text-3xl">{userData.name || "Utilisateur"}</h1>
              <p>
                @
                {userData.username ||
                  userData.email?.split("@")[0] ||
                  "username"}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize">
                Rôle: {userData.role}
              </p>
            </div>
          </div>
          <div className="search/addProject flex gap-2 justify-center items-center my-10">
            <button
              onClick={openCommandMenu}
              className="text-blue-1 font-semibold rounded-md px-[11px] py-[11px] duration-200 flex gap-2 border-2 border-blue-1 dark:border-blue-50 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
            >
              <FaSearch className="text-lg" />
            </button>
            {isCurrentUserProfile && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="items-center justify-center bg-blue-50 text-blue-1 font-semibold rounded-md px-4 py-2 duration-200 flex gap-2 border-2 border-blue-1 dark:border-blue-50 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark">
                    <FaRegFileArchive className="text-lg" />
                    Edit
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] dark:bg-blue-1-dark">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your profile information below
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProfileEdit} className="space-y-4">
                    {editError && (
                      <div className="text-red-500 text-sm">{editError}</div>
                    )}
                    {editSuccess && (
                      <div className="text-green-500 text-sm">
                        Profile updated successfully!
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="profile_photo">Profile Photo</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img
                            src={
                              imagePreview ||
                              (userData.profile_photo_url
                                ? storageBaseUrl + userData.profile_photo_url
                                : "./assets/login_registration.svg")
                            }
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Input
                          type="file"
                          id="profile_photo"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Max file size: 2MB. Supported formats: JPEG, PNG, JPG,
                        GIF
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={editProfileData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          disabled={isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={editProfileData.username}
                          onChange={handleInputChange}
                          placeholder="@username"
                          disabled={isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editProfileData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                        rows={3}
                        disabled={isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        name="about"
                        value={editProfileData.about}
                        onChange={handleInputChange}
                        placeholder="Tell us more about yourself"
                        rows={4}
                        disabled={isEditing}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="submit"
                        className="bg-blue-1 text-blue-50 hover:bg-blue-2"
                        disabled={isEditing}
                      >
                        {isEditing ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            {isCurrentUserProfile && userData.role === "etudiant" && (
              <Dialog
                open={isAddProjectDialogOpen}
                onOpenChange={setIsAddProjectDialogOpen}
              >
                <DialogTrigger asChild>
                  <button className="items-center justify-center bg-blue-1 text-blue-50 font-semibold rounded-md px-3 py-2 sm:px-4 sm:py-2 duration-200 flex gap-2 border-2 border-blue-1 dark:border-blue-50 cursor-pointer whitespace-nowrap hover:bg-blue-50 hover:text-blue-1 dark:text-blue-1-dark dark:bg-blue-50 dark:hover:bg-blue-1-dark dark:hover:text-blue-50">
                    <FaPlus className="text-lg" />
                    Add Project
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px] dark:bg-blue-1-dark-sec p-0 border-0 overflow-hidden rounded-lg">
                  <FormCard setIsOpen={setIsAddProjectDialogOpen} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[45vh] lg:min-h-[50vh] bg-blue-50 dark:bg-blue-1-dark flex flex-col justify-between items-center pb-5  overflow-hidden">
        <div className="self-start hidden lg:block">
          <ProfileTabs setActiveTab={setActiveTab} />
        </div>
        <DraggableTabs
          isDarkMode={isDarkMode}
          setProfileActiveTab={setActiveTab}
        />
        {activeTab === "Overview" && (
          <div className="MAIN-CONTENT w-full flex justify-center mt-4">
            <div className="bg-white dark:bg-blue-1-dark rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8 w-full max-w-2xl">
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-50">
                  {userData.name}
                </h1>
                <p className="text-blue-500 dark:text-blue-200">
                  @{userData.username || userData.email?.split("@")[0]}
                </p>
                <p className="text-gray-700 dark:text-blue-100 mt-2">
                  {userData.bio || "Aucune biographie pour le moment."}
                </p>
                <div className="flex gap-6 mt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-900 dark:text-blue-50">
                      {projects.length}
                    </span>
                    <span className="text-xs text-gray-500">Projects</span>
                  </div>
                  {/* <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-900 dark:text-blue-50">
                      {mockUserData.followers_count}
                    </span>
                    <span className="text-xs text-gray-500">Followers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-900 dark:text-blue-50">
                      {mockUserData.following_count}
                    </span>
                    <span className="text-xs text-gray-500">Following</span>
                  </div> */}
                </div>
                {/* <div className="mt-6">
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-50">
                    Skills
                  </span>
                  <div className="flex gap-2 mt-2">
                    {mockUserData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 dark:bg-blue-2-dark text-blue-900 dark:text-blue-50 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}
        {activeTab === "Projects" && (
          <div className="MAIN-CONTENT flex justify-center items-center flex-wrap gap-4 my-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Dialog
                  key={project.id}
                  onOpenChange={(isOpenDialog) => {
                    if (!isOpenDialog) setSelectedProject(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Card
                      className="w-xs flex flex-col-reverse bg-cover py-0 gap-0 dark:bg-blue-2-dark cursor-pointer hover:shadow-lg transition-shadow duration-200"
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardHeader className="py-4">
                        <CardTitle>{project.titre}</CardTitle>
                        <CardDescription>
                          {project.caption || "Pas de caption"}
                        </CardDescription>
                        <div
                          className={`mt-2 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            project.approval_status
                          )}`}
                        >
                          {getStatusText(project.approval_status)}
                        </div>
                      </CardHeader>
                      <CardContent
                        className={`h-[200px] bg-[url(${project.image})] bg-cover`}
                        style={{
                          backgroundImage: `url(${
                            project.image
                              ? storageBaseUrl + project.image
                              : "./assets/login_registration.svg"
                          })`,
                        }}
                      ></CardContent>
                      <CardFooter className="h-0"></CardFooter>
                    </Card>
                  </DialogTrigger>
                  {selectedProject && selectedProject.id === project.id && (
                    <DialogContent className="sm:max-w-[600px] dark:bg-blue-1-dark">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {selectedProject.titre}
                        </DialogTitle>
                        <DialogDescription>
                          {selectedProject.caption || "Pas de caption"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Description</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {selectedProject.description}
                          </p>
                        </div>
                        {selectedProject.technologies &&
                          selectedProject.technologies.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-medium">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedProject.technologies.map(
                                  (tech, index) => (
                                    <span
                                      key={index}
                                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                                    >
                                      {tech}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        <div className="space-y-2">
                          <h4 className="font-medium">Duration</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {selectedProject.duration}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-medium">Module:</h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedProject.module?.nom || "N/A"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">Professeur:</h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedProject.professeur?.name ||
                              selectedProject.prof?.name ||
                              "N/A"}
                          </p>
                        </div>

                        {selectedProject.approval_status === "approved" && (
                          <>
                            <div className="space-y-2">
                              <h4 className="font-medium">Approval Details</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Approved by{" "}
                                {selectedProject.approval_by_name ||
                                  selectedProject.approval_by ||
                                  "N/A"}{" "}
                                on{" "}
                                {selectedProject.approval_at
                                  ? new Date(
                                      selectedProject.approval_at
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Certificate</h4>
                              <a
                                href={`/api/projets/${selectedProject.id}/certificat/download`}
                                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                                download
                              >
                                Download Certificate
                              </a>
                            </div>
                          </>
                        )}
                        {selectedProject.approval_status === "rejected" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Refusal Details</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Refused by{" "}
                              {selectedProject.approval_by_name ||
                                selectedProject.approval_by ||
                                "N/A"}{" "}
                              on{" "}
                              {selectedProject.approval_at
                                ? new Date(
                                    selectedProject.approval_at
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Reason:{" "}
                              {selectedProject.approval_comment || "N/A"}
                            </p>
                          </div>
                        )}
                        {selectedProject.approval_status === "pending" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Submission Details</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Submitted on{" "}
                              {selectedProject.submittedDate
                                ? new Date(
                                    selectedProject.submittedDate
                                  ).toLocaleDateString()
                                : selectedProject.created_at
                                ? new Date(
                                    selectedProject.created_at
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Aucun projet à afficher.
              </p>
            )}
          </div>
        )}

        {activeTab === "About" && (
          <div className="MAIN-CONTENT w-full flex justify-center mt-4">
            <div className="bg-white dark:bg-blue-1-dark rounded-xl shadow-lg p-6 w-full max-w-2xl flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-2xl font-bold dark:text-blue-50">
                    About Me
                  </h1>
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-blue-1 font-semibold rounded-md px-3 py-1 duration-200 flex gap-2 border-2 border-blue-1 dark:border-blue-50 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark">
                        Edit
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] dark:bg-blue-1-dark">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          Edit About Section
                        </DialogTitle>
                        <DialogDescription>
                          Update your about information and social links
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAboutEdit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="about">About Me</Label>
                          <Textarea
                            id="about"
                            name="about"
                            value={editAboutData.about}
                            onChange={(e) =>
                              setEditAboutData((prev) => ({
                                ...prev,
                                about: e.target.value,
                              }))
                            }
                            placeholder="Tell us about yourself"
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub URL</Label>
                          <Input
                            id="github"
                            name="github"
                            value={editAboutData.social_links.github}
                            onChange={(e) =>
                              setEditAboutData((prev) => ({
                                ...prev,
                                social_links: {
                                  ...prev.social_links,
                                  github: e.target.value,
                                },
                              }))
                            }
                            placeholder="https://github.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn URL</Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            value={editAboutData.social_links.linkedin}
                            onChange={(e) =>
                              setEditAboutData((prev) => ({
                                ...prev,
                                social_links: {
                                  ...prev.social_links,
                                  linkedin: e.target.value,
                                },
                              }))
                            }
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="instagram">Instagram URL</Label>
                          <Input
                            id="instagram"
                            name="instagram"
                            value={editAboutData.social_links.instagram}
                            onChange={(e) =>
                              setEditAboutData((prev) => ({
                                ...prev,
                                social_links: {
                                  ...prev.social_links,
                                  instagram: e.target.value,
                                },
                              }))
                            }
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="submit"
                            className="bg-blue-1 text-blue-50 hover:bg-blue-2"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog> */}
                </div>
                <p className="text-gray-700 dark:text-blue-100 mb-4">
                  {userData.about || "Aucune biographie pour le moment."}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 min-w-[160px]">
                <div className="bg-blue-100 dark:bg-blue-2-dark rounded-lg p-4 flex flex-col items-center w-full">
                  <span className="font-semibold text-blue-900 dark:text-blue-50 mb-2">
                    Connect with me
                  </span>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-900 dark:text-blue-50 hover:text-blue-500 dark:hover:text-blue-200 mb-1"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-900 dark:text-blue-50 hover:text-blue-500 dark:hover:text-blue-200 mb-1"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-900 dark:text-blue-50 hover:text-blue-500 dark:hover:text-blue-200"
                  >
                    <FaInstagram /> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">
          <SliderToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-400 p-4 text-center">
      {isLoading
        ? "Chargement..."
        : error ||
          "Impossible d'afficher le profil. Veuillez vous connecter ou vérifier l'URL."}
    </div>
  );
};

export default ProfileHeader;
