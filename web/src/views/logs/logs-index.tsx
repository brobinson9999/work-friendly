import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { BashIcon } from "../../icons/bash-icon";
import { LogsTable } from "./logs-table";
import { LogsPre } from "./logs-pre";
import { logs } from "../../models/logs";

export function LogsIndex() {
  return (
    <Index
      title="Logs"
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
