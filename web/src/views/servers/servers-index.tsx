import { servers, type Server } from "../../models/servers";
import { DataIndex } from "../../components/data-index";
import { ServersBash } from "./servers-bash";
import { BashIcon } from "../../icons/bash-icon";
import { requests } from "../../models/requests";
import { useEffect } from "react";
import { Gauge } from "../../components/gauge";
// import {
//   createCpuSample,
//   getMovingAverageCpuUsage,
// } from "../../models/cpu-samples";
import { createPing, lastPingWasSuccessful } from "../../models/pings";
import {
  nullAxis,
  numberAxis,
  textAxis,
  widgetAxis,
  type ChartAxis,
} from "../../components/chart-axis";
import { ServersRequestTimingVisualization } from "./servers-request-timing-visualization";
import {
  createPerformanceSample,
  getEventLoopErrorMsMovingAverage,
  getImmediateElapsedMsMovingAverage,
  getPingMsMovingAverage,
} from "../../models/performance-samples";

function PerformanceGauge({ value }: { value: number }) {
  return (
    <Gauge
      className="vertical-gauge"
      label={`${value.toFixed(1)} ms`}
      indicatorPosition={1 - 1 / (value / 10 + 1)}
    />
  );
}

function ImmediateElapsedGauge({ value }: { value: number }) {
  return (
    <Gauge
      className="vertical-gauge"
      label={`${(value * 1000).toFixed(0)} µs`}
      indicatorPosition={1 - 1 / (value / 0.05 + 1)}
    />
  );
}

function PingGauge({ value }: { value: number }) {
  return (
    <div>
      <Gauge
        className="vertical-gauge"
        label={`${value.toFixed(0)} ms`}
        indicatorPosition={1 - 1 / (value / 100 + 1)}
      />
    </div>
  );
}

export function ServersIndex() {
  const measurePerformance = async (server: Server) => {
    return createPerformanceSample({ serverId: server.id });
  };

  const testServerConnection = async (server: Server) => {
    return createPing({ serverId: server.id });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      servers.forEach((server) => {
        measurePerformance(server);
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
            ? getPingMsMovingAverage(data[index].id)
            : 0
        }
      />
    )),
    widgetAxis<Server>("Event Loop Delay (ms)", (data, index) => (
      <PerformanceGauge
        value={
          lastPingWasSuccessful(data[index].id)
            ? getEventLoopErrorMsMovingAverage(data[index].id)
            : 0
        }
      />
    )),
    widgetAxis<Server>("Immediate Elapsed (µs)", (data, index) => (
      <ImmediateElapsedGauge
        value={
          lastPingWasSuccessful(data[index].id)
            ? getImmediateElapsedMsMovingAverage(data[index].id)
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
        <button onClick={() => measurePerformance(data[index])}>
          Measure Performance
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
