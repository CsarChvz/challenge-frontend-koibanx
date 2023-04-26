// components/SearchTable.js
import { useState } from "react";
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

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to page 1 when changing items per page
  };
  const filteredData = data
    .filter(
      (item: any) =>
        item.comercio.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (showActive ? item.active : true)
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
    <div>
      <div className="w-full md:w-2/3 my-4 mx-auto">
        <input
          type="text"
          placeholder="Buscar..."
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
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
            className="ml-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
