import { redrawAll } from "../hooks/use-redraw-all";

export type PokemonSpecies = {
  name: string;
  url: string;
  base_happiness?: number;
  capture_rate?: number;
  color?: { name: string; url: string };
};

let pokemonSpecies: PokemonSpecies[] | undefined = undefined;

export function getPokemonSpecies(): PokemonSpecies[] | undefined {
  if (!pokemonSpecies) {
    fetch("https://pokeapi.co/api/v2/pokemon-species?limit=10")
      .then((response) => response.json())
      .then((data) => {
        const fetchedPokemonSpecies: PokemonSpecies[] = data.results.map(
          (result: { name: string; url: string }) => ({
            name: result.name,
            url: result.url,
          }),
        );
        pokemonSpecies = fetchedPokemonSpecies;
        redrawAll();
        fetchedPokemonSpecies.forEach((species) =>
          fetch(species.url)
            .then((res) => res.json())
            .then((details) => {
              Object.assign(species, details);
              console.log("species with details:", species);
              redrawAll();
            }),
        );
      });
  }
  return pokemonSpecies;
}
