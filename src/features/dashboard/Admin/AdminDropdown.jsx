import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function AdminDropdown({ options = [], onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  // Initialize selected option based on value prop
  useEffect(() => {
    if (options.length > 0) {
      const initialOption =
        value !== undefined
          ? options.find((opt) => opt.value === value) || options[0]
          : options[0];
      setSelectedOption(initialOption);
    }
  }, [options, value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange && typeof onChange === "function") {
      onChange(option.value);
    }
  };

  // Safety check for empty options
  if (!options || options.length === 0) {
    return (
      <div className="relative w-full">
        <div className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-500">
          No options available
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full p-2 border border-gray-300 rounded-md bg-white flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label || "Select an option"}</span>
        <IoIosArrowDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
