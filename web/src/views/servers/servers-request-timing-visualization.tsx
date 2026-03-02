import type { Request } from "../../models/requests";
import { RealTimeColumnChart } from "../../components/real-time-column-chart";
import { numberAxis, textAxis } from "../../components/chart-axis";

const TIME_WINDOW_MS = 10000; // 10 seconds

export function ServersRequestTimingVisualization({
  requests,
}: {
  requests: Request[];
}) {
  const maxTime = new Date().getTime();
  const minTime = maxTime - TIME_WINDOW_MS;

  const keyAxis = textAxis<Request>(
    "Request ID",
    "Request ID",
    (request) => request.id,
  );

  const positiveAxis = numberAxis<Request>(
    "Request Timestamp",
    "Request Timestamp",
    (request) => request.requestTimestamp.getTime(),
    { min: minTime, max: maxTime },
  );

  const negativeAxis = numberAxis<Request>(
    "Response Timestamp",
    "Response Timestamp",
    (request) => request.responseTimestamp?.getTime() ?? -1,
    { min: minTime, max: maxTime },
  );

  return (
    <RealTimeColumnChart
      data={requests}
      keyAxis={keyAxis}
      positiveAxis={positiveAxis}
      negativeAxis={negativeAxis}
    />
  );
}
