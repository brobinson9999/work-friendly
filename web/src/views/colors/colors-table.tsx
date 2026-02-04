import { ColorSwatch } from "../../components/color-swatch";
import {
  ColumnTable,
  type ColumnTableColumn,
} from "../../components/column-table";
import type { Color } from "../../models/colors";
import { useState } from "react";

export interface TableProps {
  colors: Color[];
}

export interface ColorsTableColumn extends ColumnTableColumn<Color> {
  id: string;
  compare?: (a: Color, b: Color) => number;
}

export function ColorsTable({ colors }: TableProps) {
  let sortBy: string;
  let setSortBy: React.Dispatch<React.SetStateAction<string>>;

  const columns: ColorsTableColumn[] = [
    {
      id: "name",
      header: "Name",
      onClick: () => setSortBy("name"),
      renderColumn: (color) => color.name,
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    {
      id: "cssValue",
      header: "CSS Value",
      onClick: () => setSortBy("cssValue"),
      renderColumn: (color) => color.cssValue,
      compare: (a, b) => a.cssValue.localeCompare(b.cssValue),
    },
    {
      id: "swatch",
      header: "Swatch",
      renderColumn: (color) => <ColorSwatch color={color} />,
    },
  ];

  const sortableColumns: ColorsTableColumn[] = columns.filter(
    (col) => col.compare,
  );

  const [searchText, setSearchText] = useState("");
  [sortBy, setSortBy] = useState<string>(sortableColumns[0].id);

  const filteredColors = colors
    .filter((color) =>
      color.name.toLowerCase().includes(searchText.toLowerCase()),
    )
    .sort((a, b) => {
      const col = sortableColumns.find((col) => col.id === sortBy);
      if (col && col.compare) {
        return col.compare(a, b);
      }
      return 0;
    });

  return (
    <div>
      <div>
        <h4>Search</h4>
        <input
          type="text"
          placeholder="Search colors by name..."
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
      <ColumnTable columns={columns} rows={filteredColors} />
    </div>
  );
}
