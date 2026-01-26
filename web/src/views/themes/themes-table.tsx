import { ColorSwatch } from "../../components/color-swatch";
import { ColumnTable } from "../../components/column-table";
// import { PaletteSwatch } from "../../components/palette-swatch";
import type { Theme } from "../../models/themes";

interface Props {
  themes: Theme[];
}

export function ThemesTable({ themes }: Props) {
  return (
    <ColumnTable
      columns={[
        { header: "Name", getValue: (theme) => theme.name },
        // { header: 'Table Header Foreground', getValue: (theme) => <ColorSwatch color={theme.tableHeaderForegroundColor} /> },
        // { header: 'Table Header Background', getValue: (theme) => <ColorSwatch color={theme.tableHeaderBackgroundColor} /> },
        // { header: 'Table Foregrounds', getValue: (theme) => <PaletteSwatch colors={theme.tableForegroundColors} /> },
        // { header: 'Table Backgrounds', getValue: (theme) => <PaletteSwatch colors={theme.tableBackgroundColors} /> },
        // { header: 'Section Foregrounds', getValue: (theme) => <PaletteSwatch colors={theme.sectionForegroundColors} /> },
        // { header: 'Section Backgrounds', getValue: (theme) => <PaletteSwatch colors={theme.sectionBackgroundColors} /> },
        {
          header: "Error Color",
          getValue: (theme) => <ColorSwatch color={theme.errorColor} />,
        },
        {
          header: "Warning Color",
          getValue: (theme) => <ColorSwatch color={theme.warningColor} />,
        },
        {
          header: "Success Color",
          getValue: (theme) => <ColorSwatch color={theme.successColor} />,
        },
      ]}
      rows={themes}
    />
  );
}
