export default function Dropdown ({ field, selectedOption, options, selectOption, isOpen, setIsOpen, placeholder }) {
  const handleOptionSelect = (option) => {
    selectOption(option, field);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-gray-300"
      >
        {selectedOption || placeholder}
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
        >
          <path
            className="text-[#00167f] fill-current"
            d="M12 15.586L6.707 10.293a1 1 0 10-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 10-1.414-1.414L12 15.586z"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-48 py-2 mt-2 overflow-y-auto bg-white rounded-md shadow-lg max-h-72">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}