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

const BodyTable: React.FC<Props> = ({ data }: Props) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200 text-white">
      {data.map((item: Data) => (
        <tr
          key={item.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white-900">
            {item.comercio}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.cuit}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.balance_actual}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.concepto_1}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.concepto_2}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.concepto_3}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.concepto_4}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.concepto_5}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
            {item.concepto_6}
          </td>
          {/* If active is true, set green if not red */}
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                item.activo
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {item.activo ? "Activo" : "Inactivo"}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.ultima_venta}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default BodyTable;
