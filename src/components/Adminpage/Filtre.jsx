import React, { useState, useRef } from "react";
import { FaSearch, FaFilter, FaRedo, FaUserPlus } from "react-icons/fa"; // Import icons
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { filterData } from "../../../mockData/dataEspaceAdmin";
import Title from "./Title";
import AddUser from "./addUser"; // Import AddUser component

const Filter = ({
  selectedRole,
  setSelectedRole,
  searchQuery,
  setSearchQuery,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false); // State to toggle AddUser popup
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const handleReset = () => {
    setSelectedRole("default");
    setSearchQuery("");
  };

  return (
    <div>
      <Title />
      {/* AddUser Popup */}
      {showAddUserPopup && (
        <AddUser onClose={() => setShowAddUserPopup(false)} />
      )}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6 sm:ml-12">
        {/* Search Bar and Responsive Filter Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto mx-2">
          <div className="relative rounded-lg p-2 flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Rechercher Nom"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-[var(--color-blue-3)] rounded-lg px-4 py-2 text-base w-full sm:w-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-1)] font-goudy font-bold text-[var(--color-blue-2)] sm:text-base"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-[var(--color-blue-3)] pr-2">
              <FaSearch className="h-5 w-5" />
            </span>
          </div>
          <button
            className="sm:hidden flex items-center justify-center p-2 rounded-full bg-[var(--color-blue-3)] text-[var(--color-background)]"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="h-5 w-5" />
          </button>
          <button
            className="sm:hidden flex items-center justify-center p-2 rounded-full bg-[var(--color-blue-3)] text-[var(--color-background)]"
            onClick={handleReset}
          >
            <FaRedo className="h-5 w-5" />
          </button>
          <button
            className="sm:hidden flex items-center justify-center p-2 rounded-full bg-[var(--color-blue-3)] text-[var(--color-background)]"
            onClick={() => setShowAddUserPopup(true)} // Show AddUser popup on click
          >
            <FaUserPlus className="h-5 w-5" />
          </button>
        </div>

        {/* Filters List for Responsive View */}
        {showFilters && (
          <div className="w-full bg-[var(--color-background)] p-4 rounded-lg shadow-lg sm:hidden">
            <div className="mb-4">
              <h3 className="font-bold text-[var(--color-blue-1)] text-lg">
                Rôle :
              </h3>
              <ul>
                {filterData.role.slice(1).map((role) => (
                  <li
                    key={role.id}
                    className={`cursor-pointer py-1 pl-4 ${
                      selectedRole === role.value
                        ? "text-[var(--color-blue-3)] font-extrabold text-lg opacity-100 ml-2"
                        : "text-[var(--color-blue-1)] opacity-50"
                    }`}
                    onClick={() => setSelectedRole(role.value)}
                  >
                    {role.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Filters Container for Desktop View */}
        <div
          className={`${
            showFilters || window.innerWidth < 640 ? "hidden" : "block"
          } sm:flex flex-wrap items-center gap-4`}
        >
          {/* Filter by Role */}
          <Listbox value={selectedRole} onChange={setSelectedRole}>
            <div className="relative w-full sm:w-48 mx-2">
              <Listbox.Button
                className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border border-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out ${
                  selectedRole !== "default"
                    ? "bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] focus:ring-[var(--color-blue-1)]"
                    : "bg-[var(--color-background)] text-[var(--color-blue-1)] focus:ring-[var(--color-blue-3)]"
                }`}
              >
                <span className="block truncate">
                  {filterData.role.find((role) => role.value === selectedRole)
                    ?.label || "Filtrer par Role"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronUpDownIcon
                    className={`h-5 w-5 ${
                      selectedRole !== "default"
                        ? "text-[var(--color-background)]"
                        : "text-[var(--color-blue-1)]"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-background)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                {filterData.role.map((role) => (
                  <Listbox.Option
                    key={role.id}
                    value={role.value}
                    disabled={role.value === "default"}
                    className={({ active, disabled }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg ${
                        disabled
                          ? "text-gray-400 cursor-not-allowed"
                          : active
                          ? "bg-[var(--color-blue-3)] text-white"
                          : "text-[var(--color-blue-1)]"
                      }`
                    }
                  >
                    <span className="block truncate">{role.label}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="hidden sm:flex items-center gap-2 mt-4 sm:mt-0 px-4 py-2 bg-[var(--color-blue-3)] text-[var(--color-background)] font-semibold rounded-lg shadow-md hover:bg-[var(--color-blue-4)] transition-all duration-300 ease-in-out"
        >
          <FaRedo className="h-4 w-4" />
          Réinitialiser
        </button>

        {/* Ajouter Utilisateur Button */}
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setShowAddUserPopup(true)} // Show AddUser popup on click
          className="hidden sm:flex items-center justify-center gap-2 mt-4 sm:mt-0 ml-auto mr-12 p-2 rounded-full bg-[var(--color-blue-3)] text-[var(--color-background)] font-semibold shadow-md hover:bg-[var(--color-blue-4)] transition-all duration-300 ease-in-out overflow-hidden"
          style={{ width: hovered ? "auto" : "40px", height: "40px" }}
        >
          <div className="flex items-center justify-center w-8 h-8">
            <FaUserPlus className="text-xl" /> {/* User add icon */}
          </div>
          <div
            style={{ width: hovered ? ref.current?.offsetWidth || 0 : 0 }}
            className="overflow-x-hidden transition-all duration-300 ease-out"
          >
            <span ref={ref} className="px-2 whitespace-nowrap">
              Ajouter Utilisateur
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Filter;
