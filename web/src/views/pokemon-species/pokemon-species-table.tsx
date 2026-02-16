import {
  ColumnTable,
  type ColumnTableColumn,
} from "../../components/column-table";
import type { PokemonSpecies } from "../../models/pokemon-species";

export type TableProps = {
  pokemonSpecies: PokemonSpecies[];
};

export function PokemonSpeciesTable({ pokemonSpecies }: TableProps) {
  const columns: ColumnTableColumn<PokemonSpecies>[] = [
    {
      header: "Name",
      // onClick: () => setSortBy("name"),
      renderColumn: (pokemonSpecies) => pokemonSpecies.name,
    },
    {
      header: "Base Happiness",
      // onClick: () => setSortBy("base_happiness"),
      renderColumn: (pokemonSpecies) =>
        pokemonSpecies.base_happiness !== undefined
          ? pokemonSpecies.base_happiness
          : "N/A",
    },
    {
      header: "Capture Rate",
      // onClick: () => setSortBy("capture_rate"),
      renderColumn: (pokemonSpecies) =>
        pokemonSpecies.capture_rate !== undefined
          ? pokemonSpecies.capture_rate
          : "N/A",
    },
    {
      header: "Color",
      renderColumn: (pokemonSpecies) => pokemonSpecies.color?.name || "N/A",
    },
  ];

  return <ColumnTable columns={columns} rows={pokemonSpecies} />;
}
