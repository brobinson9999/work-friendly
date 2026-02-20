import { useState } from "react";
import type { PokemonSpecies } from "../../models/pokemon-species";
import { BarChart } from "../../components/bar-chart";
import { pokemonSpeciesChartAxes } from "./pokemon-species-chart";
import { ChartAxisSelector } from "../../components/chart-axis-selector";

export type GraphProps = {
  pokemonSpecies: PokemonSpecies[];
};

// Simple bar chart using SVG
export function PokemonSpeciesChart({ pokemonSpecies }: GraphProps) {
  const [labelAxisIndex, setLabelAxisIndex] = useState<number>(0);
  const [valueAxisIndex, setValueAxisIndex] = useState<number>(0);
  const [barHeightAxisIndex, setBarHeightAxisIndex] = useState<number>(0);
  const [colorAxisIndex, setColorAxisIndex] = useState<number>(0);

  if (!pokemonSpecies || pokemonSpecies.length === 0) {
    return <div>No data available.</div>;
  }

  const axes = pokemonSpeciesChartAxes;

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
        data={pokemonSpecies}
        labelAxis={labelAxis}
        valueAxis={valueAxis}
        barHeightAxis={barHeightAxis}
        colorAxis={colorAxis}
      />
    </div>
  );
}
