import React, { useState } from "react";
import Navbar from "../components/EspaceProf/navbar";
import Title from "../components/InfoProjet/Title";
import Info from "../components/InfoProjet/info";
import Forum from "../components/InfoProjet/forum";
import Valider from "../components/InfoProjet/valider";


function InfoProjet() {
return (
    <>
        <Navbar />
        <Title  />
        <Info   />
        <Forum  />
        <Valider  />
    </>
);
}

export default InfoProjet;