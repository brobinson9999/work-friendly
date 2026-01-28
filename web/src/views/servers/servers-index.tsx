import { ServersTable } from "./servers-table";
import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { servers } from "../../models/servers";

export function ServersIndex() {
  return (
    <Index
      title="Servers"
      views={[
        {
          id: "Table",
          name: "Table",
          icon: <TableIcon />,
          component: <ServersTable servers={servers} />,
        },
      ]}
    />
  );
}
