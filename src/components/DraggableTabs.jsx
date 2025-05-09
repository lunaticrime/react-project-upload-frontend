import React, { useRef, useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";

export default function DraggableTabs({ isDarkMode, setProfileActiveTab }) {
  const [activeTab, setActiveTab] = useState("Coding");
  const [isDragging, setIsDragging] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const tabsBoxRef = useRef(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const tabs = ["Overview", "Projects", "Something", "About"];

  const handleArrowClick = (direction) => {
    if (!tabsBoxRef.current) return;

    const scrollAmount = direction === "left" ? -340 : 340;
    tabsBoxRef.current.scrollLeft += scrollAmount;
  };

  // Track if we've moved while dragging to distinguish clicks from drags
  const [hasMoved, setHasMoved] = useState(false);

  const startDragging = (e) => {
    if (!tabsBoxRef.current) return;

    setIsDragging(true);
    setHasMoved(false);
    startXRef.current = e.pageX;
    scrollLeftRef.current = tabsBoxRef.current.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging || !tabsBoxRef.current) return;

    const x = e.pageX;
    const walk = x - startXRef.current;

    // If we've moved more than 5px, consider it a drag not a click
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }

    tabsBoxRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleTabClick = (tab) => {
    if (!hasMoved) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const handleScroll = () => {
      if (!tabsBox) return;

      const maxScrollWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
      setShowLeftArrow(tabsBox.scrollLeft > 0);
      setShowRightArrow(maxScrollWidth - tabsBox.scrollLeft > 1);
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    tabsBox.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      if (tabsBox) {
        tabsBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mouseleave", stopDragging);

    return () => {
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("mouseleave", stopDragging);
    };
  }, []);

  return (
    <>
      <div className="relative max-w-4xl overflow-x-hidden rounded-lg bg-blue-50 dark:bg-blue-1-dark p-2 w-full lg:hidden  flex justify-center">
        {showLeftArrow && (
          <div className="absolute left-0 z-30 top-0 flex h-full w-14 items-center bg-gradient-to-r from-blue-50 via-blue-50 to-transparent dark:from-blue-1-dark dark:via-blue-1-dark dark:to-transparent">
            <button
              onClick={() => handleArrowClick("left")}
              className="ml-0 flex h-14 w-14 items-center justify-center rounded-full hover:bg-blue-100 dark:hover:bg-blue-1-dark-sec focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke={`${isDarkMode ? "white" : "CurrentColor"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        )}

        <ul
          ref={tabsBoxRef}
          className={`flex list-none gap-2 overflow-x-hidden scroll-smooth  ${
            isDragging ? "cursor-grab" : ""
          }`}
          onMouseDown={startDragging}
          onMouseMove={dragging}
          onMouseUp={stopDragging}
        >
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => {
                handleTabClick(tab), setProfileActiveTab(tab);
              }}
              className={` group relative cursor-pointer whitespace-nowrap rounded-lg border  overflow-hidden min-w-max px-5 py-3 text-lg ${
                activeTab === tab
                  ? "border-transparent bg-blue-300 text-blue-50 dark:bg-blue-3-dark dark:border-blue-2"
                  : "border-slate-300 bg-blue-50 dark:bg-blue-1-dark "
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-1 to-blue-2 dark:from-blue-50 dark:to-blue-200 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
              <div
                className={`absolute z-10 -top-12 -right-12 text-9xl ${
                  activeTab === tab ? "text-blue-5" : "text-slate-200"
                }  dark:text-blue-2-dark group-hover:text-blue-3 dark:group-hover:text-blue-250 group-hover:rotate-12 transition-transform duration-300`}
              >
                <FiUser />
              </div>
              <div
                className={`font-bold text-xs ${
                  activeTab === tab ? "" : "text-blue-1"
                }  dark:text-blue-50 group-hover:text-white dark:group-hover:text-blue-1-dark relative z-10 duration-300`}
              >
                {tab}
              </div>
            </li>
          ))}
        </ul>

        {showRightArrow && (
          <div className="absolute right-0 top-0 z-30 flex h-full w-14 items-center justify-end bg-gradient-to-l from-blue-50 via-blue-50 to-transparent dark:from-blue-1-dark dark:via-blue-1-dark dark:to-transparent">
            <button
              onClick={() => handleArrowClick("right")}
              className="mr-0 flex h-14 w-14 items-center justify-center rounded-full hover:bg-blue-100 dark:hover:bg-blue-1-dark-sec focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke={`${isDarkMode ? "white" : "currentColor"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
