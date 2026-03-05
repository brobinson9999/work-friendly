import type { ChartAxis } from "./chart-axis";
import { FormField } from "./form-field";

export type ChartAxisSelectorProps<TData> = {
  label: string;
  axes: ChartAxis<TData>[];
  state: number;
  setState: (index: number) => void;
};

// Simple bar chart using SVG
export function ChartAxisSelector<TData>({
  label,
  axes,
  state,
  setState,
}: ChartAxisSelectorProps<TData>) {
  return (
    <FormField
      label={label}
      input={(id) => (
        <select
          id={`${id}`}
          value={state}
          onChange={(e) => setState(parseInt(e.target.value))}
        >
          {axes.map((axis, index) => (
            <option key={index} value={index}>
              {axis.label}
            </option>
          ))}
        </select>
      )}
    />
  );
}
