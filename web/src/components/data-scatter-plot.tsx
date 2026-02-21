import { useState } from "react";
import { ScatterPlot } from "./scatter-plot";
import { ChartAxisSelector } from "./chart-axis-selector";
import type { ChartAxis } from "./bar-chart";

export type DataScatterPlotProps<TData> = {
  data: TData[];
  columns: ChartAxis<TData>[];
};

export function DataScatterPlot<TData>({
  data,
  columns,
}: DataScatterPlotProps<TData>) {
  const [labelAxisIndex, setLabelAxisIndex] = useState<number>(
    1 % columns.length,
  );
  const [xAxisIndex, setXAxisIndex] = useState<number>(2 % columns.length);
  const [yAxisIndex, setYAxisIndex] = useState<number>(3 % columns.length);
  const [radiusAxisIndex, setRadiusAxisIndex] = useState<number>(
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
  const xAxis = axes[xAxisIndex];
  const yAxis = axes[yAxisIndex];
  const radiusAxis = axes[radiusAxisIndex];
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
        id="x"
        label="X Axis"
        axes={axes}
        state={xAxisIndex}
        setState={setXAxisIndex}
      />

      <ChartAxisSelector
        id="y"
        label="Y Axis"
        axes={axes}
        state={yAxisIndex}
        setState={setYAxisIndex}
      />

      <ChartAxisSelector
        id="radius"
        label="Radius Axis"
        axes={axes}
        state={radiusAxisIndex}
        setState={setRadiusAxisIndex}
      />

      <ChartAxisSelector
        id="color"
        label="Color Axis"
        axes={axes}
        state={colorAxisIndex}
        setState={setColorAxisIndex}
      />

      <ScatterPlot
        data={data}
        labelAxis={labelAxis}
        xAxis={xAxis}
        yAxis={yAxis}
        radiusAxis={radiusAxis}
        colorAxis={colorAxis}
      />
    </div>
  );
}
