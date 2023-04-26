// components/SearchTable.js
import { SetStateAction, useState } from "react";
import HeaderTable from "../HeaderTable";
import BodyTable from "../BodyTable";

interface Data {
  id: number;
  comercio: string;
  balance_actual: number;
  concepto_1: number;
  concepto_2: number;
  concepto_3: number;
  concepto_4: number;
  concepto_5: number;
  concepto_6: number;
  cuit: string;
  activo: boolean;
  ultima_venta: string;
}

type Props = {
  data: Data[];
};
const SearchTable = ({ data }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(false);

  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageOptions, setItemsPerPageOptions] = useState([
    5, 10, 25, 50,
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState("Ambos");

  const handleFilterSelect = (selectedFilter: SetStateAction<string>) => {
    setFilter(selectedFilter);
  };

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to page 1 when changing items per page
  };
  const filteredData = data
    .filter(
      (item: Data) =>
        item.comercio.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.cuit.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "Ambos" ? true : item.activo === (filter === "Activos"))
    )
    .sort((a: any, b: any) => {
      if (sortColumn) {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (sortDirection === "asc") {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      }
      return 0;
    });
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  interface Columns {
    name: string;
    label: string;
    sortable: boolean;
    sortDirection: string;
    handleSort: (column: string) => void;
  }

  const columnns: Columns[] = [
    {
      name: "comercio",
      label: "Comercio",
      sortable: true,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "cuit",
      label: "CUIT",
      sortable: true,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "concepto_1",
      label: "Concepto 1",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "concepto_2",
      label: "Concepto 2",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "concepto_3",
      label: "Concepto 3",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "concepto_4",
      label: "Concepto 4",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "concepto_5",
      label: "Concepto 5",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "concepto_6",
      label: "Concepto 6",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "balance_actual",
      label: "Balance actual",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "activo",
      label: "Estatus",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "ultima_venta",
      label: "Última venta",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
  ];

  return (
    // ...
    <div className="pb-4">
      <div className="flex mb-4">
        <div className="relative inline-block text-left ml-4">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
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
        <div className="relative inline-block text-left ml-4">{/* ... */}</div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-grow p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <HeaderTable
          columns={columnns}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
        />
        <BodyTable data={paginatedData} />
      </table>
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
    </div>
    // ...
  );
};

export default SearchTable;
