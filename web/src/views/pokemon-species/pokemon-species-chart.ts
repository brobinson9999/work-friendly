import type { PokemonSpecies } from "../../models/pokemon-species";
import {
  nullAxis,
  numberAxis,
  textAxis,
  type ChartAxis,
} from "../../components/bar-chart";

export const pokemonSpeciesChartAxes: ChartAxis<PokemonSpecies>[] = [
  nullAxis<PokemonSpecies>("None"),
  textAxis<PokemonSpecies>("Name", (species) => species.name),
  numberAxis<PokemonSpecies>(
    "Capture Rate",
    (species) => species.capture_rate!,
    { min: 0, max: 255 },
  ),
  numberAxis<PokemonSpecies>(
    "Base Happiness",
    (species) => species.base_happiness!,
    { min: 0, max: 255 },
  ),
  textAxis<PokemonSpecies>("Color", (species) => species.color?.name ?? ""),
];
