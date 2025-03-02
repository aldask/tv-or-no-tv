import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext";

interface DropdownProps {
  title: string;
  options: string[];
  selectedValue: string | string[];
  onSelect: (value: string | string[]) => void;
  isMultiple: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  isMultiple,
}) => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionChange = (value: string) => {
    if (isMultiple) {
      let updatedSelectedValues = Array.isArray(selectedValue)
        ? [...selectedValue]
        : [];

      if (updatedSelectedValues.includes(value)) {
        updatedSelectedValues = updatedSelectedValues.filter(
          (val) => val !== value
        );
      } else {
        updatedSelectedValues.push(value);
      }

      onSelect(updatedSelectedValues);
      navigate("?page=1");
      //need to set page back to 1 after
    } else {
      onSelect(value);
      navigate("?page=1");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full lg:w-36 mb-4">
      <button
        onClick={handleDropdown}
        className={`${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-700 border-gray-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-300 border-gray-300"
        } px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm transition-all duration-300 flex justify-between items-center`}
      >
        {title}
        <div
          className={`inline-block ml-2 text-xl transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronUp />
        </div>
      </button>
      {isOpen && (
        <div
          className={`absolute left-0 mt-2 w-full shadow-lg rounded-lg z-10 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } transform transition-all duration-300 ease-out opacity-100 animate-fadeIn`}
        >
          <div className="p-2 space-y-2">
            {options.map((option) => (
              <label
                key={option}
                className={`block flex items-center cursor-pointer text-sm ${
                  darkMode ? "text-white" : "text-black"
                } rounded-lg px-2 py-1 transition-all duration-300 ease-in-out transform hover:scale-105`}
              >
                {isMultiple ? (
                  <input
                    type="checkbox"
                    value={option}
                    className="mr-2"
                    checked={
                      Array.isArray(selectedValue) &&
                      selectedValue.includes(option)
                    }
                    onChange={() => handleOptionChange(option)}
                  />
                ) : (
                  <input
                    type="radio"
                    value={option}
                    name={title}
                    checked={selectedValue === option}
                    onChange={() => handleOptionChange(option)}
                    className="mr-2"
                  />
                )}
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
