import { CodeListing } from "../../components/code-listing";
import type { Server } from "../../models/servers";

interface Props {
  servers: Server[];
}

export function ServersBash({ servers }: Props) {
  return (
    <CodeListing
      content={servers
        .map((server) => `curl -v ${server.hostname}:${server.port}/health`)
        .join("\n")}
    />
  );
}
