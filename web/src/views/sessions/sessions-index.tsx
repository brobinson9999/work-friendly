import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { SessionsTable } from "./sessions-table";
import { SessionsNew } from "./sessions-new";
import { createSession, sessions } from "../../models/sessions";
import { useRedraw } from "../../hooks/use-redraw";

export function SessionsIndex() {
  const redraw = useRedraw();

  const submitCommand = async (loginId: string) => {
    await createSession({ loginId });
    redraw();
  };

  return (
    <Index
      title="Sessions"
      newElement={<SessionsNew submitCommand={submitCommand} />}
      views={[
        {
          id: "Table",
          name: "Table",
          icon: <TableIcon />,
          component: <SessionsTable sessions={sessions} />,
        },
      ]}
    />
  );
}
