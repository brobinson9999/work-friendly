import { ColumnTable } from "../../components/column-table";
import type { Session } from "../../models/sessions";

interface Props {
  sessions: Session[];
}

export function SessionsTable({ sessions }: Props) {
  return (
    <ColumnTable
      columns={[
        { header: "ID", renderColumn: (session) => session.id },
        {
          header: "Created At",
          renderColumn: (session) => session.createdAt.toISOString(),
        },
      ]}
      rows={sessions}
    />
  );
}
