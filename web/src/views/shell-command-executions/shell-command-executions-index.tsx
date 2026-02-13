import { useState } from "react";
import {
  type ShellCommandExecution,
  createShellCommandExecution,
  runShellCommand,
  shellCommandExecutions,
} from "../../models/shell-command-executions";
import { ShellCommandExecutionsTable } from "./shell-command-executions-table";
import { ShellCommandExecutionsNew } from "./shell-command-executions-new";
import { Index } from "../../components";
import { useRedraw } from "../../hooks/use-redraw";
import { TableIcon } from "../../icons/table-icon";

export function ShellCommandExecutionsIndex() {
  const redraw = useRedraw();

  const submitCommand = async (serverId: string, command: string) => {
    const newShellCommandExecution = createShellCommandExecution(
      serverId,
      command,
    );
    redraw();
    await runShellCommand(newShellCommandExecution);
    redraw();
  };

  return (
    <Index
      title="Shell Command Executions"
      newElement={<ShellCommandExecutionsNew submitCommand={submitCommand} />}
      views={[
        {
          id: "Table",
          name: "Table",
          icon: <TableIcon />,
          component: (
            <ShellCommandExecutionsTable
              shellCommandExecutions={shellCommandExecutions}
            />
          ),
        },
      ]}
    />
  );
}
