import { useState, useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Boy from "../../assets/Images/depression.png";
import { useLocation } from "react-router-dom";
const CustomDropdown = ({ table }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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
          {location.pathname == "/chatbot" && <MoreVertIcon />}
          {location.pathname == "/" && (
            <div className="rounded-full bg-[#073143] border p-1 w-12 h-12">
              <img src={Boy} alt="" className="rounded-full w-full h-full" />
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-[#1B5F7C] text-white-300 rounded-md shadow-lg">
          <div className="py-1">
            {table.map(({ option, action }) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option, action)}
                className="w-full px-2 py-2 text-sm text-left bg-[#1B5F7C] hover:bg-[#1e6583] hover:text-white"
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
