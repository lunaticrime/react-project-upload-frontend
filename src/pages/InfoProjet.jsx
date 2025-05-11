import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/EspaceProf/navbar";
import Title from "../components/InfoProjet/Title";
import Info from "../components/InfoProjet/info";
import Forum from "../components/InfoProjet/forum";
import Valider from "../components/InfoProjet/valider";
import { tableData } from "../../mockData/dataEspaceProf";

function InfoProjet() {
  const { id } = useParams();
  const project = tableData.find((item) => item.id === parseInt(id));

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="p-5">
          <h1 className="text-2xl font-bold text-red-500">
            Projet introuvable
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Title projectName={project.projectName} studentName={project.student} />
      <Info
        projectName={project.projectName}
        description={project.description}
        type={project.module}
        year={project.year}
        files={[
          { name: "rapport_final.pdf", link: "/path/to/rapport_final.pdf" },
          { name: "source_code.zip", link: "/path/to/source_code.zip" },
        ]}
      />
      <Forum />
      <Valider statusValue={project.status} submissionDate="2025-05-07" />
    </>
  );
}

export default InfoProjet;
