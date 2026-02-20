import { useState } from "react";
import { ButtonBar } from "./button-bar";
import { executeQuery, type OrderByClause } from "../utils/queryable";
import type { ChartAxis } from "./bar-chart";
import { useRedrawAll } from "../hooks/use-redraw-all";
import type { View } from ".";
import { DataScatterPlot } from "./data-scatter-plot";
import { ScatterPlotIcon } from "../icons/scatter-plot-icon";
import { DataBarChart } from "./data-bar-chart";
import { BarChartIcon } from "../icons/bar-chart-icon";
import { TsvListing } from "./tsv-listing";
import { TsvIcon } from "../icons/tsv-icon";
import { DataTable } from "./data-table";
import { TableIcon } from "../icons/table-icon";

interface DataIndexProps<TData> {
  title: string;
  newElement?: React.ReactNode;
  data: TData[];
  axes: ChartAxis<TData>[];
  views?: View[];
}

export function DataIndex<TData>({
  title,
  newElement,
  data,
  axes,
  views = [],
}: DataIndexProps<TData>) {
  useRedrawAll();

  const sortableColumns: ChartAxis<TData>[] = axes.filter((col) => col.compare);

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<number>(0);

  const orderByCol = sortableColumns[sortBy];
  const orderBy = orderByCol
    ? [{ column: orderByCol.id, direction: "asc" }]
    : [];
  const queryResult = executeQuery(
    data,
    {
      orderBy: orderBy as OrderByClause<TData>[],
    },
    (item) =>
      axes.some(
        (axis) =>
          axis.search && axis.search(data, data.indexOf(item), searchText),
      ),
  );

  const defaultViews: View[] = [
    {
      id: "Table",
      name: "Table",
      icon: <TableIcon />,
      component: <DataTable data={queryResult} columns={axes} />,
    },
    {
      id: "TSV",
      name: "TSV",
      icon: <TsvIcon />,
      component: <TsvListing data={queryResult} columns={axes} />,
    },
    {
      id: "Bar Chart",
      name: "Bar Chart",
      icon: <BarChartIcon />,
      component: <DataBarChart data={queryResult} columns={axes} />,
    },
    {
      id: "Scatter Plot",
      name: "Scatter Plot",
      icon: <ScatterPlotIcon />,
      component: <DataScatterPlot data={queryResult} columns={axes} />,
    },
  ];

  const combinedViews = [...defaultViews, ...views];

  const [mode, setMode] = useState<string>(combinedViews[0].id);

  return (
    <div>
      <h1>{title}</h1>
      {newElement}
      <div>
        <h4>Search</h4>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <h4>Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(parseInt(e.target.value))}
        >
          {sortableColumns.map((col, index) => (
            <option key={index} value={index}>
              {col.label}
            </option>
          ))}
        </select>
      </div>
      {combinedViews.length > 1 && (
        <div className="view-selector">
          <ButtonBar
            selectedButton={mode}
            setSelectedButton={setMode}
            buttons={combinedViews.map((view) => ({
              id: view.id,
              contents: (
                <span role="img" aria-label={view.name}>
                  {view.icon}
                </span>
              ),
              tooltip: view.name,
            }))}
          />
        </div>
      )}
      {combinedViews.find((v) => v.id === mode)?.component}
    </div>
  );
}
