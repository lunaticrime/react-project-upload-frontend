// src/components/formCard.jsx
import React, { useEffect } from "react";
import apiClient from "../services/apiClient"; // ✅ Importé
// import { Button } from "./ui/button"; //
// import { Input } from "./ui/input"; //
// import { Label } from "./ui/label"; //
// import { Textarea } from "./ui/textarea"; //
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "./ui/select"; //
// import {
//   Card, CardContent, CardFooter, CardHeader,
// } from "./ui/card"; //
// import {
//   DialogTitle, DialogDescription, // These are from ./ui/dialog
// } from "./ui/dialog"; //
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";

const fetchModulesAPI = async () => {
  try {
    const response = await apiClient.get("/modules"); // Hits ModuleController@index
    return response.data; //
  } catch (error) {
    console.error(
      "Failed to fetch modules API:",
      error.response?.data || error.message
    ); //
    return []; //
  }
};

// setIsOpen will be passed from ProfileHeader's Dialog onOpenChange via setIsAddProjectDialogOpen
const fetchProfesseursAPI = async () => {
  try {
    // Ensure this endpoint matches your backend route for fetching professors
    const response = await apiClient.get("/professeurs"); // Hits UserController@listProfesseurs or similar
    return response.data; //
  } catch (error) {
    console.error(
      "Failed to fetch professeurs API:",
      error.response?.data || error.message
    ); //
    return []; //
  }
};

