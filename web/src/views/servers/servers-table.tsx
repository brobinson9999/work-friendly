import { ColumnTable } from "../../components/column-table";
import { useRedraw } from "../../hooks/use-redraw";
import type { Server } from "../../models/servers";

interface Props {
  servers: Server[];
}

export function ServersTable({ servers }: Props) {
  const redraw = useRedraw();

  const testServerConnection = async (server: Server) => {
    server.status = "pending";
    server.ping = undefined;
    redraw();
    try {
      const startTime = performance.now();
      const response = await fetch(
        `http://${server.hostname}:${server.port}/health`,
      );
      const endTime = performance.now();
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
        { header: "Status", getValue: (server) => server.status },
        { header: "Ping", getValue: (server) => server.ping ?? "N/A" },
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
