import { Index } from "../../components";
import { TableIcon } from "../../icons/table-icon";
import { SessionsTable } from "./sessions-table";
import { SessionsNew } from "./sessions-new";
import { createSession, sessions } from "../../models/sessions";
import { redrawAll, useRedrawAll } from "../../hooks/use-redraw-all";

export function SessionsIndex() {
  useRedrawAll();

  const submitCommand = async (loginId: string) => {
    await createSession({ loginId });
    redrawAll();
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
