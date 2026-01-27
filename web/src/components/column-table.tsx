import { RowTable } from "./row-table";

interface Column<T> {
  header: string;
  getValue: (row: T) => React.ReactNode;
}

interface ColumnTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  tableClasses?: string[];
  rowClasses?: (row: T, index: number) => string[];
}

export const loadingSpan = <span className="loading">Loading...</span>;

export function ColumnTable<T>({
  columns,
  rows,
  tableClasses,
  rowClasses,
}: ColumnTableProps<T>) {
  return (
    <RowTable
      columns={columns.map((col) => col.header)}
      rows={rows}
      tableClasses={tableClasses}
      rowClasses={rowClasses}
      renderRow={(row, _index) => (
        <>
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
                    <td key={`loading-${colIndex - colSpan}`} colSpan={colSpan}>
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
        </>
      )}
    />
  );
}
