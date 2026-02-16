import {
  ColumnTable,
  type ColumnTableColumn,
} from "../../components/column-table";
import type { Test } from "../../models/tests";

export type TableProps = {
  tests: Test[];
};

export function TestsTable({ tests }: TableProps) {
  const columns: ColumnTableColumn<Test>[] = [
    {
      header: "Name",
      // onClick: () => setSortBy("name"),
      renderColumn: (test) => test.id,
    },
    {
      header: "Result",
      // onClick: () => setSortBy("name"),
      renderColumn: (test) => test.result,
    },
  ];

  return <ColumnTable columns={columns} rows={tests} />;
}
