import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { BashIcon } from "../../icons/bash-icon";
import { LogsTable } from "./logs-table";
import { LogsPre } from "./logs-pre";
import { log, logs } from "../../models/logs";
import { LogsNew } from "./logs-new";

export function LogsIndex() {
  return (
    <Index
      title="Logs"
      newElement={<LogsNew submitCommand={(message) => log(message)} />}
      views={[
        {
          id: "Table",
          name: "Table",
          icon: <TableIcon />,
          component: <LogsTable logs={logs} />,
        },
        {
          id: "bash",
          name: "bash",
          icon: <BashIcon />,
          component: <LogsPre logs={logs} />,
        },
      ]}
    />
  );
}
