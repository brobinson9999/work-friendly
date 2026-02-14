import {
  createShellCommandExecution,
  runShellCommand,
  shellCommandExecutions,
} from "../../models/shell-command-executions";
import { ShellCommandExecutionsTable } from "./shell-command-executions-table";
import { ShellCommandExecutionsNew } from "./shell-command-executions-new";
import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { redrawAll, useRedrawAll } from "../../hooks/use-redraw-all";

export function ShellCommandExecutionsIndex() {
  useRedrawAll();

  const submitCommand = async (serverId: string, command: string) => {
    const newShellCommandExecution = createShellCommandExecution(
      serverId,
      command,
    );
    redrawAll();
    await runShellCommand(newShellCommandExecution);
    redrawAll();
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
