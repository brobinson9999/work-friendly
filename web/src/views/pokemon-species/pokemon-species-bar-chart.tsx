import { useState } from "react";
import type { PokemonSpecies } from "../../models/pokemon-species";
import { BarChart, type ChartAxis } from "../../components/bar-chart";

export type GraphProps = {
  pokemonSpecies: PokemonSpecies[];
};

// Simple bar chart using SVG
export function PokemonSpeciesChart({ pokemonSpecies }: GraphProps) {
  const [labelAxisIndex, setLabelAxisIndex] = useState<number>(0);
  const [valueAxisIndex, setValueAxisIndex] = useState<number>(0);

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
  const valueAxis = valueAxes[valueAxisIndex];

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
        <label htmlFor="value-select">Value Axis: </label>
        <select
          id="value-select"
          value={valueAxisIndex}
          onChange={(e) => setValueAxisIndex(parseInt(e.target.value))}
        >
          {valueAxes.map((axis, index) => (
            <option key={index} value={index}>
              {axis.label}
            </option>
          ))}
        </select>
      </div>

      <BarChart
        data={pokemonSpecies}
        labelAxis={labelAxis}
        valueAxis={valueAxis}
      />
    </div>
  );
}
