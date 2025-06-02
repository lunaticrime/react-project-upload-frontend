import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
// import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
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
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-background)] rounded-2xl shadow-lg p-12 transition-all relative w-[800px] max-w-full"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--color-blue-3)] hover:bg-[var(--color-blue-6)] hover:text-[var(--color-blue-1)]"
        >
          <FaTimes />
        </button>

        {/* Title Section */}
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--color-blue-1)]">
          Data Export
        </h2>
        <p className="text-sm text-center text-[var(--color-blue-2)] mb-6">
          Download essential data for reporting or archiving.
        </p>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6">
          {/* Filter by Status */}
          <Listbox value={selectedStatus} onChange={setSelectedStatus}>
            <div className="relative w-full sm:w-48">
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
                  <FiUser
                    className={`h-5 w-5 ${
                      selectedStatus !== "default"
                        ? "text-[var(--color-background)]"
                        : "text-[var(--color-blue-1)]"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute top-full mt-2 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-background)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
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

          {/* Filter by Year */}
          <Listbox value={selectedYear} onChange={setSelectedYear}>
            <div className="relative w-full sm:w-48">
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
                  <FiUser
                    className={`h-5 w-5 ${
                      selectedYear !== "default"
                        ? "text-[var(--color-background)]"
                        : "text-[var(--color-blue-1)]"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute top-full mt-2 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-background)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
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

          {/* Filter by Type */}
          <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="relative w-full sm:w-48">
              <Listbox.Button
                className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border border-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out ${
                  selectedType !== "default"
                    ? "bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] focus:ring-[var(--color-blue-1)]"
                    : "bg-[var(--color-background)] text-[var(--color-blue-1)] focus:ring-[var(--color-blue-3)]"
                }`}
              >
                <span className="block truncate">
                  {
                    filterData.types.find((type) => type.value === selectedType)
                      ?.label
                  }
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <FiUser
                    className={`h-5 w-5 ${
                      selectedType !== "default"
                        ? "text-[var(--color-background)]"
                        : "text-[var(--color-blue-1)]"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute top-full mt-2 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-background)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
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
                          ? "bg-[var(--color-blue-3)] text-white"
                          : "text-[var(--color-blue-1)]"
                      }`
                    }
                  >
                    <span className="block truncate">{type.label}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center p-3 rounded-full bg-[var(--color-blue-3)] text-[var(--color-background)] shadow-md hover:bg-[var(--color-blue-4)] transition-all duration-300 ease-in-out"
            title="Reset"
          >
            <FaRedo className="h-5 w-5" />
          </button>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-4">
          <button className="w-full px-6 py-3 bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] font-semibold rounded-lg shadow-md hover:opacity-90 hover:translate-y-[-3px] hover:shadow-lg transition-all duration-200 cursor-pointer font-poppins">
            Export as PDF
          </button>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-[var(--color-blue-3)] to-[var(--color-blue-4)] text-[var(--color-background)] font-semibold rounded-lg shadow-md hover:opacity-90 hover:translate-y-[-3px] hover:shadow-lg transition-all duration-200 cursor-pointer font-poppins">
            Export as Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Export;
