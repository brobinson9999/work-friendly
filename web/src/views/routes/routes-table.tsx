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
          renderColumn: (route) => (
            <Link to={route.href} className="link-unstyled">
              {route.label}
            </Link>
          ),
        },
        {
          header: "Href",
          renderColumn: (route) => (
            <Link to={route.href} className="link-unstyled">
              {route.href}
            </Link>
          ),
        },
      ]}
      rows={routes}
    />
  );
}
