// src/components/profileEdit.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiClient from "../services/apiClient"; // ✅ Importé

export function TabsDemo({ currentUserData, onProfileUpdate }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUserData) {
      setName(currentUserData.name || "");
      setUsername(currentUserData.username || "");
      setEmail(currentUserData.email || "");
      setBio(currentUserData.bio || "");
      setProfilePhotoPreview(currentUserData.profile_photo_url ? `http://localhost:8000/storage/${currentUserData.profile_photo_url}` : null);
    }
  }, [currentUserData]);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
    } else {
      setProfilePhoto(null);
      setProfilePhotoPreview(currentUserData.profile_photo_url ? `http://localhost:8000/storage/${currentUserData.profile_photo_url}` : null);
    }
  };

  const handleAccountSave = async () => {
    setFeedback({ message: "", type: "" });
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }
    formData.append("_method", "PUT"); // ✅ Pour que Laravel traite POST comme PUT

    try {
      // ✅ Utilisation de apiClient.post car la route Laravel est Route::post('/profile', ...)
      const response = await apiClient.post("/profile", formData);
      onProfileUpdate(response.data.user); // Les données utilisateur sont dans response.data.user
      setFeedback({ message: response.data.message || "Profil mis à jour avec succès!", type: "success" });
    } catch (error) {
      console.error("Error updating account:", error);
      const errorMessage = error.response?.data?.message || 
                           (error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(' ') : "Échec de la mise à jour du profil.");
      setFeedback({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSave = async () => {
    if (newPassword !== newPasswordConfirmation) {
        setFeedback({ message: "Les nouveaux mots de passe ne correspondent pas.", type: "error" });
        return;
    }
    setFeedback({ message: "", type: "" });
    setIsLoading(true);

    try {
      // ✅ Utilisation de apiClient.put car la route est Route::put et on envoie du JSON
      const response = await apiClient.put("/profile/password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });
      setFeedback({ message: response.data.message || "Mot de passe mis à jour avec succès.", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    } catch (error) {
      console.error("Error updating password:", error);
       const errorMessage = error.response?.data?.message || 
                           (error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(' ') : "Échec de la mise à jour du mot de passe.");
      setFeedback({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  // ... (le JSX reste le même)
  return (
    <Tabs defaultValue="account" className="w-[400px] dark:text-blue-50">
      {/* ... (Contenu JSX de TabsDemo comme fourni précédemment) ... */}
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Compte</TabsTrigger>
        <TabsTrigger value="password">Mot de passe</TabsTrigger>
      </TabsList>
      {feedback.message && (
        <div className={`p-2 my-2 text-sm rounded ${feedback.type === 'success' ? 'bg-green-100 dark:bg-green-700/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-700/30 text-red-700 dark:text-red-300'}`}>
          {feedback.message}
        </div>
      )}
      <TabsContent value="account">
        <Card className="dark:bg-blue-2-dark">
          {/* ... (CardHeader, CardContent pour 'account' comme avant) ... */}
          <CardHeader>
            <CardTitle>Compte</CardTitle>
            <CardDescription className="dark:text-blue-200">
              Modifiez les informations de votre compte ici.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* ... inputs pour name, username, email, bio, profile_photo ... */}
            <div className="space-y-1">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="dark:bg-blue-1-dark dark:border-blue-500" />
            </div>
            {/* ... autres champs ... */}
             <div className="space-y-1">
              <Label htmlFor="profile_photo">Photo de profil</Label>
              <Input id="profile_photo" type="file" onChange={handlePhotoChange} accept="image/*" className="dark:bg-blue-1-dark dark:border-blue-500 file:text-blue-50" />
              {profilePhotoPreview && (
                <img src={profilePhotoPreview} alt="Aperçu" className="mt-2 w-24 h-24 rounded-full object-cover" />
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAccountSave} disabled={isLoading}>
              {isLoading ? "Sauvegarde..." : "Sauvegarder les changements"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="dark:bg-blue-2-dark">
           {/* ... (CardHeader, CardContent pour 'password' comme avant) ... */}
           <CardHeader>
            <CardTitle>Mot de passe</CardTitle>
            <CardDescription className="dark:text-blue-200">
              Changez votre mot de passe ici.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* ... inputs pour current, new, new_confirmation password ... */}
          </CardContent>
          <CardFooter>
            <Button onClick={handlePasswordSave} disabled={isLoading}>
              {isLoading ? "Sauvegarde..." : "Sauvegarder le mot de passe"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}