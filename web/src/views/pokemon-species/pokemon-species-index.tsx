import { PokemonSpeciesTable } from "./pokemon-species-table";
import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { getPokemonSpecies } from "../../models/pokemon-species";
import { useRedrawAll } from "../../hooks/use-redraw-all";
import {
  executeQuery,
  type OrderByClause,
  type QueryableColumn,
} from "../../utils/queryable";
import type { PokemonSpecies } from "../../models/pokemon-species";
import { useState } from "react";
import { PokemonSpeciesBarChart } from "./pokemon-species-bar-chart";
import { ScatterPlotIcon } from "../../icons/scatter-plot-icon";
import { PokemonSpeciesScatterPlot } from "./pokemon-species-scatter-plot";
import { PokemonSpeciesTsv } from "./pokemon-species-tsv";
import { TsvIcon } from "../../icons/tsv-icon";
import { BarChartIcon } from "../../icons/bar-chart-icon";

export function PokemonSpeciesIndex() {
  useRedrawAll();

  const pokemonSpecies = getPokemonSpecies();

  let sortBy: string;
  let setSortBy: React.Dispatch<React.SetStateAction<string>>;

  const columns: QueryableColumn<PokemonSpecies>[] = [
    {
      id: "name",
      header: "Name",
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    {
      id: "base_happiness",
      header: "Base Happiness",
      compare: (a, b) => (a.base_happiness ?? 0) - (b.base_happiness ?? 0),
    },
    {
      id: "capture_rate",
      header: "Capture Rate",
      compare: (a, b) => (a.capture_rate ?? 0) - (b.capture_rate ?? 0),
    },
    {
      id: "color",
      header: "Color",
      compare: (a, b) => {
        const colorA = a.color?.name || "";
        const colorB = b.color?.name || "";
        return colorA.localeCompare(colorB);
      },
    },
  ];

  const sortableColumns: QueryableColumn<PokemonSpecies>[] = columns.filter(
    (col) => col.compare,
  );

  const [searchText, setSearchText] = useState("");
  [sortBy, setSortBy] = useState<string>(sortableColumns[0].id);

  if (!pokemonSpecies) {
    return <div>Loading...</div>;
  }

  const orderByCol = sortableColumns.find((col) => col.id === sortBy);
  const orderBy = orderByCol ? [{ column: sortBy, direction: "asc" }] : [];
  const filteredPokemonSpecies = executeQuery(
    pokemonSpecies,
    {
      orderBy: orderBy as OrderByClause<PokemonSpecies>[],
    },
    (item) => item.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  // const filteredPokemonSpecies = pokemonSpecies
  //   .filter((pokemonSpecies) =>
  //     pokemonSpecies.name.toLowerCase().includes(searchText.toLowerCase()),
  //   )
  //   .sort((a, b) => {
  //     const col = sortableColumns.find((col) => col.id === sortBy);
  //     if (col && col.compare) {
  //       return col.compare(a, b);
  //     }
  //     return 0;
  //   });

  return (
    <>
      {" "}
      <div>
        <h4>Search</h4>
        <input
          type="text"
          placeholder="Search pokemon species by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <h4>Sort By</h4>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {sortableColumns.map((col, index) => (
            <option key={index} value={col.id}>
              {col.header}
            </option>
          ))}
        </select>
      </div>
      <Index
        title="Pokemon Species"
        views={[
          {
            id: "Table",
            name: "Table",
            icon: <TableIcon />,
            component: (
              <PokemonSpeciesTable pokemonSpecies={filteredPokemonSpecies} />
            ),
          },
          {
            id: "TSV",
            name: "TSV",
            icon: <TsvIcon />,
            component: (
              <PokemonSpeciesTsv pokemonSpecies={filteredPokemonSpecies} />
            ),
          },
          {
            id: "Bar Chart",
            name: "Bar Chart",
            icon: <BarChartIcon />,
            component: (
              <PokemonSpeciesBarChart pokemonSpecies={filteredPokemonSpecies} />
            ),
          },
          {
            id: "Scatter Plot",
            name: "Scatter Plot",
            icon: <ScatterPlotIcon />,
            component: (
              <PokemonSpeciesScatterPlot
                pokemonSpecies={filteredPokemonSpecies}
              />
            ),
          },
        ]}
      />
    </>
  );
}
