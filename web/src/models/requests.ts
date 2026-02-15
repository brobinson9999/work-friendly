export type Request = {
  serverId: string;
  method: string;
  url: string;
  requestTimestamp: Date;
  responseTimestamp?: Date;
};

export const requests: Request[] = [];

export function createRequest(
  serverId: string,
  method: string,
  url: string,
): Request {
  const newRequest: Request = {
    serverId,
    method,
    url,
    requestTimestamp: new Date(),
  };

  requests.push(newRequest);
  return newRequest;
}

export function completeRequest(request: Request): void {
  request.responseTimestamp = new Date();
}
