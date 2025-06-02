import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
    const dashBordSection = document.querySelector(".dashbord-section");
    if (dashBordSection) {
      dashBordSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <nav className="flex items-center justify-center mt-8">
      <ul className="inline-flex items-center space-x-1 rounded-md px-4 py-2">
        {/* Previous */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-[var(--color-blue-3)] dark:text-blue-50 dark:hover:text-blue-200"
            }`}
          >
            ← Previous
          </button>
        </li>

        {/* Pages */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-2 text-gray-400 dark:text-blue-200">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`relative px-3 py-1 text-sm font-medium transition-all duration-300 ${
                  currentPage === page
                    ? "text-[var(--color-blue-3)] dark:text-blue-50 after:scale-x-100"
                    : "text-gray-600 hover:text-[var(--color-blue-3)] dark:text-blue-50 dark:hover:text-blue-200 after:scale-x-0"
                } after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:h-[2px] after:w-[80%] after:bg-[var(--color-blue-3)] dark:after:bg-blue-50 after:origin-left after:transition-transform after:duration-300`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-[var(--color-blue-3)] dark:text-blue-50 dark:hover:text-blue-200"
            }`}
          >
            Next →
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
