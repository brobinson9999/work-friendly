import { themes, type Theme } from "../../models/themes";
import { DataIndex } from "../../components/data-index";
import {
  nullAxis,
  textAxis,
  widgetAxis,
  type ChartAxis,
} from "../../components/bar-chart";
import { CodeListing } from "../../components/code-listing";

export function ThemesIndex() {
  const axes: ChartAxis<Theme>[] = [
    nullAxis<Theme>("None"),
    textAxis<Theme>("name", "Name", (theme) => theme.name),
    widgetAxis<Theme>("CSS Files", (themes, index) => {
      const theme = themes[index];
      return (
        <ul>
          {theme.cssFiles.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      );
    }),
    widgetAxis<Theme>("Inline CSS", (themes, index) => {
      const theme = themes[index];
      return <CodeListing content={theme.inlineCss} />;
    }),
  ];

  return <DataIndex title="Themes" data={themes} axes={axes} />;
}
