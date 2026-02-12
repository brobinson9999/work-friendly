import { ColumnTable } from "../../components/column-table";
import type { Log } from "../../models/logs";

interface Props {
  logs: Log[];
}

export function LogsTable({ logs }: Props) {
  return (
    <ColumnTable
      columns={[
        {
          header: "Timestamp",
          renderColumn: (log) => log.timestamp.toISOString(),
        },
        { header: "Message", renderColumn: (log) => log.message },
      ]}
      rows={logs}
    />
  );
}
