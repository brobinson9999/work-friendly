import { useRef, type JSX } from "react";
import { ColumnTable } from "../../components/column-table";
import type { Server } from "../../models/servers";
import { PrimaryContainer } from "../../components/primary-container";
import { redrawAll, useRedrawAll } from "../../hooks/use-redraw-all";
import {
  completeRequest,
  createRequest,
  requests,
  type Request,
} from "../../models/requests";
import { executeShellCommand } from "../../models/shell-command-executions";

interface Props {
  servers: Server[];
}

const TIME_WINDOW_MS = 10000; // 10 seconds

const styles = `
  @keyframes slideLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-600px);
    }
  }

  .timing-bar {
    animation: slideLeft ${TIME_WINDOW_MS * 2}ms linear forwards;
  }
`;

function TimingVisualization({ requests }: { requests: Request[] }) {
  const maxTime = new Date().getTime();
  const minTime = maxTime - TIME_WINDOW_MS;

  const timeRange = TIME_WINDOW_MS;

  const requestBars = useRef<JSX.Element[]>([]);
  const responseBars = useRef<JSX.Element[]>([]);

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    if (!requestBars.current[i]) {
      const timestamp = request.requestTimestamp.getTime();
      const positionPercent = ((timestamp - minTime) / timeRange) * 100;
      requestBars.current[i] = (
        <div
          key={`req-${i++}`}
          className="timing-bar"
          style={{
            position: "absolute",
            left: `${positionPercent}%`,
            top: "0%",
            width: "2px",
            height: "50%",
            backgroundColor: "var(--current-on-color)",
          }}
        />
      );
    }
  }

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    if (!responseBars.current[i] && request.responseTimestamp) {
      const timestamp = request.responseTimestamp.getTime();
      const positionPercent = ((timestamp - minTime) / timeRange) * 100;
      responseBars.current[i] = (
        <div
          key={`res-${i++}`}
          className="timing-bar"
          style={{
            position: "absolute",
            left: `${positionPercent}%`,
            top: "50%",
            width: "2px",
            height: "50%",
            backgroundColor: "var(--current-on-color)",
          }}
        />
      );
    }
  }

  return (
    <>
      <style>{styles}</style>
      <PrimaryContainer>
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "60px",
            border: "1px solid var(--current-on-color)",
            borderRadius: "4px",
            backgroundColor: "var(--current-color)",
            overflow: "hidden",
          }}
        >
          {/* Horizon line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: "var(--current-variant-color)",
            }}
          />

          {/* Request bars (going up) */}
          {...requestBars.current}

          {/* Response bars (going down) */}
          {...responseBars.current}
        </div>
      </PrimaryContainer>
    </>
  );
}

export function ServersTable({ servers }: Props) {
  useRedrawAll();

  const measureCpuUsage = async (server: Server) => {
    // For Windows servers.
    const shellCommandExecution = await executeShellCommand(
      server.id,
      `powershell -Command "Get-CimInstance Win32_Processor | Select-Object -ExpandProperty LoadPercentage"`,
    );
    const cpuUsageMatch = shellCommandExecution.stdout.match(/(\d+)\s*$/m);
    if (cpuUsageMatch) {
      server.cpu = parseInt(cpuUsageMatch[1], 10);
    } else {
      server.cpu = undefined;
    }

    // // For linux servers.
    // const shellCommandExecution = await executeShellCommand(
    //   server.id,
    //   `top -bn1 | grep 'Cpu(s)'`,
    // );
    // const cpuUsageMatch = shellCommandExecution.stdout.match(/(\d+\.\d+)\s*id/);
    // if (cpuUsageMatch) {
    //   const idleCpu = parseFloat(cpuUsageMatch[1]);
    //   server.cpu = Math.round(100 - idleCpu);
    // } else {
    //   server.cpu = undefined;
    // }

    redrawAll();
  };

  const testServerConnection = async (server: Server) => {
    server.status = "pending";
    server.ping = undefined;
    try {
      const newRequest = createRequest(
        server.id,
        "GET",
        `http://${server.hostname}:${server.port}/health`,
      );
      redrawAll();
      const response = await fetch(
        `http://${server.hostname}:${server.port}/health`,
      );
      completeRequest(newRequest);
      const roundTripTime = Math.round(
        (newRequest.responseTimestamp?.getTime() ?? 0) -
          newRequest.requestTimestamp.getTime(),
      );

      if (response.ok) {
        server.status = "online";
        server.ping = roundTripTime;
      } else {
        server.status = "offline";
      }
    } catch (_error) {
      server.status = "offline";
      server.ping = undefined;
    }
    redrawAll();
  };

  return (
    <ColumnTable
      columns={[
        { header: "ID", renderColumn: (server) => server.id },
        { header: "Hostname", renderColumn: (server) => server.hostname },
        { header: "Port", renderColumn: (server) => server.port },
        { header: "Status", renderColumn: (server) => server.status },
        { header: "Ping", renderColumn: (server) => server.ping ?? "N/A" },
        { header: "CPU %", renderColumn: (server) => server.cpu ?? "N/A" },
        {
          header: "Timing",
          renderColumn: (server) => (
            <TimingVisualization
              requests={requests.filter((r) => r.serverId === server.id)}
            />
          ),
        },
        {
          header: "Actions",
          renderColumn: (server) => (
            <>
              <button onClick={() => testServerConnection(server)}>
                Test Connection
              </button>
              <button onClick={() => measureCpuUsage(server)}>
                Measure CPU Usage
              </button>
            </>
          ),
        },
      ]}
      rows={servers}
    />
  );
}
