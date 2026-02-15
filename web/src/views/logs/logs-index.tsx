import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { BashIcon } from "../../icons/bash-icon";
import { LogsTable } from "./logs-table";
import { LogsPre } from "./logs-pre";
import { log, logs } from "../../models/logs";
import { LogsNew } from "./logs-new";
import { redrawAll, useRedrawAll } from "../../hooks/use-redraw-all";

export function LogsIndex() {
  useRedrawAll();

  const submitCommand = async (message: string) => {
    log(message);
    redrawAll();
  };

  return (
    <Index
      title="Logs"
      newElement={<LogsNew submitCommand={submitCommand} />}
      views={[
        {
          id: "Table",
          name: "Table",
          icon: <TableIcon />,
          component: <LogsTable logs={logs} />,
        },
        {
          id: "console",
          name: "Console Output",
          icon: <BashIcon />,
          component: <LogsPre logs={logs} />,
        },
      ]}
    />
  );
}
