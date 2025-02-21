import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionChange = (value: string) => {
    if (isMultiple) {
      let updatedSelectedValues;
      if (Array.isArray(selectedValue)) {
        if (selectedValue.includes(value)) {
          updatedSelectedValues = selectedValue.filter((val) => val !== value);
        } else {
          updatedSelectedValues = [...selectedValue, value];
        }
        onSelect(updatedSelectedValues);
      }
    } else {
      onSelect(value);
    }
  };

  return (
    <div className="relative w-full sm:w-38">
      <button
        onClick={handleDropdown}
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full flex justify-between items-center`}
      >
        {title}
        {isOpen ? (
          <FaChevronUp className="inline-block ml-2 text-xl" />
        ) : (
          <FaChevronDown className="inline-block ml-2 text-xl" />
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 mt-2 w-full shadow-lg rounded-lg z-10 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          <div className="p-2 space-y-2">
            {options.map((option) => (
              <label
                key={option}
                className={`block flex items-center cursor-pointer ${
                  darkMode ? "text-white" : "text-black"
                }`}
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
