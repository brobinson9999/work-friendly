import { useState } from "react";
import { ColumnTable, type ColumnTableColumn } from "./column-table";
import { ChartAxisSelector } from "./chart-axis-selector";
import type { ChartAxis } from "./bar-chart";

export type DataTableProps<TData> = {
  data: TData[];
  columns: ChartAxis<TData>[];
};

export function DataTable<TData>({ data, columns }: DataTableProps<TData>) {
  const [foreColorAxisIndex, setForeColorAxisIndex] = useState<number>(0);
  const [backColorAxisIndex, setBackColorAxisIndex] = useState<number>(0);

  const tableColumns: ColumnTableColumn<TData>[] = columns
    .filter((axis) => axis.visible)
    .map((axis) => ({
      header: axis.label,
      renderColumn: (_element, index) => axis.jsxValue(data, index),
    }));

  const foreColorAxis = columns[foreColorAxisIndex];
  const backColorAxis = columns[backColorAxisIndex];

  return (
    <>
      <ChartAxisSelector
        id="fore-color"
        label="Foreground Color"
        axes={columns}
        state={foreColorAxisIndex}
        setState={setForeColorAxisIndex}
      />
      <ChartAxisSelector
        id="back-color"
        label="Background Color"
        axes={columns}
        state={backColorAxisIndex}
        setState={setBackColorAxisIndex}
      />

      <ColumnTable
        columns={tableColumns}
        rows={data}
        rowStyle={(_row, index) => {
          const foreColor = foreColorAxis.colorValue(data, index) || undefined;
          const backColor = backColorAxis.colorValue(data, index) || undefined;
          return { color: foreColor, backgroundColor: backColor };
        }}
      />
    </>
  );
}
