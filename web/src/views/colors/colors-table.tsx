import { ColorSwatch } from "../../components/color-swatch";
import { ColumnTable } from "../../components/column-table";
import type { Color } from "../../models/colors";
import { useState } from "react";

interface TableProps {
  colors: Color[];
}

export function ColorsTable({ colors }: TableProps) {
  const [searchText, setSearchText] = useState("");

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search colors by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <ColumnTable
        columns={[
          {
            header: "Name",
            getValue: (color) => color.name,
          },
          {
            header: "CSS Value",
            getValue: (color) => color.cssValue,
          },
          {
            header: "Swatch",
            getValue: (color) => <ColorSwatch color={color} />,
          },
        ]}
        rows={filteredColors}
      />
    </div>
  );
}
