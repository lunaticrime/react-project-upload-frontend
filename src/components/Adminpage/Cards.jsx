import React, { useState, useEffect } from "react";
import axios from "axios";
import { Reveal } from "../utils/Reveal"; // Assuming Reveal component is correctly set up
import apiClient from "../../services/apiClient";

// Use Vite env variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Default structure if API fails or not loaded yet
const initialAdminCardsData = [
  {
    id: 1,
    title: "Total Submitted Projects",
    count: "...",
    key: "totalProjets",
  },
  {
    id: 2,
    title: "Number of Active Students",
    count: "...",
    key: "totalEtudiants",
  },
  {
    id: 3,
    title: "Number of Active Teachers",
    count: "...",
    key: "totalEnseignants",
  },
  {
    id: 4,
    title: "Projects Submitted This Year",
    count: "...",
    key: "projetsCetteAnnee",
  },
];

const Cards = ({ isDarkMode }) => {
  const [cardsData, setCardsData] = useState(initialAdminCardsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace process.env.REACT_APP_API_URL with API_URL
        const response = await apiClient.get("/admin/dashboard/indicators");
        const apiData = response.data;

        // Map API data to the card structure
        const updatedCardsData = initialAdminCardsData.map((card) => ({
          ...card,
          count: apiData[card.key] !== undefined ? apiData[card.key] : "N/A",
        }));
        setCardsData(updatedCardsData);
      } catch (err) {
        console.error("Failed to fetch indicators:", err);
        setError("Could not load dashboard indicators.");
        // Keep initial data with "..." or "N/A" on error
        setCardsData(
          initialAdminCardsData.map((card) => ({ ...card, count: "N/A" }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIndicators();
  }, []); // Empty dependency array means this runs once on mount

  const getBorderColor = (id) => {
    switch (id) {
      case 1:
        return "border-red-500";
      case 2:
        return "border-green-500";
      case 3:
        return "border-purple-500";
      case 4:
        return "border-orange-500";
      default:
        return "border-blue-500";
    }
  };

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <>
      <Reveal isDarkMode={isDarkMode} width="100%">
        <div className="mb-20 flex flex-wrap justify-center gap-10 w-full p-4">
          {cardsData.map(({ id, title, count }) => (
            <div
              key={id}
              className={`flex flex-col bg-white dark:bg-blue-3 border-t-6 ${getBorderColor(
                id
              )} items-center p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full max-w-xs cursor-pointer`}
            >
              <h2
                className={`${
                  title === "Number of Active Teachers" ? "text-lg" : "text-xl"
                } font-bold font-poppins text-center text-[var(--color-background)] dark:text-blue-50 mb-2`}
              >
                {title}
              </h2>
              <p className="text-3xl font-bold font-poppins text-center text-[var(--color-background)] dark:text-blue-50">
                {loading && count === "..." ? "..." : count}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
};

export default Cards;
