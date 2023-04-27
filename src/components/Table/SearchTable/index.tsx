import { ChangeEvent, SetStateAction, useState } from "react";
import HeaderTable from "../HeaderTable";
import BodyTable from "../BodyTable";
import PaginationTable from "../PaginationTable";
import SearchBar from "../SearchBar";
import StatusFilter from "../StatusFilter";

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
    setCurrentPage(1); // Reset to page 1 when changing filter
  };

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to page 1 when changing items per page
  };

  const filteredData = data
    .filter((item: Data) => {
      // Filtrar por estatus
      if (
        (filter === "Activos" && !item.activo) ||
        (filter === "Inactivos" && item.activo)
      ) {
        return false;
      }

      // Dividir el término de búsqueda en palabras
      const searchWords = searchTerm.toLowerCase().split(" ");

      // Verificar si todas las palabras coinciden en algún campo
      return searchWords.every(
        (word) =>
          item.comercio.toLowerCase().includes(word) ||
          item.cuit.toLowerCase().includes(word) ||
          item.id.toString().includes(word)
      );
    })
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

  const handleSearch = (searchString: string) => {
    const searchWords = searchString.toLowerCase().split(" ");

    const idOrCuitMatches: any[] = [];
    const comercioMatches: any[] = [];

    searchWords.forEach((word) => {
      if (!isNaN(Number(word))) {
        // Si es un número, buscar en id o cuit
        idOrCuitMatches.push({ id: { $regex: word } });
        idOrCuitMatches.push({ cuit: { $regex: word } });
      } else {
        // Si no es un número, buscar en comercio
        comercioMatches.push({ comercio: { $regex: word } });
      }
    });

    const query = {
      $and: [
        { $or: idOrCuitMatches.length > 0 ? idOrCuitMatches : [{}] },
        { $and: comercioMatches.length > 0 ? comercioMatches : [{}] },
      ],
    };

    const api = `https://api.koibanx.com/stores?q=${JSON.stringify(query)}`;
    console.log("Querying: ", api);

    // Obtener los datos y filtrarlos por searchTerm
    // Realiza la solicitud a la API y procesa los datos según sea necesario
  };

  const columnns: Columns[] = [
    {
      name: "id",
      label: "ID",
      sortable: false,
      sortDirection: sortDirection,
      handleSort: handleSort,
    },
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
        <StatusFilter
          filter={filter}
          handleFilterSelect={handleFilterSelect}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="relative inline-block text-left ml-4">{/* ... */}</div>
        {/* SearchBar */}

        <SearchBar
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <HeaderTable
          columns={columnns}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
        />
        <BodyTable data={paginatedData} />
      </table>

      {/* Pagination and Rows por Page */}
      <PaginationTable
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        totalPages={totalPages}
        goToPage={goToPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
    // ...
  );
};

export default SearchTable;
