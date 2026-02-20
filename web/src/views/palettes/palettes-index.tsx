import { palettes, type Palette } from "../../models/palettes";
import {
  nullAxis,
  textAxis,
  widgetAxis,
  type ChartAxis,
} from "../../components/bar-chart";
import { PaletteSwatch } from "../../components/palette-swatch";
import { DataIndex } from "../../components/data-index";

export function PalettesIndex() {
  const axes: ChartAxis<Palette>[] = [
    nullAxis<Palette>("None"),
    textAxis<Palette>("name", "Name", (palette) => palette.name),
    widgetAxis<Palette>("Swatch", (data, index) => (
      <PaletteSwatch colors={data[index].colors} />
    )),
  ];

  return <DataIndex title="Palettes" data={palettes} axes={axes} />;
}
