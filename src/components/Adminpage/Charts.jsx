import React, { useState, useEffect } from "react";
import axios from "axios";
import { Reveal } from "../utils/Reveal"; // Assuming Reveal is correctly set up
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title, // Import Title for chart titles
} from "chart.js";
import { motion } from "framer-motion";
import apiClient from "../../services/apiClient";

// Use Vite env variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title // Register Title
);

const chartAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function ProjectCharts({ isDarkMode }) {
  // Renamed from DashBord to avoid confusion
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Projects",
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [errorCharts, setErrorCharts] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoadingCharts(true);
      setErrorCharts(null);
      try {
        // Fetch data for Pie Chart (Project Statuses)
        const statusResponse = await apiClient.get("/admin/dashboard/statuts");
        if (
          statusResponse.data &&
          statusResponse.data.labels &&
          statusResponse.data.counts
        ) {
          setPieData({
            labels: statusResponse.data.labels,
            datasets: [
              {
                data: statusResponse.data.counts,
                backgroundColor: [
                  "#4CAF50",
                  "#FFC107",
                  "#F44336",
                  "#2196F3",
                  "#9C27B0",
                ], // Add more colors if more statuses
                hoverBackgroundColor: [
                  "#45A049",
                  "#FFB300",
                  "#E53935",
                  "#1E88E5",
                  "#8E24AA",
                ],
              },
            ],
          });
        }

        // Fetch data for Bar Chart (Projects per Year)
        const yearlyResponse = await apiClient.get(
          "/admin/dashboard/projets-par-annee"
        );
        if (
          yearlyResponse.data &&
          yearlyResponse.data.labels &&
          yearlyResponse.data.counts
        ) {
          setBarData({
            labels: yearlyResponse.data.labels,
            datasets: [
              {
                label: "Number of Projects",
                data: yearlyResponse.data.counts,
                backgroundColor: yearlyResponse.data.counts.map((_, index) =>
                  index % 2 === 0
                    ? isDarkMode
                      ? "#1976c9"
                      : "#4d99ff"
                    : isDarkMode
                    ? "#0c5594"
                    : "#75b1ff"
                ),
                hoverBackgroundColor: yearlyResponse.data.counts.map(
                  (_, index) =>
                    index % 2 === 0
                      ? isDarkMode
                        ? "#0c5594"
                        : "#75b1ff"
                      : isDarkMode
                      ? "#1976c9"
                      : "#4d99ff"
                ),
              },
            ],
          });
        }
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        setErrorCharts("Could not load chart data.");
      } finally {
        setLoadingCharts(false);
      }
    };

    fetchChartData();
  }, [isDarkMode]); // Re-fetch if isDarkMode changes, to update colors potentially

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Keep legend for bar chart if desired
        position: "top",
        labels: {
          color: isDarkMode ? "#FFFFFF" : "#333333",
        },
      },
      title: {
        // Adding title to bar chart
        display: true,
        text: "Projects by Year",
        color: isDarkMode ? "#FFFFFF" : isDarkMode ? "#FFFFFF" : "#1E3A8A", // text-blue-1 or dark:text-blue-50
        font: {
          size: 18,
          family: "Poppins, sans-serif", // Match font style
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: isDarkMode ? "#FFFFFF" : "#333333" },
        grid: {
          color: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      y: {
        ticks: { color: isDarkMode ? "#FFFFFF" : "#333333" },
        grid: {
          color: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#FFFFFF" : "#333333",
        },
      },
      title: {
        // Adding title to pie chart
        display: true,
        text: "Project Status Distribution",
        color: isDarkMode ? "#FFFFFF" : "#1E3A8A", // text-blue-1 or dark:text-blue-50
        font: {
          size: 18,
          family: "Poppins, sans-serif", // Match font style
          weight: "bold",
        },
      },
    },
  };

  if (loadingCharts) {
    return <div className="text-center py-10">Loading charts...</div>;
  }
  if (errorCharts) {
    return <div className="text-center text-red-500 py-10">{errorCharts}</div>;
  }

  return (
    <div className="mb-20 flex flex-col items-center justify-center px-6 py-12 dark:bg-blue-2-dark">
      <Reveal isDarkMode={isDarkMode} width="100%">
        <div className="text-center w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-blue-1 dark:text-blue-50 mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
            Dashboard – Program Director
          </h1>
          <hr className="w-4/5 mx-auto mb-10 border-t-2 text-blue-1 dark:text-blue-50" />
        </div>
      </Reveal>

      <Reveal isDarkMode={isDarkMode} width="100%">
        <div className="mt-10 flex flex-wrap justify-center gap-20 w-full">
          {/* Pie Chart */}
          {pieData.labels && pieData.labels.length > 0 ? (
            <motion.div
              className="w-full sm:w-1/2 lg:w-1/3 h-96 flex flex-col items-center justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={chartAnimation}
            >
              <Pie data={pieData} options={pieOptions} />
              {/* Title is now in options, but you can keep sub-description if needed */}
              <h2 className="text-xl font-bold font-poppins text-blue-1 dark:text-blue-50 text-center mt-4">
                Project Distribution
              </h2>
              <p className="text-sm font-inter text-blue-2 dark:text-blue-100 text-center mt-2">
                Discover the proportion of approved, pending, and rejected
                projects.
              </p>
            </motion.div>
          ) : (
            <p className="text-blue-1 dark:text-blue-50">
              No data available for project status distribution.
            </p>
          )}

          {/* Bar Chart */}
          {barData.labels && barData.labels.length > 0 ? (
            <motion.div
              className="w-full sm:w-1/2 lg:w-1/3 h-96 flex flex-col items-center justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={chartAnimation}
            >
              <Bar data={barData} options={barOptions} />
              {/* Title is now in options, but you can keep sub-description if needed */}
              <h2 className="text-xl font-bold font-poppins text-blue-1 dark:text-blue-50 text-center mt-4">
                Projects by Year
              </h2>
              <p className="text-sm font-inter text-blue-2 dark:text-blue-100 text-center mt-2">
                Analyze the annual evolution of completed projects.
              </p>
            </motion.div>
          ) : (
            <p className="text-blue-1 dark:text-blue-50">
              No data available for projects per year.
            </p>
          )}
        </div>
      </Reveal>
    </div>
  );
}
