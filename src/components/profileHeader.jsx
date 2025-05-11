import React, { useState } from "react";
// import { lazyLoad } from "../lazyLoad";
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
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedProject, setSelectedProject] = useState(null);
  const { openCommandMenu } = useCommandMenu();

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      case "refused":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200";
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className={`relative z-10 ${isOpen ? "pointer-events-none" : ""}`}>
      <div className="h-[55vh] lg:h-[50vh] bg-blue-50 dark:bg-blue-1-dark text-blue-50">
        <div className="bg-linear-90 from-blue-1 to-blue-200 h-1/4 lg:h-1/2"></div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start mx-20 h-fit -translate-y-[20%] lg:-translate-y-0">
          <div className="flex flex-col lg:flex-row ">
            <div className="picture w-50 h-50 lg:w-3xs lg:h-[256px] rounded-full bg-slate-500 border-8 border-slate-50 dark:border-blue-1-dark lg:-translate-y-1/2 bg-[url(./assets/login_registration.svg)] bg-cover"></div>
            <div className="flex flex-col gap-2 items-center lg:items-start justify-start my-5 mx-5 text-blue-1-dark dark:text-blue-50">
              <h1 className="text-3xl">Username</h1>
              <p>@username</p>
            </div>
          </div>
          <div className="search/addProject flex gap-2 justify-center items-center my-10">
            <button
              onClick={openCommandMenu}
              className=" text-blue-1 font-semibold rounded-md px-[11px] py-[11px] duration-200 flex gap-2 border-2 border-blue-1 dark:border-blue-50 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark"
            >
              <FaSearch className="text-lg" />
            </button>
            <button className="items-center justify-center bg-blue-50 text-blue-1 font-semibold rounded-md px-4 py-2 duration-200 flex gap-2 border-2 border-blue-1 dark:border-blue-50 cursor-pointer whitespace-nowrap hover:bg-blue-1 hover:text-blue-50 dark:text-blue-50 dark:bg-blue-1-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark">
              <FaRegFileArchive className="text-lg" />
              Reports
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="items-center justify-center bg-blue-1 text-blue-50 font-semibold rounded-md px-4 py-2 duration-200 flex gap-2 border-2 border-blue-1 dark:border-blue-50 cursor-pointer whitespace-nowrap hover:bg-blue-50 hover:text-blue-1 dark:text-blue-1-dark dark:bg-blue-50 dark:hover:bg-blue-1-dark dark:hover:text-blue-50"
            >
              <FaPlus className="text-lg" />
              Add
            </button>
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
                  Oualid
                </h1>
                <p className="text-blue-500 dark:text-blue-200">@oualid</p>
                <p className="text-gray-700 dark:text-blue-100 mt-2">
                  Full Stack Developer & Student at ENSA Kenitra. Passionate
                  about building cool things and learning new tech!
                </p>
                <div className="flex gap-6 mt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-900 dark:text-blue-50">
                      6
                    </span>
                    <span className="text-xs text-gray-500">Projects</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-900 dark:text-blue-50">
                      120
                    </span>
                    <span className="text-xs text-gray-500">Followers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-900 dark:text-blue-50">
                      180
                    </span>
                    <span className="text-xs text-gray-500">Following</span>
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-50">
                    Skills
                  </span>
                  <div className="flex gap-2 mt-2">
                    <div className="bg-blue-100 dark:bg-blue-2-dark text-blue-900 dark:text-blue-50 px-3 py-1 rounded-full text-xs font-semibold">
                      React
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-2-dark text-blue-900 dark:text-blue-50 px-3 py-1 rounded-full text-xs font-semibold">
                      Laravel
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-2-dark text-blue-900 dark:text-blue-50 px-3 py-1 rounded-full text-xs font-semibold">
                      Tailwind
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Projects" && (
          <div className="MAIN-CONTENT flex justify-center items-center flex-wrap gap-4 my-4">
            {mockProjects.map((project) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <Card
                    className="w-xs flex flex-col-reverse bg-cover py-0 gap-0 dark:bg-blue-2-dark cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => setSelectedProject(project)}
                  >
                    <CardHeader className="py-4">
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.caption}</CardDescription>
                      <div
                        className={`mt-2 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusText(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent
                      className={`h-[200px] bg-[url(${project.image})] bg-cover`}
                    ></CardContent>
                    <CardFooter className="h-0"></CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] dark:bg-blue-1-dark">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription>{project.caption}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Description</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {project.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Duration</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {project.duration}
                      </p>
                    </div>
                    {project.status === "approved" && (
                      <>
                        <div className="space-y-2">
                          <h4 className="font-medium">Approval Details</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Approved by {project.approvedBy} on{" "}
                            {project.approvedDate}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Certificate</h4>
                          <a
                            href={project.certificateUrl}
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download Certificate
                          </a>
                        </div>
                      </>
                    )}
                    {project.status === "refused" && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Refusal Details</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Refused on {project.refusedDate}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Reason: {project.refusedReason}
                        </p>
                      </div>
                    )}
                    {project.status === "pending" && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Submission Details</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Submitted on {project.submittedDate}
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
        {activeTab === "Something" && (
          <div className="MAIN-CONTENT w-full flex justify-center mt-4">
            <div className="bg-white dark:bg-blue-1-dark rounded-xl shadow-lg p-6 w-full max-w-xl flex flex-col gap-4 items-center">
              <h1 className="text-2xl font-bold dark:text-blue-50 flex items-center gap-2">
                Fun Facts <span>🎉</span>
              </h1>
              <ul className="list-disc pl-6 text-blue-900 dark:text-blue-50 text-sm">
                <li>Loves coding late at night 🌙</li>
                <li>Can solve a Rubik's cube in under a minute 🧩</li>
                <li>Drinks way too much coffee ☕</li>
                <li>Has a meme folder for every occasion 😂</li>
              </ul>
              <div className="flex items-center gap-2 mt-4 text-blue-500 dark:text-blue-200 italic">
                <FaQuoteLeft />
                <span>
                  "Code is like humor. When you have to explain it, it's bad."
                </span>
              </div>
            </div>
          </div>
        )}
        {activeTab === "About" && (
          <div className="MAIN-CONTENT w-full flex justify-center mt-4">
            <div className="bg-white dark:bg-blue-1-dark rounded-xl shadow-lg p-6 w-full max-w-2xl flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h1 className="text-2xl font-bold dark:text-blue-50 mb-2">
                  About Me
                </h1>
                <p className="text-gray-700 dark:text-blue-100 mb-4">
                  Hi! I'm Oualid, a passionate developer who loves building web
                  apps, learning new technologies, and collaborating with
                  others. I enjoy solving problems and turning ideas into
                  reality. When I'm not coding, you'll find me exploring new
                  music, playing chess, or hanging out with friends.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 min-w-[160px]">
                <div className="bg-blue-100 dark:bg-blue-2-dark rounded-lg p-4 flex flex-col items-center w-full">
                  <span className="font-semibold text-blue-900 dark:text-blue-50 mb-2">
                    Connect with me
                  </span>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-900 dark:text-blue-50 hover:text-blue-500 dark:hover:text-blue-200 mb-1"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-900 dark:text-blue-50 hover:text-blue-500 dark:hover:text-blue-200 mb-1"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/"
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
        <SliderToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default ProfileHeader;
