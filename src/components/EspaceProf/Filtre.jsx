import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import apiClient from "../../services/apiClient";

// Define filterData for years and status locally (modules will be fetched)
const filterDataYearsAndStatus = {
  years: [
    { id: 0, value: "", label: "Filter by Year" }, // Use empty string for no filter
    { id: 1, value: "2023", label: "2023" },
    { id: 2, value: "2022", label: "2022" },
    { id: 3, value: "2021", label: "2021" },
    { id: 4, value: "2020", label: "2020" },
    // Add more years as needed
  ],
  status: [
    { id: 0, value: "", label: "Filter by Status" }, // Use empty string for no filter
    { id: 1, value: "approved", label: "🟢 Approved" },
    { id: 2, value: "pending", label: "🟡 Pending" },
    { id: 3, value: "rejected", label: "🔴 Rejected" },
    // Add more statuses if needed
  ],
};

const Filter = ({
  selectedYear,
  setSelectedYear,
  selectedModule,
  setSelectedModule,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  onSearch,
  availableYears,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // State for modules fetched from API
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [moduleError, setModuleError] = useState(null);

  // Fetch modules when the component mounts
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await apiClient.get("/modules");
        // Assuming the API returns an array of module objects like [{ id: 1, nom: 'Module Name' }, ...]
        // Map them to the format expected by the Listbox
        const formattedModules = [
          { id: 0, value: "", label: "Filter by Module" }, // Add default option
          ...response.data.map((module) => ({
            id: module.id,
            value: String(module.id),
            label: module.nom,
          })),
        ];
        setModules(formattedModules);
      } catch (err) {
        console.error("Error fetching modules:", err);
        setModuleError("Failed to load modules.");
      } finally {
        setLoadingModules(false);
      }
    };

    fetchModules();
  }, []); // Empty dependency array means this effect runs only once on mount

  const resetFilters = () => {
    setSelectedYear("");
    setSelectedModule("");
    setSelectedStatus("");
    setSearchQuery("");
    if (onSearch) onSearch("", "", "", "");
  };

  // Function to trigger the search with current filter values
  const triggerSearch = (
    search = searchQuery,
    year = selectedYear,
    module = selectedModule,
    status = selectedStatus
  ) => {
    if (onSearch) onSearch(search, year, module, status);
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6 sm:ml-12">
      {/* Search Bar and Responsive Filter Button */}
      <div className="flex items-center gap-2 w-full sm:w-auto mx-2">
        <div className="relative rounded-lg p-2 flex-grow sm:flex-grow-0">
          <input
            type="text"
            placeholder="Rechercher Étudiant/Projet"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && triggerSearch()} // Trigger search on Enter
            className="border-2 border-blue-1 dark:border-blue-50 rounded-lg px-4 py-2 text-base w-full sm:w-100 focus:outline-none focus:ring-1 focus:ring-blue-50 font-goudy font-bold text-blue-2 dark:text-blue-50 sm:text-base placeholder:text-blue-1 dark:placeholder:text-blue-50 placeholder:opacity-50"
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-blue-1 dark:text-blue-50 pr-2">
            <FaSearch className="h-5 w-5" />
          </span>
        </div>
        {/* Toggle Filter Button for small screens */}
        <button
          className="sm:hidden flex items-center justify-center p-2 rounded-lg bg-blue-1 text-blue-50 dark:bg-blue-2-dark dark:text-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:hover:bg-blue-50 dark:hover:text-blue-1 transition-all duration-300"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter className="h-5 w-5" />
        </button>
        {/* Explicit Search button for all screens */}
        <button
          className="sm:hidden flex items-center justify-center p-2 rounded-full bg-blue-1 text-blue-50 dark:bg-blue-2-dark dark:text-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:hover:bg-blue-50 dark:hover:text-blue-1 transition-all duration-300"
          onClick={() => triggerSearch()} // Trigger search on button click
          title="Search"
        >
          <FaSearch className="h-5 w-5" />
        </button>
        {/* Reset button for small screens */}
        <button
          className="sm:hidden flex items-center justify-center p-2 rounded-lg bg-blue-1 text-blue-50 dark:bg-blue-2-dark dark:text-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:hover:bg-blue-50 dark:hover:text-blue-1 transition-all duration-300"
          onClick={resetFilters}
        >
          <FaRedo className="h-5 w-5" />
        </button>
      </div>

      {/* Filters List for Responsive View */}
      {showFilters && (
        <div className="w-full bg-[var(--color-background)] dark:bg-blue-2-dark p-4 rounded-lg shadow-lg sm:hidden">
          {/* Year Filter */}
          <div className="mb-4">
            <h3 className="font-bold text-[var(--color-blue-1)] dark:text-blue-50 text-lg">
              Année:
            </h3>
            <ul>
              {availableYears
                .filter((year) => year.value !== "") // Filter out the "Filter by" option
                .map((year) => (
                  <li
                    key={year.id}
                    className={`cursor-pointer py-1 pl-4 ${
                      selectedYear === year.value
                        ? "text-[var(--color-blue-3)] dark:text-blue-200 font-extrabold text-lg opacity-100 ml-2"
                        : "text-[var(--color-blue-1)] dark:text-blue-50 opacity-50"
                    }`}
                    onClick={() => {
                      setSelectedYear(year.value);
                      triggerSearch(
                        searchQuery,
                        year.value,
                        selectedModule,
                        selectedStatus
                      ); // Trigger search
                    }}
                  >
                    {year.label}
                  </li>
                ))}
            </ul>
          </div>
          <hr className="border-t border-gray-300 dark:border-blue-50 w-4/5 mx-auto mb-4" />
          {/* Module Filter */}
          <div className="mb-4">
            <h3 className="font-bold text-[var(--color-blue-1)] dark:text-blue-50 text-lg">
              Module:
            </h3>
            {loadingModules ? (
              <p>Loading modules...</p>
            ) : moduleError ? (
              <p className="text-red-500">{moduleError}</p>
            ) : (
              <ul>
                {modules
                  .filter((module) => module.value !== "") // Filter out the "Filter by" option
                  .map((module) => (
                    <li
                      key={module.id}
                      className={`cursor-pointer py-1 pl-4 ${
                        selectedModule === module.value
                          ? "text-[var(--color-blue-3)] dark:text-blue-200 font-extrabold text-lg opacity-100 ml-4"
                          : "text-[var(--color-blue-1)] dark:text-blue-50 opacity-50"
                      }`}
                      onClick={() => {
                        setSelectedModule(module.value);
                        triggerSearch(
                          searchQuery,
                          selectedYear,
                          module.value,
                          selectedStatus
                        ); // Trigger search
                      }}
                    >
                      {module.label}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <hr className="border-t border-gray-300 dark:border-blue-50 w-4/5 mx-auto mb-4" />
          {/* Status Filter */}
          <div>
            <h3 className="font-bold text-[var(--color-blue-1)] dark:text-blue-50 text-lg">
              Statut:
            </h3>
            <ul>
              {filterDataYearsAndStatus.status
                .filter((status) => status.value !== "") // Filter out the "Filter by" option
                .map((status) => (
                  <li
                    key={status.id}
                    className={`cursor-pointer py-1 pl-4 ${
                      selectedStatus === status.value
                        ? "text-[var(--color-blue-3)] dark:text-blue-200 font-extrabold text-lg opacity-100 ml-4"
                        : "text-[var(--color-blue-1)] dark:text-blue-50 opacity-50"
                    }`}
                    onClick={() => {
                      setSelectedStatus(status.value);
                      triggerSearch(
                        searchQuery,
                        selectedYear,
                        selectedModule,
                        status.value
                      ); // Trigger search
                    }}
                  >
                    {status.label}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {/* Filters Container for Desktop View */}
      <div className="hidden sm:flex flex-wrap items-center gap-4">
        {/* Filter by Year */}
        <Listbox
          value={selectedYear}
          onChange={(value) => {
            setSelectedYear(value);
            triggerSearch(searchQuery, value, selectedModule, selectedStatus); // Trigger search with updated year value
          }}
        >
          <div className="relative w-full sm:w-48 mx-2">
            <Listbox.Button
              className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border-2 border-blue-1 dark:border-blue-50 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
                selectedYear !== ""
                  ? "text-[var(--color-blue-3)] dark:text-blue-200 border-[var(--color-blue-3)] dark:border-blue-200"
                  : "text-blue-2 dark:text-blue-50"
              }`}
            >
              <span className="block truncate">
                {availableYears.find((year) => year.value === selectedYear)
                  ?.label || "Filter by Year"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon
                  className={`h-5 w-5 ${
                    selectedYear !== ""
                      ? "text-blue-50"
                      : "text-blue-1 dark:text-blue-50"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-blue-1-dark py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {availableYears.map((year) => (
                <Listbox.Option
                  key={year.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-50"
                        : "text-gray-900 dark:text-blue-50"
                    }`
                  }
                  value={year.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {year.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.174 1.097l-6 10.5a.75.75 0 01-1.342 0l-3-5.25a.75.75 0 011.342-.77l2.62 4.585 5.516-9.654a.75.75 0 011.096-.174z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Filter by Module */}
        <Listbox
          value={selectedModule}
          onChange={(value) => {
            setSelectedModule(value);
            triggerSearch(searchQuery, selectedYear, value, selectedStatus); // Trigger search
          }}
        >
          <div className="relative w-full sm:w-48 mx-2">
            <Listbox.Button
              className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border-2 border-blue-1 dark:border-blue-50 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
                selectedModule !== ""
                  ? "bg-blue-1 text-blue-50 focus:ring-blue-50"
                  : "bg-[var(--color-background)] text-blue-1 dark:text-blue-50 focus:ring-[var(--color-blue-3)]"
              }`}
            >
              <span className="block truncate">
                {loadingModules
                  ? "Loading..."
                  : moduleError
                  ? "Error loading"
                  : modules.find((module) => module.value === selectedModule)
                      ?.label || "Filter by Module"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon
                  className={`h-5 w-5 ${
                    selectedModule !== ""
                      ? "text-blue-50"
                      : "text-blue-1 dark:text-blue-50"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-blue-1-dark py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {modules.map((module) => (
                <Listbox.Option
                  key={module.id}
                  value={module.value}
                  disabled={module.value === ""} // Disable the "Filter by" option
                  className={({ active, disabled }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg ${
                      disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : active
                        ? "bg-blue-1 text-white"
                        : "text-blue-1 dark:text-blue-50"
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
        <Listbox
          value={selectedStatus}
          onChange={(value) => {
            setSelectedStatus(value);
            triggerSearch(searchQuery, selectedYear, selectedModule, value); // Trigger search
          }}
        >
          <div className="relative w-full sm:w-48 mx-2">
            <Listbox.Button
              className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border-2 border-blue-1 dark:border-blue-50 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
                selectedStatus !== ""
                  ? "bg-blue-1 text-blue-50 focus:ring-blue-50"
                  : "bg-[var(--color-background)] text-blue-1 dark:text-blue-50 focus:ring-[var(--color-blue-3)]"
              }`}
            >
              <span className="block truncate">
                {filterDataYearsAndStatus.status.find(
                  (status) => status.value === selectedStatus
                )?.label || "Filter by Status"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon
                  className={`h-5 w-5 ${
                    selectedStatus !== ""
                      ? "text-blue-50"
                      : "text-blue-1 dark:text-blue-50"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-blue-1-dark py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {filterDataYearsAndStatus.status.map((status) => (
                <Listbox.Option
                  key={status.id}
                  value={status.value}
                  disabled={status.value === ""} // Disable the "Filter by" option
                  className={({ active, disabled }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg ${
                      disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : active
                        ? "bg-blue-1 text-white"
                        : "text-blue-1 dark:text-blue-50"
                    }`
                  }
                >
                  <span className="block truncate">{status.label}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="sm:flex items-center text-blue-50 font-semibold rounded-md px-4 py-2 flex gap-2 border-2 cursor-pointer whitespace-nowrap bg-blue-1 border-blue-1 dark:border-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:text-blue-50 dark:bg-blue-2-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark shadow-md transition-all duration-300 ease-in-out"
        >
          <FaRedo className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
