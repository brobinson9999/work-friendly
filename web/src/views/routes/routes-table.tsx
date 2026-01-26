import { Link } from "react-router-dom";
import { type Route } from "../../models/routes";
import { ColumnTable } from "../../components/column-table";

interface TableProps {
  routes: Route[];
}

export function RoutesTable({ routes }: TableProps) {
  return (
    <ColumnTable
      columns={[
        {
          header: "Label",
          getValue: (route) => (
            <Link
              to={route.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {route.label}
            </Link>
          ),
        },
        {
          header: "Href",
          getValue: (route) => (
            <Link
              to={route.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {route.href}
            </Link>
          ),
        },
      ]}
      rows={routes}
    />
  );
}
