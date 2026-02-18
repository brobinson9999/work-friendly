import type { ChartAxis } from "./bar-chart";

export type ScatterPlotProps<TData> = {
  data: TData[];
  labelAxis?: ChartAxis<TData, string>;
  xAxis: ChartAxis<TData, number>;
  yAxis: ChartAxis<TData, number>;
  radiusAxis?: ChartAxis<TData, number>;
  colorAxis?: ChartAxis<TData, string>;
};

// Helper to generate ticks
function getTicks(min: number, max: number, count: number) {
  if (max === min) return [min];
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => min + i * step);
}

export function ScatterPlot<TData>({
  data,
  labelAxis,
  xAxis,
  yAxis,
  radiusAxis,
  colorAxis,
}: ScatterPlotProps<TData>) {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Chart dimensions
  const width = 600;
  const height = 400;
  const padding = 48;

  // Find min/max for scaling
  const xValues = data.map(xAxis.getValue);
  const yValues = data.map(yAxis.getValue);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  // Scale functions
  const xScale = (x: number) =>
    padding + ((x - xMin) / (xMax - xMin || 1)) * (width - 2 * padding);
  const yScale = (y: number) =>
    height -
    padding -
    ((y - yMin) / (yMax - yMin || 1)) * (height - 2 * padding);

  return (
    <div>
      <svg
        width={width}
        height={height}
        style={{ background: "#f9f9f9", border: "1px solid #ddd" }}
      >
        {/* Grid lines: vertical (X ticks) */}
        {getTicks(xMin, xMax, 6).map((tick, i) => {
          const x = xScale(tick);
          return (
            <line
              key={"x-grid-" + i}
              x1={x}
              y1={padding}
              x2={x}
              y2={height - padding}
              stroke="#bbb"
              strokeDasharray="4 4"
              opacity={0.3}
            />
          );
        })}
        {/* Grid lines: horizontal (Y ticks) */}
        {getTicks(yMin, yMax, 6).map((tick, i) => {
          const y = yScale(tick);
          return (
            <line
              key={"y-grid-" + i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#bbb"
              strokeDasharray="4 4"
              opacity={0.3}
            />
          );
        })}

        {/* X axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#888"
        />
        {/* Y axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#888"
        />

        {/* X axis ticks and labels */}
        {getTicks(xMin, xMax, 6).map((tick, i) => {
          const x = xScale(tick);
          return (
            <g key={"x-tick-" + i}>
              <line
                x1={x}
                y1={height - padding}
                x2={x}
                y2={height - padding + 8}
                stroke="#888"
              />
              <text
                x={x}
                y={height - padding + 22}
                textAnchor="middle"
                fontSize={12}
                fill="#444"
              >
                {Number.isInteger(tick) ? tick : tick.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Y axis ticks and labels */}
        {getTicks(yMin, yMax, 6).map((tick, i) => {
          const y = yScale(tick);
          return (
            <g key={"y-tick-" + i}>
              <line x1={padding - 8} y1={y} x2={padding} y2={y} stroke="#888" />
              <text
                x={padding - 12}
                y={y + 4}
                textAnchor="end"
                fontSize={12}
                fill="#444"
              >
                {Number.isInteger(tick) ? tick : tick.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* X axis label */}
        <text
          x={width / 2}
          y={height - 12}
          textAnchor="middle"
          fontSize={14}
          fill="#444"
        >
          {xAxis.label}
        </text>
        {/* Y axis label */}
        <text
          x={18}
          y={height / 2}
          textAnchor="middle"
          fontSize={14}
          fill="#444"
          transform={`rotate(-90 18,${height / 2})`}
        >
          {yAxis.label}
        </text>

        {/* Points */}
        {data.map((datum, i) => {
          const x = xScale(xAxis.getValue(datum));
          const y = yScale(yAxis.getValue(datum));
          const label = labelAxis ? labelAxis.getValue(datum) : "";
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={radiusAxis ? radiusAxis.getValue(datum) : 6}
                fill={colorAxis ? colorAxis.getValue(datum) : "#4f8ef7"}
                opacity={0.85}
              />
              {/* Visible label next to point */}
              <text
                x={x + 10}
                y={y - 8}
                fontSize={13}
                fill="#222"
                alignmentBaseline="middle"
                pointerEvents="none"
              >
                {label}
              </text>
              {/* Tooltip for accessibility */}
              <title>{label}</title>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
