import type { ChartAxis } from "./bar-chart";
import { CodeListing } from "./code-listing";

export interface TsvListingProps<TData> {
  data: TData[];
  columns: ChartAxis<TData>[];
}

export function TsvListing<TData>({ data, columns }: TsvListingProps<TData>) {
  const axes = columns.filter((axis) => axis.visible);

  return (
    <CodeListing
      content={
        axes.map((axis) => axis.label).join("\t") +
        "\n" +
        data
          .map((_item, index) =>
            axes.map((axis) => axis.stringValue(data, index)).join("\t"),
          )
          .join("\n")
      }
    />
  );
}
