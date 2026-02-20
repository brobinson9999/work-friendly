import { getPokemonSpecies } from "../../models/pokemon-species";
import type { PokemonSpecies } from "../../models/pokemon-species";
import {
  colorAxis,
  nullAxis,
  numberAxis,
  textAxis,
  type ChartAxis,
} from "../../components/bar-chart";
import { DataIndex } from "../../components/data-index";

const pokemonSpeciesChartAxes: ChartAxis<PokemonSpecies>[] = [
  nullAxis<PokemonSpecies>("None"),
  textAxis<PokemonSpecies>("name", "Name", (species) => species.name),
  numberAxis<PokemonSpecies>(
    "capture_rate",
    "Capture Rate",
    (species) => species.capture_rate!,
    { min: 0, max: 255 },
  ),
  numberAxis<PokemonSpecies>(
    "base_happiness",
    "Base Happiness",
    (species) => species.base_happiness!,
    { min: 0, max: 255 },
  ),
  colorAxis<PokemonSpecies>(
    "color",
    "Color",
    (species) => species.color?.name ?? "",
  ),
];

export function PokemonSpeciesIndex() {
  return (
    <DataIndex<PokemonSpecies>
      title="Pokemon Species"
      data={getPokemonSpecies() || []}
      axes={pokemonSpeciesChartAxes}
    />
  );
}
