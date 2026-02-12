import { CodeListing } from "../../components/code-listing";
import { formatLog, type Log } from "../../models/logs";

interface Props {
  logs: Log[];
}

export function LogsPre({ logs }: Props) {
  return <CodeListing content={logs.map(formatLog).join("\n")} />;
}
