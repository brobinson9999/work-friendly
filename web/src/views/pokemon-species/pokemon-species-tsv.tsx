import { CodeListing } from "../../components/code-listing";
import type { PokemonSpecies } from "../../models/pokemon-species";

interface Props {
  pokemonSpecies: PokemonSpecies[];
}

export function PokemonSpeciesTsv({ pokemonSpecies }: Props) {
  return (
    <CodeListing
      content={
        "Name\tBase Happiness\tCapture Rate\tColor\n" +
        pokemonSpecies
          .map(
            (species) =>
              `${species.name}\t${species.base_happiness ?? "N/A"}\t${species.capture_rate ?? "N/A"}\t${species.color?.name ?? "N/A"}`,
          )
          .join("\n")
      }
    />
  );
}
