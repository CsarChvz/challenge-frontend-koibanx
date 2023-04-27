import React from "react";

type Props = {
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  handleItemsPerPageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

const PaginationTable: React.FC<Props> = ({
  currentPage,
  goToPage,
  handleItemsPerPageChange,
  itemsPerPage,
  itemsPerPageOptions,
  totalPages,
}: Props) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="mr-4">
        <label htmlFor="itemsPerPage">Filas por página:</label>
        <select
          name="itemsPerPage"
          id="itemsPerPage"
          value={itemsPerPage}
          className="ml-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
          onChange={handleItemsPerPageChange}
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button
        className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="mx-2">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationTable;
