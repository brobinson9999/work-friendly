import { SessionsNew } from "./sessions-new";
import { createSession, sessions, type Session } from "../../models/sessions";
import { DataIndex } from "../../components/data-index";
import {
  dateAxis,
  nullAxis,
  textAxis,
  type ChartAxis,
} from "../../components/chart-axis";

export function SessionsIndex() {
  const submitCommand = async (loginId: string) => {
    await createSession({ loginId });
  };

  const axes: ChartAxis<Session>[] = [
    nullAxis<Session>("None"),
    textAxis<Session>("id", "ID", (session) => session.id),
    dateAxis<Session>(
      "createdAt",
      "Created At",
      (session) => session.createdAt,
    ),
  ];

  return (
    <DataIndex
      title="Sessions"
      newElement={<SessionsNew submitCommand={submitCommand} />}
      data={sessions}
      axes={axes}
    />
  );
}
