import { servers } from "./servers";

export type ShellCommandExecution = {
  serverId: string;
  command: string;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  startTime: string;
  endTime: string;
};

export async function executeShellCommand(
  serverId: string,
  command: string,
): Promise<ShellCommandExecution> {
  const shellCommandExecution: ShellCommandExecution = getShellCommandExecution(
    serverId,
    command,
  );
  await runShellCommand(shellCommandExecution);
  return shellCommandExecution;
}

export function getShellCommandExecution(
  serverId: string,
  command: string,
): ShellCommandExecution {
  return {
    serverId,
    command,
    stdout: "",
    stderr: "",
    exitCode: null,
    startTime: "",
    endTime: "",
  };
}

export async function runShellCommand(
  shellCommandExecution: ShellCommandExecution,
): Promise<void> {
  const server = servers.find((s) => s.id === shellCommandExecution.serverId);
  if (!server) {
    throw new Error(
      `Server with ID ${shellCommandExecution.serverId} not found`,
    );
  }
  const startTime = new Date().toLocaleString();
  shellCommandExecution.startTime = startTime;
  try {
    const response = await fetch(
      `http://${server.hostname}:${server.port}/shell`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: shellCommandExecution.command }),
      },
    );

    const json = await response.json();
    const endTime = new Date().toLocaleString();
    shellCommandExecution.stdout = json.stdout || "";
    shellCommandExecution.stderr = json.stderr || "";
    shellCommandExecution.exitCode = json.exitCode || 0;
    shellCommandExecution.endTime = endTime;
  } catch (error) {
    const endTime = new Date().toLocaleString();
    shellCommandExecution.stdout = "";
    shellCommandExecution.stderr = "Error: " + (error as Error).message;
    shellCommandExecution.exitCode = null;
    shellCommandExecution.endTime = endTime;
  }
}
