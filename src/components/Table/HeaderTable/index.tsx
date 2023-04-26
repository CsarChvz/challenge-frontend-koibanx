import React from "react";

type Props = {
  columns: Columns[];
  sortDirection: string;
  sortColumn?: string;
};

interface Columns {
  name: string;
  label: string;
  sortable: boolean;
  handleSort: (column: string) => void;
}

const HeaderTable: React.FC<Props> = ({
  columns,
  sortDirection,
  sortColumn,
}: Props) => {
  return (
    <thead>
      <tr>
        {columns.map((column: Columns) => (
          <th
            key={column.name}
            onClick={() =>
              column.sortable ? column.handleSort(column.name) : ""
            }
          >
            {column.label}
            {column.sortable && (
              <span>
                {sortColumn === column.name && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default HeaderTable;