// setIsOpen will be passed from ProfileHeader's Dialog onOpenChange via setIsAddProjectDialogOpen
const FormCard = ({ setIsOpen, onProjectCreated }) => {
  const [projectType, setProjectType] = useState("");
  const [titre, setTitre] = useState(""); //
  const [caption, setCaption] = useState(""); // Stays, backend will handle
  const [description, setDescription] = useState(""); //
  const [duration, setDuration] = useState(""); //
  const [imageFile, setImageFile] = useState(null); //
  const [fichierFile, setFichierFile] = useState(null); //
  const [technologies, setTechnologies] = useState(""); // Stays, backend will handle array

  const [moduleId, setModuleId] = useState(""); //
  const [profId, setProfId] = useState(""); //

  const [modules, setModules] = useState([]); //
  const [professeurs, setProfesseurs] = useState([]); //

  const [isLoading, setIsLoading] = useState(false); //
  const [error, setError] = useState(null); //
  const [successMessage, setSuccessMessage] = useState(""); //

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true); // Set loading true at the beginning of data fetching
      setError(null); //
      try {
        const [fetchedModules, fetchedProfs] = await Promise.all([
          //
          fetchModulesAPI(), //
          fetchProfesseursAPI(), //
        ]);
        setModules(fetchedModules || []); //
        setProfesseurs(fetchedProfs || []); //
        if (!fetchedModules || fetchedModules.length === 0) {
          //
          console.warn("No modules fetched or empty array returned."); //
        }
        if (!fetchedProfs || fetchedProfs.length === 0) {
          //
          console.warn("No professors fetched or empty array returned."); //
        }
      } catch (err) {
        console.error("Failed to load initial data for form:", err); //
        setError(
          "Impossible de charger les options du formulaire. Vérifiez la console pour les détails."
        ); //
      } finally {
        setIsLoading(false); // Set loading false after fetching is done
      }
    };
    loadInitialData(); //
  }, []); //

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      //
      setImageFile(e.target.files[0]); //
      setError(null); // Clear previous error
    } else {
      setImageFile(null); //
    }
  };
  const handleFichierChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      //
      setFichierFile(e.target.files[0]); //
      setError(null); // Clear previous error
    } else {
      setFichierFile(null); //
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //
    setError(null); // Clear previous errors

    if (!titre.trim()) {
      setError("Le titre du projet est requis.");
      return;
    } //
    if (!description.trim()) {
      setError("La description du projet est requise.");
      return;
    } //
    if (!duration.trim()) {
      setError("La durée du projet est requise.");
      return;
    } //
    if (!moduleId) {
      setError("Veuillez sélectionner un module.");
      return;
    } //
    if (!profId) {
      setError("Veuillez sélectionner un professeur superviseur.");
      return;
    } //

    setIsLoading(true); //
    setSuccessMessage(""); //

    const formData = new FormData(); //
    formData.append("titre", titre); //
    formData.append("caption", caption); //
    formData.append("description", description); //
    formData.append("duration", duration); //
    if (imageFile) formData.append("image", imageFile); //
    if (fichierFile) formData.append("fichier", fichierFile); //

    const techArray = technologies
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t); //
    if (techArray.length > 0) {
      //
      techArray.forEach((tech) => formData.append(`technologies[]`, tech)); // Send as technologies[] for Laravel to interpret as array
    }
    formData.append("module_id", moduleId); //
    formData.append("prof_id", profId); //

    try {
      const response = await apiClient.post("/projets", formData, {
        //
        headers: {
          //
          "Content-Type": "multipart/form-data", // apiClient should handle this with FormData, but explicit can be good.
        },
      });
      const result = response.data; //

      setSuccessMessage("Projet créé avec succès !"); //
      setTitre("");
      setCaption("");
      setDescription("");
      setDuration(""); //
      setImageFile(null);
      setFichierFile(null);
      setTechnologies(""); //
      setModuleId("");
      setProfId(""); //
      const imageInput = document.getElementById("project-thumbnail"); //
      if (imageInput) imageInput.value = null; //
      const fichierInput = document.getElementById("project-source-code"); //
      if (fichierInput) fichierInput.value = null; //

      if (onProjectCreated) {
        //
        onProjectCreated(result); // result should include caption and technologies now
      }

      setTimeout(() => {
        //
        setSuccessMessage(""); //
        setIsOpen(false); // Close modal after success and delay
      }, 2000);
    } catch (err) {
      const apiError = err.response?.data; //
      let errorMessage =
        "Une erreur est survenue lors de la création du projet."; //
      if (apiError) {
        //
        if (apiError.message) {
          //
          errorMessage = apiError.message; //
        }
        if (apiError.errors) {
          //
          const errorsDetails = Object.values(apiError.errors).flat().join(" "); //
          errorMessage += ` Détails: ${errorsDetails}`; //
        }
      } else if (err.message) {
        //
        errorMessage = err.message; //
      }
      setError(errorMessage); //
      console.error("Project creation error:", err.response || err); //
    } finally {
      setIsLoading(false); //
    }
  };

  return (
    <Card className="w-full dark:bg-blue-1-dark-sec bg-blue-100 max-h-[85vh] sm:max-h-[90vh] flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2">
        <form onSubmit={handleSubmit} id="project-form">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="project-title"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                maxLength={255}
                placeholder="Name of your project"
                className="border-blue-1"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Caption</Label>
              <Input
                id="project-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={500}
                placeholder="caption of your project"
                className="border-blue-1"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Textarea
                id="project-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project"
                className="border-blue-1"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Technologies</Label>
              <Input
                id="project-technologies"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="technologies used in your project"
                className="border-blue-1"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Duration</Label>
              <Input
                id="project-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration of your project"
                className="border-blue-1"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="project-thumbnail">Thumbnail</Label>
              <Input
                id="project-thumbnail"
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/jpg,image/gif"
                className="border-blue-1"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="project-source-code">Source Code</Label>
              <Input
                id="project-source-code"
                type="file"
                onChange={handleFichierChange}
                accept=".pdf,.zip,.docx,application/pdf,application/zip,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="border-blue-1"
              />
              {fichierFile && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Fichier sélectionné: {fichierFile.name}
                </p>
              )}
            </div>
            {(projectType === "Internship" || projectType === "Course") && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prof">Professor/Supervisor</Label>
                <Select value={profId} onValueChange={setProfId}>
                  <SelectTrigger
                    id="project-prof"
                    className="dark:bg-blue-1-dark dark:border-blue-700 dark:text-blue-50"
                  >
                    <SelectValue placeholder="Sélectionnez un professeur" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-blue-1-dark-sec dark:border-blue-700">
                    {professeurs.length > 0 ? (
                      professeurs.map((prof) => (
                        <SelectItem
                          key={prof.id}
                          value={prof.id.toString()}
                          className="dark:hover:bg-blue-700 dark:text-blue-100"
                        >
                          {prof.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Chargement...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            {(projectType === "Internship" || projectType === "Course") && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prof">Module</Label>
                <Select value={moduleId} onValueChange={setModuleId}>
                  <SelectTrigger
                    id="project-module"
                    className="dark:bg-blue-1-dark dark:border-blue-700 dark:text-blue-50"
                  >
                    <SelectValue placeholder="Sélectionnez un module" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-blue-1-dark-sec dark:border-blue-700">
                    {modules.length > 0 ? (
                      modules.map((mod) => (
                        <SelectItem
                          key={mod.id}
                          value={mod.id.toString()}
                          className="dark:hover:bg-blue-700 dark:text-blue-100"
                        >
                          {mod.nom}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Chargement...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Type</Label>
              <Select onValueChange={(value) => setProjectType(value)}>
                <SelectTrigger id="framework" className="border-blue-1">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Course">Course</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-[var(--color-blue-3)] flex-none">
        <Button
          variant="outline"
          type="button"
          className="cursor-pointer bg-blue-50"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="project-form"
          disabled={isLoading}
          className="cursor-pointer bg-blue-1 dark:bg-blue-50 hover:bg-blue-2 dark:hover:bg-blue-200"
        >
          {isLoading ? "Deploying..." : "Deploy"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormCard;
