import React from "react";

type Props = {
  data?: any;
};

const BodyTable: React.FC<Props> = ({ data }: Props) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item: any) => (
        <tr key={item.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {item.comercio}
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
  );
};

export default BodyTable;
