import {
  nullAxis,
  textAxis,
  type ChartAxis,
} from "../../components/chart-axis";
import { DataIndex } from "../../components/data-index";
import { getTests, type Test } from "../../models/tests";

export function TestsIndex() {
  const axes: ChartAxis<Test>[] = [
    nullAxis<Test>("None"),
    textAxis<Test>("id", "ID", (test) => test.id),
    textAxis<Test>("result", "Result", (test) => test.result),
  ];

  return <DataIndex title="Tests" data={getTests()} axes={axes} />;
}
