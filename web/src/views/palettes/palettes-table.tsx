import { ColumnTable } from "../../components/column-table";
import { PaletteSwatch } from "../../components/palette-swatch";
import type { Palette } from "../../models/palettes";

interface TableProps {
  palettes: Palette[];
}

export function PalettesTable({ palettes }: TableProps) {
  return (
    <ColumnTable
      columns={[
        {
          header: "Name",
          getValue: (palette) => palette.name,
        },
        {
          header: "Swatch",
          getValue: (palette) => <PaletteSwatch colors={palette.colors} />,
        },
      ]}
      rows={palettes}
    />
  );
}
