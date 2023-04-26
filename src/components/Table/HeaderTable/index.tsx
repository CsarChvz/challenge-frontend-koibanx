import React from "react";

type Props = {
  columns: Columns[];
  sortDirection: string;
  sortColumn?: string;
};

interface Columns {
  name: string;
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
          <th key={column.name} onClick={() => column.handleSort(column.name)}>
            {column.name}
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
