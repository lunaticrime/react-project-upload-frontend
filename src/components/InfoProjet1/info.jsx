import React from "react";

export default function Info({ projectName, description, type, year, files }) {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12 bg-blue-50 dark:bg-blue-2-dark">
      <h1 className="text-lg sm:text-xl md:text-2xl font-poppins text-blue-1 dark:text-blue-50 mb-6 underline">
        Project Information
      </h1>
      <div className="text-sm sm:text-base md:text-lg font-medium font-poppins text-blue-1 dark:text-blue-50 space-y-4">
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📌 <strong>Title</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {projectName}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            🧾 <strong>Description</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📂 <strong>Type</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {type}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📅 <strong>Year</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span> {year}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="w-full sm:w-40">
            📥 <strong>Files</strong>
          </p>
          <p>
            <span className="hidden sm:inline">:</span>
          </p>
        </div>
        <div>
          <ul className="ml-6 sm:ml-20 list-disc">
            {files.map((file, index) => (
              <li key={index}>
                {file.name}
                <a
                  href={file.link}
                  className="text-blue-1 dark:text-blue-50 underline ml-2 hover:text-blue-3 dark:hover:text-blue-200"
                >
                  [Download]
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
