import { servers, type Server } from "../../models/servers";
import {
  nullAxis,
  numberAxis,
  textAxis,
  widgetAxis,
  type ChartAxis,
} from "../../components/bar-chart";
import { DataIndex } from "../../components/data-index";
import { ServersBash } from "./servers-bash";
import { BashIcon } from "../../icons/bash-icon";
import { requests, type Request } from "../../models/requests";
import { useEffect, useRef, type JSX } from "react";
import { PrimaryContainer } from "../../components/primary-container";
import { Gauge } from "../../components/gauge";
import {
  createCpuSample,
  getMovingAverageCpuUsage,
} from "../../models/cpu-samples";
import {
  createPing,
  getMovingAveragePingLatencyMs,
  lastPingWasSuccessful,
} from "../../models/pings";

function CpuGauge({ value }: { value: number }) {
  return (
    <Gauge
      className="two-seventy-speedo"
      label={`${value}%`}
      indicatorPosition={value / 100}
    />
  );
}

function PingGauge({ value }: { value: number }) {
  return (
    <div>
      <Gauge
        className="vertical-gauge"
        label={`${value} ms`}
        indicatorPosition={1 - 1 / (value / 100 + 1)}
      />
    </div>
  );
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
          key={`req-${request.id}`}
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
          key={`res-${request.id}`}
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

export function ServersIndex() {
  const measureCpuUsage = async (server: Server) => {
    return createCpuSample({ serverId: server.id });
  };

  const testServerConnection = async (server: Server) => {
    return createPing({ serverId: server.id });
  };

  // Background CPU usage polling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => {
      servers.forEach((server) => {
        measureCpuUsage(server);
        testServerConnection(server);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const axes: ChartAxis<Server>[] = [
    nullAxis<Server>("None"),
    textAxis<Server>("id", "ID", (server) => server.id),
    textAxis<Server>("hostname", "Hostname", (server) => server.hostname),
    numberAxis<Server>("port", "Port", (server) => server.port),
    textAxis<Server>("status", "Status", (server) =>
      lastPingWasSuccessful(server.id) ? "online" : "offline",
    ),
    widgetAxis<Server>("Ping (ms)", (data, index) => (
      <PingGauge
        value={
          lastPingWasSuccessful(data[index].id)
            ? getMovingAveragePingLatencyMs(data[index].id)
            : 0
        }
      />
    )),
    widgetAxis<Server>("CPU Usage", (data, index) => (
      <CpuGauge
        value={
          lastPingWasSuccessful(data[index].id)
            ? getMovingAverageCpuUsage(data[index].id)
            : 0
        }
      />
    )),
    widgetAxis<Server>("Visualization", (data, index) => (
      <TimingVisualization
        requests={requests.filter((r) => r.serverId === data[index].id)}
      />
    )),
    widgetAxis<Server>("Actions", (data, index) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => testServerConnection(data[index])}>
          Test Connection
        </button>
        <button onClick={() => measureCpuUsage(data[index])}>
          Measure CPU
        </button>
      </div>
    )),
  ];

  return (
    <DataIndex
      title="Servers"
      data={servers}
      axes={axes}
      views={[
        {
          id: "console",
          name: "Console Output",
          icon: <BashIcon />,
          component: <ServersBash servers={servers} />,
        },
      ]}
    />
  );
}
