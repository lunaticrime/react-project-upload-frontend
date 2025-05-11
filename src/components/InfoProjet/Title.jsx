export default function Title({ projectName, studentName }) {
  return (
    <div className="text-center px-6 py-12 bg-[var(--color-background)]">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold font-poppins text-[var(--color-blue-1)] mb-2 leading-snug sm:leading-snug lg:leading-normal xl:leading-20 tracking-wide">
        {projectName}
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-medium font-poppins text-[var(--color-blue-1)]">
        {studentName}
      </h2>
    </div>
  );
}
