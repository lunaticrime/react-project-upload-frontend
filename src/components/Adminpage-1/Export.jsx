import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FiUser } from "react-icons/fi";
import { FaRedo, FaTimes } from "react-icons/fa"; // Import reset and close icons
// import { filterData } from "../../../mockData/dataEspaceAdmin";
const filterData = {
  role: [
    { id: 0, value: "default", label: "Filter by Role" },
    { id: 1, value: "Admin", label: "Admin" },
    { id: 2, value: "Student", label: "Student" },
    { id: 3, value: "Teacher", label: "Teacher" },
  ],
  years: [
    { id: 0, value: "default", label: "Filter by Year" },
    { id: 1, value: "2020", label: "2020" },
    { id: 2, value: "2021", label: "2021" },
    { id: 3, value: "2022", label: "2022" },
    { id: 4, value: "2023", label: "2023" },
  ],
  status: [
    { id: 0, value: "default", label: "Filter by Status" },
    { id: 1, value: "approved", label: "🟢 Approved" },
    { id: 2, value: "pending", label: "🟡 Pending" },
    { id: 3, value: "rejected", label: "🔴 Rejected" },
  ],
  types: [
    { id: 0, value: "default", label: "Filter by Type" },
    { id: 1, value: "report", label: "Report" },
    { id: 2, value: "presentation", label: "Presentation" },
    { id: 3, value: "other", label: "Other" },
  ],
};

const Export = ({ isOpen, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState("default");
  const [selectedYear, setSelectedYear] = useState("default");
  const [selectedType, setSelectedType] = useState("default");

  const handleReset = () => {
    setSelectedStatus("default");
    setSelectedYear("default");
    setSelectedType("default");
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 backdrop-blur-sm bg-black/30`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-blue-50 dark:bg-blue-1 rounded-2xl shadow-lg p-12 transition-all relative w-[800px] max-w-full scale-100 opacity-100 translate-y-0`}
        style={{
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-blue-1 dark:text-blue-50 hover:bg-blue-100 hover:text-blue-1 dark:hover:bg-blue-50 dark:hover:text-blue-1"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-1 dark:text-blue-50">
          Data Export
        </h2>
        <p className="text-sm text-center text-blue-2 dark:text-blue-100 mb-4">
          Download essential data for reporting or archiving purposes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
          {/* Filters Section */}
          <div className="flex gap-3 sm:gap-4">
            <Listbox value={selectedStatus} onChange={setSelectedStatus}>
              <div className="relative w-full sm:w-48">
                <Listbox.Button
                  className={`relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border-2 border-blue-1 dark:border-blue-50 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
                    selectedStatus !== "default"
                      ? "bg-blue-1 text-blue-50 focus:ring-blue-50"
                      : "bg-blue-50 text-blue-1 focus:ring-blue-3 dark:bg-blue-2-dark dark:text-blue-50 dark:focus:ring-blue-50"
                  }`}
                >
                  <span className="block truncate">
                    {filterData.status.find(
                      (status) => status.value === selectedStatus
                    )?.label || "Filter by Status"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon
                      className={`h-5 w-5 ${
                        selectedStatus !== "default"
                          ? "text-blue-50"
                          : "text-blue-1 dark:text-blue-50"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-50 dark:bg-blue-1 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {filterData.status.map((status) => (
                    <Listbox.Option
                      key={status.id}
                      value={status.value}
                      disabled={status.value === "default"}
                      className={({ active, disabled }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg ${
                          disabled
                            ? "text-gray-400 cursor-not-allowed"
                            : active
                            ? "bg-blue-1 text-blue-50 dark:bg-blue-50 dark:text-blue-1"
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

            <Listbox value={selectedYear} onChange={setSelectedYear}>
              <div className="relative w-full sm:w-48">
                <Listbox.Button
                  className={`relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border-2 border-blue-1 dark:border-blue-50 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
                    selectedYear !== "default"
                      ? "bg-blue-1 text-blue-50 focus:ring-blue-50"
                      : "bg-blue-50 text-blue-1 focus:ring-blue-3 dark:bg-blue-2-dark dark:text-blue-50 dark:focus:ring-blue-50"
                  }`}
                >
                  <span className="block truncate">
                    {filterData.years.find(
                      (year) => year.value === selectedYear
                    )?.label || "Filter by Year"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon
                      className={`h-5 w-5 ${
                        selectedYear !== "default"
                          ? "text-blue-50"
                          : "text-blue-1 dark:text-blue-50"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-50 dark:bg-blue-1 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {filterData.years.map((year) => (
                    <Listbox.Option
                      key={year.id}
                      value={year.value}
                      disabled={year.value === "default"}
                      className={({ active, disabled }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg ${
                          disabled
                            ? "text-gray-400 cursor-not-allowed"
                            : active
                            ? "bg-blue-1 text-blue-50 dark:bg-blue-50 dark:text-blue-1"
                            : "text-blue-1 dark:text-blue-50"
                        }`
                      }
                    >
                      <span className="block truncate">{year.label}</span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

            <Listbox value={selectedType} onChange={setSelectedType}>
              <div className="relative w-full sm:w-48">
                <Listbox.Button
                  className={`relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border-2 border-blue-1 dark:border-blue-50 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
                    selectedType !== "default"
                      ? "bg-blue-1 text-blue-50 focus:ring-blue-50"
                      : "bg-blue-50 text-blue-1 focus:ring-blue-3 dark:bg-blue-2-dark dark:text-blue-50 dark:focus:ring-blue-50"
                  }`}
                >
                  <span className="block truncate">
                    {filterData.types.find(
                      (type) => type.value === selectedType
                    )?.label || "Filter by Type"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon
                      className={`h-5 w-5 ${
                        selectedType !== "default"
                          ? "text-blue-50"
                          : "text-blue-1 dark:text-blue-50"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-50 dark:bg-blue-1 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {filterData.types.map((type) => (
                    <Listbox.Option
                      key={type.id}
                      value={type.value}
                      disabled={type.value === "default"}
                      className={({ active, disabled }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg ${
                          disabled
                            ? "text-gray-400 cursor-not-allowed"
                            : active
                            ? "bg-blue-1 text-blue-50 dark:bg-blue-50 dark:text-blue-1"
                            : "text-blue-1 dark:text-blue-50"
                        }`
                      }
                    >
                      <span className="block truncate">{type.label}</span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="sm:flex items-center text-blue-50 font-semibold rounded-md px-4 py-2 flex gap-2 border-2 cursor-pointer whitespace-nowrap bg-blue-1 border-blue-1 dark:border-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:text-blue-50 dark:bg-blue-2-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark shadow-md transition-all duration-300 ease-in-out"
            title="Reset"
          >
            <FaRedo className="h-4 w-4" />
          </button>
        </div>
        {/* Buttons Section */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="w-40 px-4 py-2 text-blue-50 font-semibold rounded-md border-2 cursor-pointer bg-blue-1 border-blue-1 dark:border-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:text-blue-50 dark:bg-blue-2-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark shadow-md transition-all duration-300 ease-in-out">
            Export as PDF
          </button>
          <button className="w-40 px-4 py-2 text-blue-50 font-semibold rounded-md border-2 cursor-pointer bg-blue-1 border-blue-1 dark:border-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:text-blue-50 dark:bg-blue-2-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark shadow-md transition-all duration-300 ease-in-out">
            Export as Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Export;
