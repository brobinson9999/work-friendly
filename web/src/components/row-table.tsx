export interface RowTableColumn {
  header: string;
  onClick?: () => void;
}

export interface RowTableProps<T> {
  columns: RowTableColumn[];
  rows: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
  tableClasses?: string[];
  rowClasses?: (row: T, index: number) => string[];
  rowStyle?: (row: T, index: number) => React.CSSProperties;
}

export function RowTable<T>({
  columns,
  rows,
  renderRow,
  tableClasses,
  rowClasses,
  rowStyle,
}: RowTableProps<T>) {
  return (
    <table className={["data-table", ...(tableClasses || [])].join(" ")}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} onClick={column.onClick}>
              {column.header}
            </th>
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
              style={rowStyle ? rowStyle(row, index) : undefined}
            >
              {renderRow(row, index)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
