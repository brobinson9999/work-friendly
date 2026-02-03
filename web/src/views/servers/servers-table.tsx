import { useRef, type JSX } from "react";
import { ColumnTable } from "../../components/column-table";
import { useRedraw } from "../../hooks/use-redraw";
import type { Server } from "../../models/servers";

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

function TimingVisualization({
  requestTimestamps,
  responseTimestamps,
}: {
  requestTimestamps: number[];
  responseTimestamps: number[];
}) {
  const maxTime = performance.now();
  const minTime = maxTime - TIME_WINDOW_MS;

  const timeRange = TIME_WINDOW_MS;

  const requestBars = useRef<JSX.Element[]>([]);
  const responseBars = useRef<JSX.Element[]>([]);

  console.log({ requestTimestamps, requestBars });
  for (let i = 0; i < requestTimestamps.length; i++) {
    if (!requestBars.current[i]) {
      const timestamp = requestTimestamps[i];
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
            backgroundColor: "#4CAF50",
          }}
        />
      );
    }
  }

  for (let i = 0; i < responseTimestamps.length; i++) {
    if (!responseBars.current[i]) {
      const timestamp = responseTimestamps[i];
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
            backgroundColor: "#2196F3",
          }}
        />
      );
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "60px",
          border: "1px solid #ccc",
          borderRadius: "4px",
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
            height: "1px",
            backgroundColor: "#ccc",
          }}
        />

        {/* Request bars (going up) */}
        {...requestBars.current}

        {/* Response bars (going down) */}
        {...responseBars.current}
      </div>
    </>
  );
}

export function ServersTable({ servers }: Props) {
  const redraw = useRedraw();

  const testServerConnection = async (server: Server) => {
    server.status = "pending";
    server.ping = undefined;
    redraw();
    try {
      const startTime = performance.now();
      server.requestTimestamps.push(startTime);
      const response = await fetch(
        `http://${server.hostname}:${server.port}/health`,
      );
      const endTime = performance.now();
      server.responseTimestamps.push(endTime);
      const roundTripTime = Math.round(endTime - startTime);

      if (response.ok) {
        server.status = "online";
        server.ping = roundTripTime;
      } else {
        server.status = "offline";
      }
    } catch (error) {
      server.status = "offline";
      server.ping = undefined;
    }
    redraw();
  };

  return (
    <ColumnTable
      columns={[
        { header: "ID", getValue: (server) => server.id },
        { header: "Hostname", getValue: (server) => server.hostname },
        { header: "Port", getValue: (server) => server.port },
        // { header: "Status", getValue: (server) => server.status },
        // { header: "Ping", getValue: (server) => server.ping ?? "N/A" },
        {
          header: "Timing",
          getValue: (server) => (
            <TimingVisualization
              requestTimestamps={server.requestTimestamps}
              responseTimestamps={server.responseTimestamps}
            />
          ),
        },
        {
          header: "Actions",
          getValue: (server) => (
            <button onClick={() => testServerConnection(server)}>
              Test Connection
            </button>
          ),
        },
      ]}
      rows={servers}
    />
  );
}
