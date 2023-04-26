// components/SearchTable.js
import { useState } from "react";
import HeaderTable from "../HeaderTable";

const SearchTable = ({ data }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredData = data
    .filter(
      (item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
          {filteredData.map((item: any) => (
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
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.active ? "Activo" : "Inactivo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // ...
  );
};

export default SearchTable;
