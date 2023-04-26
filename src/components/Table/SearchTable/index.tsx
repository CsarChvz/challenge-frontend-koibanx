// components/SearchTable.js
import { useState } from "react";
import HeaderTable from "../HeaderTable";

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
  ultima_venta: Date;
}

const SearchTable = ({ data }: any) => {
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
    sortable: boolean;
    sortDirection: string;
    handleSort: (column: string) => void;
  }

  const columnns: Columns[] = [
    {
      name: "name",
      sortable: true,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
    {
      name: "email",
      sortable: true,
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
          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <HeaderTable
          columns={columnns}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
        />
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((item: any) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">{item.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.email}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
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
