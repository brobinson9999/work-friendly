import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { LoginsTable } from "./logins-table";
import { LoginsNew } from "./logins-new";
import { createLogin, logins } from "../../models/logins";
import { useRedraw } from "../../hooks/use-redraw";

export function LoginsIndex() {
  const redraw = useRedraw();

  const submitCommand = async (password: string) => {
    await createLogin({ password });
    redraw();
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
