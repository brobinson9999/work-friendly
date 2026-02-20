import { RowTable, type RowTableColumn } from "./row-table";

export interface ColumnTableColumn<T> extends RowTableColumn {
  renderColumn: (row: T, index: number) => React.ReactNode;
}

export interface ColumnTableProps<T> {
  columns: ColumnTableColumn<T>[];
  rows: T[];
  tableClasses?: string[];
  rowClasses?: (row: T, index: number) => string[];
  rowStyle?: (row: T, index: number) => React.CSSProperties;
}

export const loadingSpan = <span className="loading">Loading...</span>;

export function ColumnTable<T>({
  columns,
  rows,
  tableClasses,
  rowClasses,
  rowStyle,
}: ColumnTableProps<T>) {
  return (
    <RowTable
      columns={columns}
      rows={rows}
      tableClasses={tableClasses}
      rowClasses={rowClasses}
      rowStyle={rowStyle}
      renderRow={(row, index) => (
        <>
          {(() => {
            const cells: React.ReactNode[] = [];
            let colSpan = 0;

            columns.forEach((column, colIndex) => {
              const value = column.renderColumn(row, index);

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
