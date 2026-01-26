import "./row-table.css";

interface TableProps<T> {
  columns: string[];
  rows: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
  tableClass?: string;
  rowClass?: (row: T, index: number) => string;
}

export function RowTable<T>({
  columns,
  rows,
  renderRow,
  tableClass,
  rowClass,
}: TableProps<T>) {
  return (
    <table
      className={tableClass || ""}
      border={1}
      style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}
    >
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
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
              No Data
            </td>
          </tr>
        ) : (
          rows.map((row, index) => (
            <tr key={index} className={rowClass ? rowClass(row, index) : ""}>
              {renderRow(row, index)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
