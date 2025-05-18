import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const rotatingWords = ["Centralize", "Enhance", "Share"];

const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={rotatingWords[index]}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "inline-block",
          minWidth: "80px",
          margin: "0 0.3rem",
          fontWeight: "600",
          color: "var(--color-blue-3)",
        }}
      >
        {rotatingWords[index]}
      </motion.span>
    </AnimatePresence>
  );
};

export default RotatingWord;
