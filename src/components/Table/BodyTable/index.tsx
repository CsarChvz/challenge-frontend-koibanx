import React from "react";

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

type ColumnName = {
  name:
    | string
    | "id"
    | "comercio"
    | "cuit"
    | "concepto_1"
    | "concepto_2"
    | "concepto_3"
    | "concepto_4"
    | "concepto_5"
    | "concepto_6"
    | "balance_actual"
    | "activo"
    | "ultima_venta";
};

interface ColumnsGeneric {
  name: string;
  label: string;
}

const BodyTable: React.FC<Props> = ({ data }: Props) => {
  const columnns: ColumnsGeneric[] = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "comercio",
      label: "Comercio",
    },
    {
      name: "cuit",
      label: "CUIT",
    },
    {
      name: "concepto_1",
      label: "Concepto 1",
    },
    {
      name: "concepto_2",
      label: "Concepto 2",
    },
    {
      name: "concepto_3",
      label: "Concepto 3",
    },
    {
      name: "concepto_4",
      label: "Concepto 4",
    },
    {
      name: "concepto_5",
      label: "Concepto 5",
    },
    {
      name: "concepto_6",
      label: "Concepto 6",
    },
    {
      name: "balance_actual",
      label: "Balance actual",
    },
    {
      name: "activo",
      label: "Estatus",
    },
    {
      name: "ultima_venta",
      label: "Última venta",
    },
  ];

  return (
    <tbody className="bg-white divide-y divide-gray-200 text-white">
      {data.map((item: any) => (
        <tr
          key={item.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {columnns.map((column) => {
            const columnName = column.name;
            if (columnName != "activo") {
              return (
                <td key={String(column.name)} className="px-4 py-3">
                  {item[columnName.toString()]}
                </td>
              );
            } else {
              return (
                <td key={String(column.name)} className="px-4 py-3">
                  {item[columnName.toString()] ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Inactivo
                    </span>
                  )}
                </td>
              );
            }
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default BodyTable;
