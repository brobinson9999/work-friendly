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
          renderColumn: (palette) => palette.name,
        },
        {
          header: "Swatch",
          renderColumn: (palette) => <PaletteSwatch colors={palette.colors} />,
        },
      ]}
      rows={palettes}
    />
  );
}
