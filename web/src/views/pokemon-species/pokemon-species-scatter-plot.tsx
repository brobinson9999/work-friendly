import { useState } from "react";
import type { PokemonSpecies } from "../../models/pokemon-species";
import { type ChartAxis } from "../../components/bar-chart";
import { ScatterPlot } from "../../components/scatter-plot";

export type GraphProps = {
  pokemonSpecies: PokemonSpecies[];
};

export function PokemonSpeciesScatterPlot({ pokemonSpecies }: GraphProps) {
  const [labelAxisIndex, setLabelAxisIndex] = useState<number>(0);
  const [xAxisIndex, setXAxisIndex] = useState<number>(0);
  const [yAxisIndex, setYAxisIndex] = useState<number>(0);

  if (!pokemonSpecies || pokemonSpecies.length === 0) {
    return <div>No data available.</div>;
  }

  const labelAxes: ChartAxis<PokemonSpecies, string>[] = [
    {
      label: "Name",
      getValue: (species) => species.name,
    },
  ];

  const valueAxes: ChartAxis<PokemonSpecies, number>[] = [
    {
      label: "Capture Rate",
      getValue: (species) => species.capture_rate!,
    },
    {
      label: "Base Happiness",
      getValue: (species) => species.base_happiness!,
    },
  ];

  const labelAxis = labelAxes[labelAxisIndex];
  const xAxis = valueAxes[xAxisIndex];
  const yAxis = valueAxes[yAxisIndex];

  return (
    <div>
      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="label-select">Label Axis: </label>
        <select
          id="label-select"
          value={labelAxisIndex}
          onChange={(e) => setLabelAxisIndex(parseInt(e.target.value))}
        >
          {labelAxes.map((axis, index) => (
            <option key={index} value={index}>
              {axis.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="x-axis-select">X Axis: </label>
        <select
          id="x-axis-select"
          value={xAxisIndex}
          onChange={(e) => setXAxisIndex(parseInt(e.target.value))}
        >
          {valueAxes.map((axis, index) => (
            <option key={index} value={index}>
              {axis.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="y-axis-select">Y Axis: </label>
        <select
          id="y-axis-select"
          value={yAxisIndex}
          onChange={(e) => setYAxisIndex(parseInt(e.target.value))}
        >
          {valueAxes.map((axis, index) => (
            <option key={index} value={index}>
              {axis.label}
            </option>
          ))}
        </select>
      </div>

      <ScatterPlot
        data={pokemonSpecies}
        labelAxis={labelAxis}
        xAxis={xAxis}
        yAxis={yAxis}
      />
    </div>
  );
}
