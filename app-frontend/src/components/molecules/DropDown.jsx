import { useState, useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CustomDropdown = ({ table }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, action) => {
    setIsOpen(false);
    action();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full p-2 text-gray-400 rounded-full bg-transparent hover:text-gray-300 focus:outline-none"
        >
          <MoreVertIcon />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-blue-600 text-white-300 rounded-md shadow-lg">
          <div className="py-1">
            {table.map(({ option, action }) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option, action)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-blue-500 hover:text-white"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
