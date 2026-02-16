import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { useRedrawAll } from "../../hooks/use-redraw-all";
import { getTests } from "../../models/tests";
import { TestsTable } from "./tests-table";

export function TestsIndex() {
  useRedrawAll();

  return (
    <Index
      title="Tests"
      views={[
        {
          id: "Table",
          name: "Table",
          icon: <TableIcon />,
          component: <TestsTable tests={getTests()} />,
        },
      ]}
    />
  );
}
