import { useState } from "react";
import { BarChart, type ChartAxis } from "./bar-chart";
import { ChartAxisSelector } from "./chart-axis-selector";

export type DataBarChartProps<TData> = {
  data: TData[];
  columns: ChartAxis<TData>[];
};

export function DataBarChart<TData>({
  data,
  columns,
}: DataBarChartProps<TData>) {
  const [labelAxisIndex, setLabelAxisIndex] = useState<number>(0);
  const [valueAxisIndex, setValueAxisIndex] = useState<number>(0);
  const [barHeightAxisIndex, setBarHeightAxisIndex] = useState<number>(0);
  const [colorAxisIndex, setColorAxisIndex] = useState<number>(0);

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const axes = columns;

  const labelAxis = axes[labelAxisIndex];
  const valueAxis = axes[valueAxisIndex];
  const barHeightAxis = axes[barHeightAxisIndex];
  const colorAxis = axes[colorAxisIndex];

  return (
    <div>
      <ChartAxisSelector
        id="label"
        label="Label Axis"
        axes={axes}
        state={labelAxisIndex}
        setState={setLabelAxisIndex}
      />
      <ChartAxisSelector
        id="value"
        label="Value Axis"
        axes={axes}
        state={valueAxisIndex}
        setState={setValueAxisIndex}
      />
      <ChartAxisSelector
        id="bar-height"
        label="Bar Height Axis"
        axes={axes}
        state={barHeightAxisIndex}
        setState={setBarHeightAxisIndex}
      />
      <ChartAxisSelector
        id="color"
        label="Color Axis"
        axes={axes}
        state={colorAxisIndex}
        setState={setColorAxisIndex}
      />

      <BarChart
        data={data}
        labelAxis={labelAxis}
        valueAxis={valueAxis}
        barHeightAxis={barHeightAxis}
        colorAxis={colorAxis}
      />
    </div>
  );
}
