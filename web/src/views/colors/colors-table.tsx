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
          header: "CSS Value",
          getValue: (color) => color.cssValue,
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
