import type { JsonObject } from '../utils/json-value.js';
import { TimeoutMovingAverage } from '../utils/timeout-moving-average.js';
import { getStatus } from './status-service.js';

let clientsCount: number = 0;
let pendingRequests: number = 0;
const requestsPerMillisecond = new TimeoutMovingAverage(1000);

export function clientConnected() {
  clientsCount++;
}

export function clientDisconnected() {
  clientsCount--;
}

export async function handleWebsocketHttpRequest() {
  let responseData: JsonObject = {};
  let status: number = 0;

  pendingRequests++;
  requestsPerMillisecond.add(1);
  responseData = await getResponseData();
  pendingRequests--;
  status = 200;

  return {
    status,
    data: responseData,
  };
}

async function getResponseData(): Promise<JsonObject> {
  const requestsPerSecond = requestsPerMillisecond.get() * 1000;
  return {
    ...getStatus(),
    clientsCount,
    pendingRequests,
    requestsPerSecond,
  };
}
