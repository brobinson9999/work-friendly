interface Column<T> {
  header: string;
  getValue: (row: T) => React.ReactNode;
}

interface ColumnTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  tableClass?: string;
  rowClass?: (row: T, index: number) => string;
}

export const loadingSpan = <span className="loading">Loading...</span>;

export function ColumnTable<T>({
  columns,
  rows,
  tableClass,
  rowClass,
}: ColumnTableProps<T>) {
  return (
    <table
      className={tableClass || ""}
      border={1}
      style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
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
              {(() => {
                const cells: React.ReactNode[] = [];
                let colSpan = 0;

                columns.forEach((column, colIndex) => {
                  const value = column.getValue(row);

                  if (value === loadingSpan) {
                    colSpan++;
                  } else {
                    if (colSpan > 0) {
                      cells.push(
                        <td
                          key={`loading-${colIndex - colSpan}`}
                          colSpan={colSpan}
                        >
                          {loadingSpan}
                        </td>,
                      );
                      colSpan = 0;
                    }
                    cells.push(<td key={colIndex}>{value}</td>);
                  }
                });

                if (colSpan > 0) {
                  cells.push(
                    <td
                      key={`loading-${columns.length - colSpan}`}
                      colSpan={colSpan}
                    >
                      {loadingSpan}
                    </td>,
                  );
                }

                return cells;
              })()}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
