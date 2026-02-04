import { ServersTable } from "./servers-table";
import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { servers } from "../../models/servers";
import { BashIcon } from "../../icons/bash-icon";
import { ServersBash } from "./servers-bash";

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
        {
          id: "bash",
          name: "bash",
          icon: <BashIcon />,
          component: <ServersBash servers={servers} />,
        },
      ]}
    />
  );
}
