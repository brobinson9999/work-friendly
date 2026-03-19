import { servers, type Server } from "../../models/servers";
import { DataIndex } from "../../components/data-index";
import { useEffect } from "react";
import { Gauge } from "../../components/gauge";
// import {
//   createCpuSample,
//   getMovingAverageCpuUsage,
// } from "../../models/cpu-samples";
import {
  nullAxis,
  numberAxis,
  textAxis,
  widgetAxis,
  type ChartAxis,
} from "../../components/chart-axis";
import {
  createWebsocketStatus,
  getEventLoopErrorMsMovingAverage,
  getImmediateElapsedMsMovingAverage,
  getPingMsMovingAverage,
  lastWebsocketStatus,
  lastWebsocketStatusWasOk,
} from "../../models/websocket-statuses";

function verticalGauge(label: string, value: number, indicatorScale: number) {
  return (
    <Gauge
      className="vertical-gauge"
      label={label}
      indicatorPosition={1 - 1 / (value / indicatorScale + 1)}
    />
  );
}

const performanceGauge = (value: number) =>
  verticalGauge(`${value.toFixed(1)} ms`, value, 10);
const immediateElapsedGauge = (value: number) =>
  verticalGauge(`${(value * 1000).toFixed(0)} µs`, value, 0.05);
const pingGauge = (value: number) =>
  verticalGauge(`${value.toFixed(0)} ms`, value, 100);
const clientsGauge = (value: number) => verticalGauge(`${value}`, value, 100);
const pendingRequestsGauge = (value: number) =>
  verticalGauge(`${value}`, value, 100);

export function WebsocketStatusesIndex() {
  const checkStatus = async (server: Server) => {
    return createWebsocketStatus({ serverId: server.id });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      servers.forEach((server) => {
        checkStatus(server);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const axes: ChartAxis<Server>[] = [
    nullAxis<Server>("None"),
    textAxis<Server>("id", "ID", (server) => server.id),
    textAxis<Server>("hostname", "Hostname", (server) => server.hostname),
    numberAxis<Server>("port", "Port", (server) => server.port),
    textAxis<Server>("status", "HTTP Status", (server) =>
      lastWebsocketStatus(server.id).httpStatus === 0
        ? "no connection"
        : lastWebsocketStatus(server.id).httpStatus.toString(),
    ),
    widgetAxis<Server>("Websocket Latency", (data, index) =>
      pingGauge(
        lastWebsocketStatusWasOk(data[index].id)
          ? getPingMsMovingAverage(data[index].id)
          : 0,
      ),
    ),
    widgetAxis<Server>("Event Loop Delay (ms)", (data, index) =>
      performanceGauge(
        lastWebsocketStatusWasOk(data[index].id)
          ? getEventLoopErrorMsMovingAverage(data[index].id)
          : 0,
      ),
    ),
    widgetAxis<Server>("Immediate Elapsed (µs)", (data, index) =>
      immediateElapsedGauge(
        lastWebsocketStatusWasOk(data[index].id)
          ? getImmediateElapsedMsMovingAverage(data[index].id)
          : 0,
      ),
    ),
    widgetAxis<Server>("Connections", (data, index) =>
      clientsGauge(
        lastWebsocketStatusWasOk(data[index].id)
          ? lastWebsocketStatus(data[index].id).clientsCount
          : 0,
      ),
    ),
    widgetAxis<Server>("Pending Requests", (data, index) =>
      pendingRequestsGauge(
        lastWebsocketStatusWasOk(data[index].id)
          ? lastWebsocketStatus(data[index].id).pendingRequests
          : 0,
      ),
    ),
    widgetAxis<Server>("Actions", (data, index) => (
      <div className="server-actions">
        <button onClick={() => checkStatus(data[index])}>Check Status</button>
      </div>
    )),
  ];

  return <DataIndex title="Servers" data={servers} axes={axes} />;
}
