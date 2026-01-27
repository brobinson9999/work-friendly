interface TableProps<T> {
  columns: string[];
  rows: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
  tableClasses?: string[];
  rowClasses?: (row: T, index: number) => string[];
}

export function RowTable<T>({
  columns,
  rows,
  renderRow,
  tableClasses,
  rowClasses,
}: TableProps<T>) {
  return (
    <table className={["data-table", ...(tableClasses || [])].join(" ")}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="table-no-data-cell">
              No Data
            </td>
          </tr>
        ) : (
          rows.map((row, index) => (
            <tr
              key={index}
              className={(rowClasses ? rowClasses(row, index) : []).join(" ")}
            >
              {renderRow(row, index)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
