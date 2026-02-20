import {
  colorAxis,
  nullAxis,
  textAxis,
  type ChartAxis,
} from "../../components/bar-chart";
import { DataIndex } from "../../components/data-index";
import { colors, type Color } from "../../models/colors";

export function ColorsIndex() {
  const axes: ChartAxis<Color>[] = [
    nullAxis<Color>("None"),
    textAxis<Color>("name", "Name", (color) => color.name),
    textAxis<Color>("cssValue", "CSS Value", (color) => color.cssValue),
    colorAxis<Color>("cssValue", "Swatch", (color) => color.cssValue),
  ];

  return <DataIndex title="Colors" data={colors} axes={axes} />;
}
