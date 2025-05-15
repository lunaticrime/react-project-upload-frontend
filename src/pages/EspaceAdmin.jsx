import React, { useState } from "react";
import Navbar from "../components/Adminpage/navbar";
import Charts from "../components/Adminpage/Charts";
import Cards from "../components/Adminpage/Cards";
import Filtre from "../components/Adminpage/Filtre";
import DashBord from "../components/Adminpage/DashBord";
import { usersData } from "../../mockData/dataEspaceAdmin";
import Bienvenue from "../components/Adminpage/Bienvenue";
import Export from "../components/Adminpage/Export";

export default function EspaceAdmin() {
  const itemsPerPage = 10;

  // Filter states
  const [selectedRole, setSelectedRole] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered data
  const filteredData = usersData.filter((user) => {
    const matchesRole =
      selectedRole === "default" || user.role === selectedRole;
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div id="dashboard">
        <Charts />
        <Cards />
      </div>
      <div id="gestion-utilisateurs">
        <Filtre
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <DashBord data={filteredData} itemsPerPage={itemsPerPage} />
      </div>
      <div id="exportation">
        <Export />
      </div>
    </>
  );
}
