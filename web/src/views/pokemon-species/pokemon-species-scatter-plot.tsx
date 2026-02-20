import { useState } from "react";
import type { PokemonSpecies } from "../../models/pokemon-species";
import { ScatterPlot } from "../../components/scatter-plot";
import { pokemonSpeciesChartAxes } from "./pokemon-species-chart";
import { ChartAxisSelector } from "../../components/chart-axis-selector";

export type GraphProps = {
  pokemonSpecies: PokemonSpecies[];
};

export function PokemonSpeciesScatterPlot({ pokemonSpecies }: GraphProps) {
  const [labelAxisIndex, setLabelAxisIndex] = useState<number>(0);
  const [xAxisIndex, setXAxisIndex] = useState<number>(0);
  const [yAxisIndex, setYAxisIndex] = useState<number>(0);
  const [radiusAxisIndex, setRadiusAxisIndex] = useState<number>(0);
  const [colorAxisIndex, setColorAxisIndex] = useState<number>(0);

  if (!pokemonSpecies || pokemonSpecies.length === 0) {
    return <div>No data available.</div>;
  }

  const axes = pokemonSpeciesChartAxes;

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
        data={pokemonSpecies}
        labelAxis={labelAxis}
        xAxis={xAxis}
        yAxis={yAxis}
        radiusAxis={radiusAxis}
        colorAxis={colorAxis}
      />
    </div>
  );
}
