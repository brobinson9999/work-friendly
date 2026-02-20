import {
  createShellCommandExecution,
  runShellCommand,
  shellCommandExecutions,
  type ShellCommandExecution,
} from "../../models/shell-command-executions";
import { ShellCommandExecutionsNew } from "./shell-command-executions-new";
import { redrawAll } from "../../hooks/use-redraw-all";
import { DataIndex } from "../../components/data-index";
import {
  dateAxis,
  nullAxis,
  numberAxis,
  textAxis,
  type ChartAxis,
} from "../../components/bar-chart";

export function ShellCommandExecutionsIndex() {
  const submitCommand = async (serverId: string, command: string) => {
    const newShellCommandExecution = createShellCommandExecution(
      serverId,
      command,
    );
    redrawAll();
    await runShellCommand(newShellCommandExecution);
    redrawAll();
  };

  const axes: ChartAxis<ShellCommandExecution>[] = [
    nullAxis<ShellCommandExecution>("None"),
    textAxis<ShellCommandExecution>(
      "serverId",
      "Server ID",
      (execution) => execution.serverId,
    ),
    textAxis<ShellCommandExecution>(
      "command",
      "Command",
      (execution) => execution.command,
    ),
    textAxis<ShellCommandExecution>(
      "stdout",
      "Stdout",
      (execution) => execution.stdout,
    ),
    textAxis<ShellCommandExecution>(
      "stderr",
      "Stderr",
      (execution) => execution.stderr,
    ),
    numberAxis<ShellCommandExecution>(
      "exitCode",
      "Exit Code",
      (execution) => execution.exitCode || 0,
    ),
    dateAxis<ShellCommandExecution>(
      "startTime",
      "Start Time",
      (execution) => execution.startTime || new Date(),
    ),
    dateAxis<ShellCommandExecution>(
      "endTime",
      "End Time",
      (execution) => execution.endTime || new Date(),
    ),
  ];

  return (
    <DataIndex
      title="Shell Command Executions"
      newElement={<ShellCommandExecutionsNew submitCommand={submitCommand} />}
      data={shellCommandExecutions}
      axes={axes}
    />
  );
}
