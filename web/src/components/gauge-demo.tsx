import { useEffect, useState } from "react";
import { Gauge, linearIndicatorPosition } from "./gauge";

export type GaugeDemoProps = {
  className: string;
};

export const GaugeDemo: React.FC<GaugeDemoProps> = ({ className }) => {
  const minValue = 0;
  const maxValue = 100;

  const [value, setValue] = useState(minValue);

  const indicatorPosition = linearIndicatorPosition(value, minValue, maxValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.round(Math.random() * (maxValue - minValue) + minValue));
    }, 700);
    return () => clearInterval(interval);
  }, [minValue, maxValue]);

  return (
    <div className={className}>
      <Gauge label={`0`} indicatorPosition={0} />
      <Gauge label={`25`} indicatorPosition={0.25} />
      <Gauge label={`50`} indicatorPosition={0.5} />
      <Gauge label={`75`} indicatorPosition={0.75} />
      <Gauge label={`100`} indicatorPosition={1} />
      <Gauge label={`${value}`} indicatorPosition={indicatorPosition} />
    </div>
  );
};
