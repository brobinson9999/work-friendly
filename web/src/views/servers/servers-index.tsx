import { servers, type Server } from "../../models/servers";
import { DataIndex } from "../../components/data-index";
import { ServersBash } from "./servers-bash";
import { BashIcon } from "../../icons/bash-icon";
import { requests } from "../../models/requests";
import { useEffect } from "react";
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
import {
  nullAxis,
  numberAxis,
  textAxis,
  widgetAxis,
  type ChartAxis,
} from "../../components/chart-axis";
import { ServersRequestTimingVisualization } from "./servers-request-timing-visualization";

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

export function ServersIndex() {
  const measureCpuUsage = async (server: Server) => {
    return createCpuSample({ serverId: server.id });
  };

  const testServerConnection = async (server: Server) => {
    return createPing({ serverId: server.id });
  };

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
      <ServersRequestTimingVisualization
        requests={requests.filter((r) => r.serverId === data[index].id)}
      />
    )),
    widgetAxis<Server>("Actions", (data, index) => (
      <div className="server-actions">
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
