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
          getValue: (row) => row.startTime,
        },
        {
          header: "Command",
          getValue: (row) => row.command,
        },
        {
          header: "End Time",
          getValue: (row) =>
            row.exitCode === null ? loadingSpan : row.endTime,
        },
        {
          header: "Exit Code",
          getValue: (row) =>
            row.exitCode === null ? loadingSpan : row.exitCode.toString(),
        },
        {
          header: "Stdout",
          getValue: (row) =>
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
          getValue: (row) =>
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
