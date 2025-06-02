import React, { useState } from "react";

export default function Forum() {
  const [remarque, setRemarque] = useState("");
  const [note, setNote] = useState(0);

  const handleRemarqueChange = (e) => {
    setRemarque(e.target.value);
  };

  const handleNoteChange = (rating) => {
    setNote(rating);
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 bg-[var(--color-background)] rounded-lg shadow-lg">
      {/* Zone de remarque */}
      <div className="mb-6">
        <label
          htmlFor="remarque"
          className="block text-left text-base sm:text-lg md:text-xl font-medium font-poppins text-blue-1 dark:text-blue-50 mb-2"
        >
          📝 <strong>Comment box</strong>
        </label>
        <textarea
          id="remarque"
          className="w-full p-3 border border-blue-3 dark:border-blue-50 rounded-md bg-white dark:bg-blue-2-dark font-poppins text-blue-1 dark:text-blue-50 text-sm sm:text-base focus:ring-2 focus:ring-blue-3 dark:focus:ring-blue-50 transition-all"
          value={remarque}
          onChange={handleRemarqueChange}
          placeholder="Entrez votre remarque ici..."
          rows={4}
        />
      </div>

      {/* Section Note */}
      <div className="mb-6">
        {/* Ligne avec étoile, texte "Note :" et score */}
        <div className="flex flex-wrap items-center gap-3">
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.848 1.416 8.265L12 18.897l-7.415 3.943 1.416-8.265-6.001-5.848 8.332-1.209z" />
          </svg>

          <span className="text-base sm:text-lg md:text-xl font-medium font-poppins text-blue-1 dark:text-blue-200">
            <strong>Grade :</strong>
          </span>

          <span className="px-3 py-1 rounded-md bg-blue-3 dark:bg-blue-50 text-white dark:text-blue-1 text-sm sm:text-base font-semibold">
            {note}/5
          </span>
        </div>

        {/* Étoiles interactives */}
        <div className="flex gap-2 mt-2">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                className={`text-2xl sm:text-3xl cursor-pointer transition-transform hover:scale-110 ${
                  ratingValue <= note
                    ? "text-yellow-500"
                    : "text-gray-300 dark:text-gray-500"
                }`}
                onClick={() => handleNoteChange(ratingValue)}
              >
                ★
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
