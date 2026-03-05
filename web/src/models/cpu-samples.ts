import { executeShellCommand } from "./shell-command-executions";
import { stateChanged } from "./state-change";

export type CpuSampleParams = {
  serverId: string;
};

export type CpuSample = CpuSampleParams & {
  timestamp: Date;
  usage: number;
};

export const cpuSamples: CpuSample[] = [];

export async function createCpuSample(
  params: CpuSampleParams,
): Promise<CpuSample> {
  // For Windows servers.
  const shellCommandExecution = await executeShellCommand(
    params.serverId,
    `powershell -Command "Get-CimInstance Win32_Processor | Select-Object -ExpandProperty LoadPercentage"`,
  );
  const cpuUsageMatch = shellCommandExecution.stdout.match(/(\d+)\s*$/m);
  if (cpuUsageMatch) {
    const newCpuSample: CpuSample = {
      ...params,
      timestamp: new Date(),
      usage: parseInt(cpuUsageMatch[1], 10),
    };
    cpuSamples.push(newCpuSample);
    stateChanged();
    return newCpuSample;
  } else {
    throw new Error("Failed to parse CPU usage from command output");
  }
}

export function getMovingAverageCpuUsage(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = cpuSamples.filter((sample) => sample.serverId === serverId);
  if (samples.length === 0) {
    return 0;
  }
  const recentSamples = samples.slice(-windowSize);
  const totalUsage = recentSamples.reduce(
    (sum, sample) => sum + sample.usage,
    0,
  );
  return totalUsage / recentSamples.length;
}
