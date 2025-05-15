import React, { useState } from "react";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa"; // Import entonnoir and reset icons
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { filterData } from "../../../mockData/dataEspaceProf"; // Import filter data


const Filter = ({
  selectedYear,
  setSelectedYear,
  selectedModule,
  setSelectedModule,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const resetFilters = () => {
    setSelectedYear("default");
    setSelectedModule("default");
    setSelectedStatus("default");
    setSearchQuery("");
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6 sm:ml-12">
      {/* Search Bar and Responsive Filter Button */}
      <div className="flex items-center gap-2 w-full sm:w-auto mx-2">
        <div className="relative rounded-lg p-2 flex-grow sm:flex-grow-0">
          <input
            type="text"
            placeholder="Rechercher Etudiant"
            value={searchQuery} // Bind search query state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            className="border-2 border-[var(--color-blue-3)] rounded-lg px-4 py-2 text-base w-full sm:w-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-1)] font-goudy font-bold text-[var(--color-blue-2)] sm:text-base"
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-[var(--color-blue-3)] pr-2">
            <FaSearch className="h-5 w-5" />
          </span>
        </div>
        <button
          className="sm:hidden flex items-center justify-center p-2 rounded-lg bg-[var(--color-blue-3)] text-[var(--color-background)]"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter className="h-5 w-5" />
        </button>
        <button
          className="sm:hidden flex items-center justify-center p-2 rounded-lg bg-[var(--color-blue-3)] text-[var(--color-background)]"
          onClick={resetFilters}
        >
          <FaRedo className="h-5 w-5" />
        </button>
      </div>

      {/* Filters List for Responsive View */}
      {showFilters && (
        <div className="w-full bg-[var(--color-background)] p-4 rounded-lg shadow-lg sm:hidden">
          <div className="mb-4">
            <h3 className="font-bold text-[var(--color-blue-1)] text-lg">
              Année :
            </h3>
            <ul>
              {filterData.years.slice(1).map(
                (
                  year // Start from the second value
                ) => (
                  <li
                    key={year.id}
                    className={`cursor-pointer py-1 pl-4 ${
                      selectedYear === year.value
                        ? "text-[var(--color-blue-3)] font-extrabold text-lg opacity-100 ml-2"
                        : "text-[var(--color-blue-1)] opacity-50"
                    }`}
                    onClick={() => setSelectedYear(year.value)}
                  >
                    {year.label}
                  </li>
                )
              )}
            </ul>
          </div>
          <hr className="border-t border-gray-300 w-4/5 mx-auto mb-4" />
          <div className="mb-4">
            <h3 className="font-bold text-[var(--color-blue-1)] text-lg">
              Module :
            </h3>
            <ul>
              {filterData.modules.slice(1).map(
                (
                  module // Start from the second value
                ) => (
                  <li
                    key={module.id}
                    className={`cursor-pointer py-1 pl-4 ${
                      selectedModule === module.value
                        ? "text-[var(--color-blue-3)] font-extrabold text-lg opacity-100 ml-4"
                        : "text-[var(--color-blue-1)] opacity-50"
                    }`}
                    onClick={() => setSelectedModule(module.value)}
                  >
                    {module.label}
                  </li>
                )
              )}
            </ul>
          </div>
          <hr className="border-t border-gray-300 w-4/5 mx-auto mb-4" />
          <div>
            <h3 className="font-bold text-[var(--color-blue-1)] text-lg">
              Statut :
            </h3>
            <ul>
              {filterData.status.slice(1).map(
                (
                  status // Start from the second value
                ) => (
                  <li
                    key={status.id}
                    className={`cursor-pointer py-1 pl-4 ${
                      selectedStatus === status.value
                        ? "text-[var(--color-blue-3)] font-extrabold text-lg opacity-100 ml-4"
                        : "text-[var(--color-blue-1)] opacity-50"
                    }`}
                    onClick={() => setSelectedStatus(status.value)}
                  >
                    {status.label}
                  </li>
                )
              )}
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
        {/* Filter by Year */}
        <Listbox value={selectedYear} onChange={setSelectedYear}>
          <div className="relative w-full sm:w-48 mx-2">
            <Listbox.Button
              className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border border-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out ${
                selectedYear !== "default"
                  ? "bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] focus:ring-[var(--color-blue-1)]"
                  : "bg-[var(--color-background)] text-[var(--color-blue-1)] focus:ring-[var(--color-blue-3)]"
              }`}
            >
              <span className="block truncate">
                {
                  filterData.years.find((year) => year.value === selectedYear)
                    ?.label
                }
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon
                  className={`h-5 w-5 ${
                    selectedYear !== "default"
                      ? "text-[var(--color-background)]"
                      : "text-[var(--color-blue-1)]"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-background)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {filterData.years.map((year) => (
                <Listbox.Option
                  key={year.id}
                  value={year.value}
                  disabled={year.value === "default"} // Disable default option
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
                  <span className="block truncate">{year.label}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Filter by Module */}
        <Listbox value={selectedModule} onChange={setSelectedModule}>
          <div className="relative w-full sm:w-48 mx-2">
            <Listbox.Button
              className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border border-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out ${
                selectedModule !== "default"
                  ? "bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] focus:ring-[var(--color-blue-1)]"
                  : "bg-[var(--color-background)] text-[var(--color-blue-1)] focus:ring-[var(--color-blue-3)]"
              }`}
            >
              <span className="block truncate">
                {
                  filterData.modules.find(
                    (module) => module.value === selectedModule
                  )?.label
                }
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon
                  className={`h-5 w-5 ${
                    selectedModule !== "default"
                      ? "text-[var(--color-background)]"
                      : "text-[var(--color-blue-1)]"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-background)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {filterData.modules.map((module) => (
                <Listbox.Option
                  key={module.id}
                  value={module.value}
                  disabled={module.value === "default"} // Disable default option
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
                  <span className="block truncate">{module.label}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Filter by Status */}
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
          <div className="relative w-full sm:w-48 mx-2">
            <Listbox.Button
              className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border border-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out ${
                selectedStatus !== "default"
                  ? "bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] focus:ring-[var(--color-blue-1)]"
                  : "bg-[var(--color-background)] text-[var(--color-blue-1)] focus:ring-[var(--color-blue-3)]"
              }`}
            >
              <span className="block truncate">
                {
                  filterData.status.find(
                    (status) => status.value === selectedStatus
                  )?.label
                }
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon
                  className={`h-5 w-5 ${
                    selectedStatus !== "default"
                      ? "text-[var(--color-background)]"
                      : "text-[var(--color-blue-1)]"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-background)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {filterData.status.map((status) => (
                <Listbox.Option
                  key={status.id}
                  value={status.value}
                  disabled={status.value === "default"} // Disable default option
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
                  <span className="block truncate">{status.label}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="hidden sm:flex items-center gap-2 mt-4 sm:mt-0 px-4 py-2 bg-[var(--color-blue-3)] text-[var(--color-background)] font-semibold rounded-lg shadow-md hover:bg-[var(--color-blue-4)] transition-all duration-300 ease-in-out"
      >
        <FaRedo className="h-4 w-4" />
        Réinitialiser
      </button>
    </div>
  );
};

export default Filter;
