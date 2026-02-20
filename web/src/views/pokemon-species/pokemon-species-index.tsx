import { DataTable } from "../../components/data-table";
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
import { DataBarChart } from "../../components/data-bar-chart";
import { ScatterPlotIcon } from "../../icons/scatter-plot-icon";
import { DataScatterPlot } from "../../components/data-scatter-plot";
import { TsvIcon } from "../../icons/tsv-icon";
import { BarChartIcon } from "../../icons/bar-chart-icon";
import { TsvListing } from "../../components/tsv-listing";
import {
  colorAxis,
  nullAxis,
  numberAxis,
  textAxis,
  type ChartAxis,
} from "../../components/bar-chart";

const pokemonSpeciesChartAxes: ChartAxis<PokemonSpecies>[] = [
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
  colorAxis<PokemonSpecies>("Color", (species) => species.color?.name ?? ""),
];

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
              <DataTable
                data={filteredPokemonSpecies}
                columns={pokemonSpeciesChartAxes}
              />
            ),
          },
          {
            id: "TSV",
            name: "TSV",
            icon: <TsvIcon />,
            component: (
              <TsvListing
                data={filteredPokemonSpecies}
                columns={pokemonSpeciesChartAxes}
              />
            ),
          },
          {
            id: "Bar Chart",
            name: "Bar Chart",
            icon: <BarChartIcon />,
            component: (
              <DataBarChart
                data={filteredPokemonSpecies}
                columns={pokemonSpeciesChartAxes}
              />
            ),
          },
          {
            id: "Scatter Plot",
            name: "Scatter Plot",
            icon: <ScatterPlotIcon />,
            component: (
              <DataScatterPlot
                data={filteredPokemonSpecies}
                columns={pokemonSpeciesChartAxes}
              />
            ),
          },
        ]}
      />
    </>
  );
}
