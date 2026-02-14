import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { LoginsTable } from "./logins-table";
import { LoginsNew } from "./logins-new";
import { createLogin, logins } from "../../models/logins";
import { redrawAll, useRedrawAll } from "../../hooks/use-redraw-all";

export function LoginsIndex() {
  useRedrawAll();

  const submitCommand = async (password: string) => {
    await createLogin({ password });
    redrawAll();
  };

  return (
    <Index
      title="Logins"
      newElement={<LoginsNew submitCommand={submitCommand} />}
      views={[
        {
          id: "Table",
          name: "Table",
          icon: <TableIcon />,
          component: <LoginsTable logins={logins} />,
        },
      ]}
    />
  );
}
