import React, { useState } from "react";
import Navbar from "../components/EspaceProf/navbar";
import Title from "../components/EspaceProf/Title";
import Filter from "../components/EspaceProf/Filtre";
import DashBord from "../components/EspaceProf/DashBord";
import Footer from "../components/Accueil/footer";
import { tableData } from "../../mockData/dataEspaceProf";

function EspaceProf() {
  const itemsPerPage = 10;

  // Filter states
  const [selectedYear, setSelectedYear] = useState("default");
  const [selectedModule, setSelectedModule] = useState("default");
  const [selectedStatus, setSelectedStatus] = useState("default");
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  // Filtered data
  const filteredData = tableData.filter((item) => {
    return (
      (selectedYear === "default" || item.year === selectedYear) &&
      (selectedModule === "default" || item.module === selectedModule) &&
      (selectedStatus === "default" || item.status === selectedStatus) &&
      (searchQuery === "" ||
        item.student.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
    );
  });

  return (
    <>
      <Navbar />
      <Title />
      <Filter
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        searchQuery={searchQuery} // Pass search query state
        setSearchQuery={setSearchQuery} // Pass search query setter
      />
      <DashBord data={filteredData} itemsPerPage={itemsPerPage} />
      {/* <Footer /> */}
    </>
  );
}

export default EspaceProf;
