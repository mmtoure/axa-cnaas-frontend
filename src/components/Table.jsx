import React from "react";

const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-4 border-collapse">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-600 text-sm border-b border-gray-300">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={`py-3 font-medium text-center ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500 text-sm"
              >
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            data.map((item) => renderRow(item))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
