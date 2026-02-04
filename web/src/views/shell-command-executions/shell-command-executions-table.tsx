import { ColumnTable, loadingSpan } from "../../components/column-table";
import { type ShellCommandExecution } from "../../models/shell-command-executions";

interface TableProps {
  shellCommandExecutions: ShellCommandExecution[];
}

export function ShellCommandExecutionsTable({
  shellCommandExecutions,
}: TableProps) {
  return (
    <ColumnTable
      columns={[
        {
          header: "Start Time",
          renderColumn: (row) => row.startTime,
        },
        {
          header: "Command",
          renderColumn: (row) => row.command,
        },
        {
          header: "End Time",
          renderColumn: (row) =>
            row.exitCode === null ? loadingSpan : row.endTime,
        },
        {
          header: "Exit Code",
          renderColumn: (row) =>
            row.exitCode === null ? loadingSpan : row.exitCode.toString(),
        },
        {
          header: "Stdout",
          renderColumn: (row) =>
            row.exitCode === null ? (
              loadingSpan
            ) : (
              <textarea
                value={row.stdout}
                readOnly
                rows={5}
                className="textarea-full-width"
              />
            ),
        },
        {
          header: "Stderr",
          renderColumn: (row) =>
            row.exitCode === null ? (
              loadingSpan
            ) : (
              <textarea
                value={row.stderr}
                readOnly
                rows={5}
                className="textarea-full-width"
              />
            ),
        },
      ]}
      rows={shellCommandExecutions}
    />
  );
}
