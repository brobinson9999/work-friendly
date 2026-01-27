import { CodeListing } from "../../components/code-listing";
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
        {
          header: "CSS Files",
          getValue: (theme) => (
            <>
              <ul>
                {theme.cssFiles.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            </>
          ),
        },
        {
          header: "Inline CSS",
          getValue: (theme) => <CodeListing content={theme.inlineCss} />,
        },
      ]}
      rows={themes}
    />
  );
}
