import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FaRedo, FaTimes } from "react-icons/fa";
import { filterData } from "../../mockData/dataEspaceAdmin";
import apiClient from "../../services/apiClient";
import { toast } from "react-hot-toast";

const Export = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleReset = () => {
    setSelectedRole("");
    setSearchQuery("");
    console.log("Filters reset");
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const response = await apiClient.get("/export/pdf", {
        params: {
          search: searchQuery,
          role: selectedRole,
        },
        responseType: "blob",
      });

      // Create a blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      // Create a link element
      const fileURL = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "users.pdf";
      // Append to html link element page
      document.body.appendChild(link);
      // Start download
      link.click();
      // Clean up and remove the link
      link.parentNode.removeChild(link);
      toast.success("PDF exported successfully!");
      onClose();
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const response = await apiClient.get("/export/excel", {
        params: {
          search: searchQuery,
          role: selectedRole,
        },
        responseType: "blob",
      });

      // Create a blob from the Excel Stream
      const file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      // Create a link element
      const fileURL = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "users.xlsx";
      // Append to html link element page
      document.body.appendChild(link);
      // Start download
      link.click();
      // Clean up and remove the link
      link.parentNode.removeChild(link);
      toast.success("Excel file exported successfully!");
      onClose();
    } catch (error) {
      console.error("Error exporting Excel:", error);
      toast.error("Failed to export Excel file. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-blue-50 dark:bg-blue-2-dark rounded-lg shadow-xl p-8 sm:p-12 transition-all transform scale-100 opacity-100 relative w-full max-w-md md:max-w-lg lg:max-w-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-blue-1 dark:text-blue-50 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200"
          aria-label="Close export dialog"
        >
          <FaTimes className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-blue-1 dark:text-blue-50">
          Data Export
        </h2>
        <p className="text-sm text-center text-blue-2 dark:text-blue-200 mb-8">
          Download essential data for reporting or archiving.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative rounded-lg p-2 flex-grow sm:flex-grow-0 w-full">
            <input
              type="text"
              placeholder="Search Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-blue-1 dark:border-blue-50 rounded-lg px-4 py-2 text-base w-full focus:outline-none focus:ring-1 focus:ring-blue-50 font-goudy font-bold text-blue-2 dark:text-blue-50 sm:text-base placeholder:text-blue-1 dark:placeholder:text-blue-50 placeholder:opacity-50"
            />
          </div>

          {/* Filter by Role */}
          <Listbox value={selectedRole} onChange={setSelectedRole}>
            <div className="relative w-full sm:w-48">
              <Listbox.Button
                className={`relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left font-goudy font-bold border-2 border-blue-1 dark:border-blue-50 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
                  selectedRole !== ""
                    ? "bg-blue-1 text-blue-50 focus:ring-blue-50"
                    : "bg-[var(--color-background)] text-blue-1 focus:ring-[var(--color-blue-3)]"
                }`}
              >
                <span className="block truncate dark:text-blue-50">
                  {filterData.role.find((role) => role.value === selectedRole)
                    ?.label || "Filter by Role"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronUpDownIcon
                    className={`h-5 w-5 ${
                      selectedRole !== ""
                        ? "text-blue-50"
                        : "text-blue-1 dark:text-blue-50"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                {filterData.role.map((role) => (
                  <Listbox.Option
                    key={role.id}
                    value={role.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg ${
                        active
                          ? "bg-blue-1 text-white"
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

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center text-blue-50 font-semibold rounded-md px-4 py-2 gap-2 border-2 cursor-pointer whitespace-nowrap bg-blue-1 border-blue-1 dark:border-blue-50 hover:bg-blue-50 hover:text-blue-1 dark:text-blue-50 dark:bg-blue-2-dark dark:hover:bg-blue-50 dark:hover:text-blue-1-dark shadow-md transition-all duration-300 ease-in-out"
          >
            <FaRedo className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
              isExporting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isExporting ? "Exporting..." : "Export as PDF"}
          </button>
          <button
            onClick={handleExportExcel}
            disabled={isExporting}
            className={`w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 ${
              isExporting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isExporting ? "Exporting..." : "Export as Excel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Export;
