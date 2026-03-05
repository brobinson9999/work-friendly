import { useMemo, type JSX } from "react";

import type { ChartAxis } from "./chart-axis";
import { div } from "./tags";

export type RealTimeColumnChartProps<TData> = {
  data: TData[];
  keyAxis: ChartAxis<TData>;
  positiveAxis: ChartAxis<TData>;
  negativeAxis: ChartAxis<TData>;
};

const TIME_WINDOW_MS = 10000; // 10 seconds

export function RealTimeColumnChart<TData>({
  data,
  keyAxis,
  positiveAxis,
  negativeAxis,
}: RealTimeColumnChartProps<TData>) {
  const positiveBars = useMemo(() => new Map<string, JSX.Element>(), []);
  const negativeBars = useMemo(() => new Map<string, JSX.Element>(), []);

  data.forEach((_datum, index) => {
    const keyValue = keyAxis.stringValue(data, index);
    const positivePosition = positiveAxis.position(data, index);
    const negativePosition = negativeAxis.position(data, index);

    if (positivePosition < 0) {
      // eslint-disable-next-line react-hooks/immutability
      positiveBars.delete(keyValue);
    } else if (!positiveBars.has(keyValue)) {
      positiveBars.set(
        keyValue,
        div(
          ["positive", "timing-bar"],
          {
            "--x-position": `${positivePosition}`,
          },
          [],
          { key: `positive-${keyValue}` },
        ),
      );
    }

    if (negativePosition < 0) {
      // eslint-disable-next-line react-hooks/immutability
      negativeBars.delete(keyValue);
    } else if (!negativeBars.has(keyValue)) {
      negativeBars.set(
        keyValue,
        div(
          ["negative", "timing-bar"],
          {
            "--x-position": `${negativePosition}`,
          },
          [],
          { key: `negative-${keyValue}` },
        ),
      );
    }
  });

  return div(
    ["timing-visualization"],
    {
      "--time-window": `${TIME_WINDOW_MS}ms`,
    },
    [...positiveBars.values(), ...negativeBars.values()],
  );
}
