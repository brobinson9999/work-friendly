export type ShellCommandExecution = {
  command: string;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  startTime: string;
  endTime: string;
};

export async function executeShellCommand(
  command: string
): Promise<ShellCommandExecution> {
  const shellCommandExecution: ShellCommandExecution =
    getShellCommandExecution(command);
  await runShellCommand(shellCommandExecution);
  return shellCommandExecution;
}

export function getShellCommandExecution(
  command: string
): ShellCommandExecution {
  return {
    command,
    stdout: "",
    stderr: "",
    exitCode: null,
    startTime: "",
    endTime: "",
  };
}

export async function runShellCommand(
  shellCommandExecution: ShellCommandExecution
): Promise<void> {
  const startTime = new Date().toLocaleString();
  shellCommandExecution.startTime = startTime;
  try {
    const response = await fetch("http://localhost:3000/shell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command: shellCommandExecution.command }),
    });

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
