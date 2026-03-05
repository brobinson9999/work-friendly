import { useState } from "react";
import { BarChart } from "./bar-chart";
import { ChartAxisSelector } from "./chart-axis-selector";
import type { ChartAxis } from "./chart-axis";

export type DataBarChartProps<TData> = {
  data: TData[];
  columns: ChartAxis<TData>[];
};

export function DataBarChart<TData>({
  data,
  columns,
}: DataBarChartProps<TData>) {
  const [labelAxisIndex, setLabelAxisIndex] = useState<number>(
    1 % columns.length,
  );
  const [valueAxisIndex, setValueAxisIndex] = useState<number>(
    2 % columns.length,
  );
  const [barHeightAxisIndex, setBarHeightAxisIndex] = useState<number>(
    0 % columns.length,
  );
  const [colorAxisIndex, setColorAxisIndex] = useState<number>(
    0 % columns.length,
  );

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const axes = columns;

  const labelAxis = axes[labelAxisIndex];
  const valueAxis = axes[valueAxisIndex];
  const barHeightAxis = axes[barHeightAxisIndex];
  const colorAxis = axes[colorAxisIndex];

  return (
    <>
      <form>
        <fieldset>
          <legend>Bar Chart Settings</legend>

          <ChartAxisSelector
            label="Label Axis"
            axes={axes}
            state={labelAxisIndex}
            setState={setLabelAxisIndex}
          />
          <ChartAxisSelector
            label="Value Axis"
            axes={axes}
            state={valueAxisIndex}
            setState={setValueAxisIndex}
          />
          <ChartAxisSelector
            label="Bar Height Axis"
            axes={axes}
            state={barHeightAxisIndex}
            setState={setBarHeightAxisIndex}
          />
          <ChartAxisSelector
            label="Color Axis"
            axes={axes}
            state={colorAxisIndex}
            setState={setColorAxisIndex}
          />
        </fieldset>
      </form>

      <BarChart
        data={data}
        labelAxis={labelAxis}
        valueAxis={valueAxis}
        barHeightAxis={barHeightAxis}
        colorAxis={colorAxis}
      />
    </>
  );
}
