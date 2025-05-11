export const navLinks = [
    { id: 1, name: "", link: "#" },
    { id: 2, name: "", link: "#" },
    { id: 3, name: "", link: "#" },
];

export const filterData = {
    years: [
        { id: 0, value: "default", label: "Filtrer par année" }, // Default value
        { id: 1, value: "2023", label: "2023" },
        { id: 2, value: "2022", label: "2022" },
        { id: 3, value: "2021", label: "2021" },
        { id: 4, value: "2020", label: "2020" },
    ],
    modules: [
        { id: 0, value: "default", label: "Filtrer par module" }, // Default value
        { id: 1, value: "Module 1", label: "Module 1" }, // Ensure values match tableData
        { id: 2, value: "Module 2", label: "Module 2" },
        { id: 3, value: "Module 3", label: "Module 3" },
        { id: 4, value: "Module 4", label: "Module 4" },
    ],
    status: [
        { id: 0, value: "default", label: "Filtrer par status" }, // Default value
        { id: 1, value: "pending", label: "🟡 En attente" },
        { id: 2, value: "approved", label: "🟢 Validé" },
        { id: 3, value: "rejected", label: "🔴 Refusé" },
    ],
};

export const tableData = [
    { id: 1, projectName: "Project A", student: "Étudiant 1", year: "2023", module: "Module 1", status: "approved", detailsLink: "/details/1", description: "Description arbitraire pour Project A." },
    { id: 2, projectName: "Project B", student: "Étudiant 2", year: "2022", module: "Module 2", status: "pending", detailsLink: "/details/2", description: "Description arbitraire pour Project B." },
    { id: 3, projectName: "Project C", student: "Étudiant 3", year: "2021", module: "Module 3", status: "rejected", detailsLink: "/details/3", description: "Description arbitraire pour Project C." },
    { id: 4, projectName: "Project D", student: "Étudiant 4", year: "2020", module: "Module 4", status: "approved", detailsLink: "/details/4", description: "Description arbitraire pour Project D." },
    { id: 5, projectName: "Project E", student: "Étudiant 5", year: "2023", module: "Module 1", status: "pending", detailsLink: "/details/5", description: "Description arbitraire pour Project E." },
    { id: 6, projectName: "Project F", student: "Étudiant 6", year: "2022", module: "Module 2", status: "rejected", detailsLink: "/details/6", description: "Description arbitraire pour Project F." },
    { id: 7, projectName: "Project G", student: "Étudiant 7", year: "2021", module: "Module 3", status: "approved", detailsLink: "/details/7", description: "Description arbitraire pour Project G." },
    { id: 8, projectName: "Project H", student: "Étudiant 8", year: "2020", module: "Module 4", status: "pending", detailsLink: "/details/8", description: "Description arbitraire pour Project H." },
    { id: 9, projectName: "Project I", student: "Étudiant 9", year: "2023", module: "Module 1", status: "rejected", detailsLink: "/details/9", description: "Description arbitraire pour Project I." },
    { id: 10, projectName: "Project J", student: "Étudiant 10", year: "2022", module: "Module 2", status: "approved", detailsLink: "/details/10", description: "Description arbitraire pour Project J." },
    { id: 11, projectName: "Project K", student: "Étudiant 11", year: "2021", module: "Module 3", status: "pending", detailsLink: "/details/11", description: "Description arbitraire pour Project K." },
    { id: 12, projectName: "Project L", student: "Étudiant 12", year: "2020", module: "Module 4", status: "rejected", detailsLink: "/details/12", description: "Description arbitraire pour Project L." },
    { id: 13, projectName: "Project M", student: "Étudiant 13", year: "2023", module: "Module 1", status: "approved", detailsLink: "/details/13", description: "Description arbitraire pour Project M." },
    { id: 14, projectName: "Project N", student: "Étudiant 14", year: "2022", module: "Module 2", status: "pending", detailsLink: "/details/14", description: "Description arbitraire pour Project N." },
    { id: 15, projectName: "Project O", student: "Étudiant 15", year: "2021", module: "Module 3", status: "rejected", detailsLink: "/details/15", description: "Description arbitraire pour Project O." },
    { id: 16, projectName: "Project P", student: "Étudiant 16", year: "2020", module: "Module 4", status: "approved", detailsLink: "/details/16", description: "Description arbitraire pour Project P." },
    { id: 17, projectName: "Project Q", student: "Étudiant 17", year: "2023", module: "Module 1", status: "pending", detailsLink: "/details/17", description: "Description arbitraire pour Project Q." },
    { id: 18, projectName: "Project R", student: "Étudiant 18", year: "2022", module: "Module 2", status: "rejected", detailsLink: "/details/18", description: "Description arbitraire pour Project R." },
    { id: 19, projectName: "Project S", student: "Étudiant 19", year: "2021", module: "Module 3", status: "approved", detailsLink: "/details/19", description: "Description arbitraire pour Project S." },
    { id: 20, projectName: "Project T", student: "Étudiant 20", year: "2020", module: "Module 4", status: "pending", detailsLink: "/details/20", description: "Description arbitraire pour Project T." },
    { id: 21, projectName: "Project U", student: "Étudiant 21", year: "2023", module: "Module 1", status: "rejected", detailsLink: "/details/21", description: "Description arbitraire pour Project U." },
    { id: 22, projectName: "Project V", student: "Étudiant 22", year: "2022", module: "Module 2", status: "approved", detailsLink: "/details/22", description: "Description arbitraire pour Project V." },
    { id: 23, projectName: "Project W", student: "Étudiant 23", year: "2021", module: "Module 3", status: "pending", detailsLink: "/details/23", description: "Description arbitraire pour Project W." },
    { id: 24, projectName: "Project X", student: "Étudiant 24", year: "2020", module: "Module 4", status: "rejected", detailsLink: "/details/24", description: "Description arbitraire pour Project X." },
    { id: 25, projectName: "Project Y", student: "Étudiant 25", year: "2023", module: "Module 1", status: "approved", detailsLink: "/details/25", description: "Description arbitraire pour Project Y." },
    { id: 26, projectName: "Project Z", student: "Étudiant 26", year: "2022", module: "Module 2", status: "pending", detailsLink: "/details/26", description: "Description arbitraire pour Project Z." },
];