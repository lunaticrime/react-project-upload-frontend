import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { motion } from "framer-motion"; // Import framer-motion
import { projectStats } from "../../../mockData/dataEspaceAdmin";

// Register required chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const chartAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function DashBord() {
  const pieData = {
    labels: ["Validé", "En Attente", "Refusé"],
    datasets: [
      {
        data: projectStats.statusDistribution,
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"], // Green, Yellow, Red
        hoverBackgroundColor: ["#45A049", "#FFB300", "#E53935"], // Darker Green, Yellow, Red
      },
    ],
  };

  const barData = {
    labels: projectStats.years,
    datasets: [
      {
        label: "Nombre de projets",
        data: projectStats.projectsPerYear,
        backgroundColor: projectStats.projectsPerYear.map(
          (_, index) => (index % 2 === 0 ? "#1976c9" : "#4d99ff") // Alternating palette colors
        ),
        hoverBackgroundColor: projectStats.projectsPerYear.map(
          (_, index) => (index % 2 === 0 ? "#0c5594" : "#75b1ff") // Alternating palette colors
        ),
      },
    ],
  };

  const barOptions = {
    maintainAspectRatio: false, // Allow the chart to resize dynamically
    plugins: {
      legend: {
        display: false, // Hide the legend
        labels: {
          boxWidth: 0, // Reserve space for the legend
        },
      },
    },
  };

  return (
    <div className="mb-20 flex flex-col items-center justify-center px-6 py-12">
      {/* Updated Title Section */}
      <div className="text-center w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-4 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
          Tableau de bord – Responsable
        </h1>
        <hr className="w-4/5 mx-auto mb-10 border-t-2 border-[var(--color-blue-1)]" />
      </div>
      {/* Charts Section */}
      <div className="mt-10 flex flex-wrap justify-center gap-20 w-full">
        {/* Pie Chart */}
        <motion.div
          className="w-full sm:w-1/2 lg:w-1/3 h-96 flex flex-col items-center justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={chartAnimation}
        >
          <Pie data={pieData} className="flex-grow" />
          <h2 className="text-xl font-bold font-poppins text-[var(--color-blue-1)] text-center mt-4">
            Répartition des Projets
          </h2>
          <p className="text-sm font-inter text-[var(--color-blue-2)] text-center mt-2">
            Découvrez la proportion des projets validés, en attente et refusés.
          </p>
        </motion.div>
        {/* Bar Chart */}
        <motion.div
          className="w-full sm:w-1/2 lg:w-1/3 h-96 flex flex-col items-center justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={chartAnimation}
        >
          <Bar data={barData} options={barOptions} className="flex-grow" />
          <h2 className="text-xl font-bold font-poppins text-[var(--color-blue-1)] text-center mt-4">
            Projets par Année
          </h2>
          <p className="text-sm font-inter text-[var(--color-blue-2)] text-center mt-2">
            Analysez l'évolution annuelle du nombre de projets réalisés.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
