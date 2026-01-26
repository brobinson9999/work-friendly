import { ColorSwatch } from "../../components/color-swatch";
import { ColumnTable } from "../../components/column-table";
import type { Color } from "../../models/colors";

interface TableProps {
  colors: Color[];
}

export function ColorsTable({ colors }: TableProps) {
  return (
    <ColumnTable
      columns={[
        {
          header: "Name",
          getValue: (color) => color.name,
        },
        {
          header: "R",
          getValue: (color) => color.r,
        },
        {
          header: "G",
          getValue: (color) => color.g,
        },
        {
          header: "B",
          getValue: (color) => color.b,
        },
        {
          header: "A",
          getValue: (color) => color.a,
        },
        {
          header: "Swatch",
          getValue: (color) => <ColorSwatch color={color} />,
        },
      ]}
      rows={colors}
    />
  );
}
