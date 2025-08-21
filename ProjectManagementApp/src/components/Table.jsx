export default function Table({ columns, data, renderRow }) {
  return (
    <div className="mt-4 overflow-hidden border border-gray-200 rounded-2xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col}
                className="text-center text-xs font-semibold uppercase tracking-wide text-gray-600 px-4 py-3"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map(renderRow)
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-4"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
