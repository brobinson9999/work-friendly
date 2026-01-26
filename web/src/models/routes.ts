import { reactRoutes } from "../routes";

export type Route = {
  label: string;
  href: string;
};

export function getRoutes() {
  const routes: Route[] = reactRoutes;
  return routes;
}
