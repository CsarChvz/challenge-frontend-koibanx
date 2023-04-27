import React, { SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filter: string;
  handleFilterSelect: (selectedFilter: SetStateAction<string>) => void;
};

const StatusFilter: React.FC<Props> = ({
  filter,
  isOpen,
  setIsOpen,
  handleFilterSelect,
}: Props) => {
  return (
    <div className="relative inline-block text-left ml-4">
      <button
        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700  border border-gray-300 rounded-md shadow-smfocus:outline-none ${
          filter === "Ambos"
            ? "bg-gray-50"
            : filter === "Activos"
            ? "bg-green-300"
            : "bg-red-300"
        } `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {filter}
        <svg
          className="w-5 h-5 ml-2 -mr-1 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a2 2 0 110-4 2 2 0 010 4zm-7-2a7 7 0 1114 0 7 7 0 01-14 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleFilterSelect("Ambos")}
            >
              Ambos
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleFilterSelect("Activos")}
            >
              Activos
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleFilterSelect("Inactivos")}
            >
              Inactivos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;
