import { BashIcon } from "../../icons/bash-icon";
import { LogsPre } from "./logs-pre";
import { log, logs, type Log } from "../../models/logs";
import { LogsNew } from "./logs-new";
import { redrawAll } from "../../hooks/use-redraw-all";
import { DataIndex } from "../../components/data-index";
import {
  dateAxis,
  nullAxis,
  textAxis,
  type ChartAxis,
} from "../../components/bar-chart";

export function LogsIndex() {
  const submitCommand = async (message: string) => {
    log(message);
    redrawAll();
  };

  const axes: ChartAxis<Log>[] = [
    nullAxis<Log>("None"),
    dateAxis<Log>("timestamp", "Timestamp", (log) => log.timestamp),
    textAxis<Log>(
      "message",
      "Message",
      (log) => log.payload.message?.toString() ?? "",
    ),
    textAxis<Log>("rest", "Rest", (log) => {
      const { message, ...rest } = log.payload;
      return JSON.stringify(rest);
    }),
  ];

  return (
    <DataIndex
      title="Logs"
      newElement={<LogsNew submitCommand={submitCommand} />}
      data={logs}
      axes={axes}
      views={[
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
