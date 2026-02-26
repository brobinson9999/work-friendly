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
      <Gauge label={`${value}`} indicatorPosition={indicatorPosition} />
    </div>
  );
};
