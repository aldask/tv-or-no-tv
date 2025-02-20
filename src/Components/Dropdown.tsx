import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

interface DropdownProps {
  title: string;
  options: string[];
  selectedValue: string | string[];
  onSelect: (value: string | string[]) => void;
  isMultiple?: boolean;
  darkMode: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  isMultiple,
  darkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  //   const handleOptionChange = (value: string) => {

  //   };

  return (
    <div className="relative w-64">
      <button
        onClick={handleDropdown}
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full flex justify-between items-center`}
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
          <div className="p-4 space-y-2">
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
                    // checked=
                    // onChange={() =>
                  />
                ) : (
                  <input
                    type="radio"
                    value={option}
                    name={title}
                    // checked=
                    // onChange={() =>
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
