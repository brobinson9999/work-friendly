import type { ChartAxis } from "./bar-chart";

export type ScatterPlotProps<TData> = {
  data: TData[];
  labelAxis?: ChartAxis<TData>;
  xAxis: ChartAxis<TData>;
  yAxis: ChartAxis<TData>;
  radiusAxis?: ChartAxis<TData>;
  colorAxis?: ChartAxis<TData>;
};

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

  // Scale functions
  const availableWidth = width - 2 * padding;
  const availableHeight = height - 2 * padding;
  const xScale = (position: number) => position * availableWidth + padding;
  const yScale = (position: number) =>
    (1 - position) * availableHeight + padding;

  return (
    <div>
      <svg
        width={width}
        height={height}
        style={{ background: "#f9f9f9", border: "1px solid #ddd" }}
      >
        {/* Grid lines: vertical (X ticks) */}
        {xAxis.ticks(data).map((tick, i) => {
          const x = xScale(tick.position);
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
        {yAxis.ticks(data).map((tick, i) => {
          const y = yScale(tick.position);
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
        {xAxis.ticks(data).map((tick, i) => {
          const x = xScale(tick.position);
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
                {tick.label}
              </text>
            </g>
          );
        })}

        {/* Y axis ticks and labels */}
        {yAxis.ticks(data).map((tick, i) => {
          const y = yScale(tick.position);
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
                {tick.label}
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
        {data.map((_datum, i) => {
          const x = xScale(xAxis.position(data, i));
          const y = yScale(yAxis.position(data, i));
          const label = labelAxis ? labelAxis.stringValue(data, i) : "";
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={radiusAxis ? radiusAxis.position(data, i) * 6 : 6}
                fill={colorAxis ? colorAxis.stringValue(data, i) : "#4f8ef7"}
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
