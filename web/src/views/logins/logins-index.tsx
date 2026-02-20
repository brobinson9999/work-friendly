import { LoginsNew } from "./logins-new";
import { createLogin, logins, type Login } from "../../models/logins";
import { DataIndex } from "../../components/data-index";
import {
  dateAxis,
  nullAxis,
  textAxis,
  type ChartAxis,
} from "../../components/bar-chart";

export function LoginsIndex() {
  const submitCommand = async (serverId: string, password: string) => {
    await createLogin({ serverId, password });
  };

  const axes: ChartAxis<Login>[] = [
    nullAxis<Login>("None"),
    textAxis<Login>("id", "ID", (login) => login.id),
    dateAxis<Login>("createdAt", "Created At", (login) => login.createdAt),
    textAxis<Login>("result", "Result", (login) => login.result),
  ];

  return (
    <DataIndex
      title="Logins"
      newElement={<LoginsNew submitCommand={submitCommand} />}
      data={logins}
      axes={axes}
    />
  );
}
