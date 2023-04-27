import { type } from "os";
import React from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: (event: any) => void;
  handleSearch: (searchTerm: string) => void;
};
const SearchBar: React.FC<Props> = ({
  handleSearch,
  searchTerm,
  setSearchTerm,
}: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        className="flex-grow p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => {
          setSearchTerm(event.target.value);
          handleSearch(searchTerm);
        }}
      />
    </>
  );
};

export default SearchBar;
