import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Title({ projectName, studentName }) {
  const navigate = useNavigate();

  return (
    <div className="text-center px-6 py-12 bg-[var(--color-background)] relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 text-blue-1 dark:text-blue-50 hover:text-blue-3 dark:hover:text-blue-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold font-poppins text-blue-1 dark:text-blue-50 mb-2 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
        {projectName}
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-medium font-poppins text-blue-1 dark:text-blue-50">
        {studentName}
      </h2>
    </div>
  );
}
