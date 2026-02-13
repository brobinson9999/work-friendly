import { ColumnTable } from "../../components/column-table";
import type { Login } from "../../models/logins";

interface Props {
  logins: Login[];
}

export function LoginsTable({ logins }: Props) {
  return (
    <ColumnTable
      columns={[
        { header: "ID", renderColumn: (login) => login.id },
        {
          header: "Created At",
          renderColumn: (login) => login.createdAt.toISOString(),
        },
      ]}
      rows={logins}
    />
  );
}
