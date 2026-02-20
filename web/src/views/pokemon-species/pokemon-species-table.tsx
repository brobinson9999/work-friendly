import { useState } from "react";
import type { ChartAxis } from "../../components/bar-chart";
import {
  ColumnTable,
  type ColumnTableColumn,
} from "../../components/column-table";
import type { PokemonSpecies } from "../../models/pokemon-species";
import { pokemonSpeciesChartAxes } from "./pokemon-species-chart";
import { ChartAxisSelector } from "../../components/chart-axis-selector";

export type TableProps = {
  pokemonSpecies: PokemonSpecies[];
};

export function PokemonSpeciesTable({ pokemonSpecies }: TableProps) {
  const [foreColorAxisIndex, setForeColorAxisIndex] = useState<number>(0);
  const [backColorAxisIndex, setBackColorAxisIndex] = useState<number>(0);

  const columns: ColumnTableColumn<PokemonSpecies>[] =
    pokemonSpeciesChartAxes.map((axis) => ({
      header: axis.label,
      renderColumn: (_element, index) => axis.jsxValue(pokemonSpecies, index),
    }));

  const foreColorAxis = pokemonSpeciesChartAxes[foreColorAxisIndex];
  const backColorAxis = pokemonSpeciesChartAxes[backColorAxisIndex];

  return (
    <>
      <ChartAxisSelector
        id="fore-color"
        label="Foreground Color"
        axes={pokemonSpeciesChartAxes}
        state={foreColorAxisIndex}
        setState={setForeColorAxisIndex}
      />
      <ChartAxisSelector
        id="back-color"
        label="Background Color"
        axes={pokemonSpeciesChartAxes}
        state={backColorAxisIndex}
        setState={setBackColorAxisIndex}
      />

      <ColumnTable
        columns={columns}
        rows={pokemonSpecies}
        rowStyle={(_row, index) => {
          const foreColor =
            foreColorAxis.colorValue(pokemonSpecies, index) || undefined;
          const backColor =
            backColorAxis.colorValue(pokemonSpecies, index) || undefined;
          return { color: foreColor, backgroundColor: backColor };
        }}
      />
    </>
  );
}
