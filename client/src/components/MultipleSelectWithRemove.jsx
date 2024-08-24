import React, { useState } from "react";

const MultipleSelectWithRemove = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (!selectedOptions.includes(selectedValue)) {
      const updatedOptions = [...selectedOptions, selectedValue];
      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
    }
  };

  const handleRemoveOption = (value) => {
    const updatedOptions = selectedOptions.filter((option) => option !== value);
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap border border-gray-300 rounded-md p-2 bg-white">
        {selectedOptions.map((option) => (
          <div
            key={option}
            className="flex items-center m-1 px-2 py-1 bg-gray-200 rounded-full"
          >
            <span className="mr-2">
              {options.find((o) => o.value === option).label}
            </span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveOption(option)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <select
        multiple
        value={selectedOptions}
        onChange={handleSelectChange}
        className="w-full py-2 pl-3 pr-10 text-base border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultipleSelectWithRemove;
