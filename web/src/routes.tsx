import type { JSX } from "react";
import type { Route } from "./models/routes";
import { ShellCommandExecutionsIndex } from "./views/shell-command-executions/shell-command-executions-index";
import { RoutesIndex } from "./views/routes/routes-index";
import { ColorsIndex } from "./views/colors/colors-index";
import { PalettesIndex } from "./views/palettes/palettes-index";
import { ThemesIndex } from "./views/themes/themes-index";
import { ComponentsIndex } from "./views/components/components-index";
import { ServersIndex } from "./views/servers/servers-index";
import { LogsIndex } from "./views/logs/logs-index";
import { SessionsIndex } from "./views/sessions/sessions-index";
import { LoginsIndex } from "./views/logins/logins-index";

export type ReactRoute = Route & {
  element: JSX.Element;
};

export const reactRoutes: ReactRoute[] = [
  {
    label: "Colors",
    href: "/colors",
    element: <ColorsIndex />,
  },
  {
    label: "Components",
    href: "/components",
    element: <ComponentsIndex />,
  },
  {
    label: "Logins",
    href: "/logins",
    element: <LoginsIndex />,
  },
  {
    label: "Logs",
    href: "/logs",
    element: <LogsIndex />,
  },
  {
    label: "Palettes",
    href: "/palettes",
    element: <PalettesIndex />,
  },
  {
    label: "Routes",
    href: "/routes",
    element: <RoutesIndex />,
  },
  {
    label: "Servers",
    href: "/servers",
    element: <ServersIndex />,
  },
  {
    label: "Sessions",
    href: "/sessions",
    element: <SessionsIndex />,
  },
  {
    label: "Shell Commands",
    href: "/shell",
    element: <ShellCommandExecutionsIndex />,
  },
  {
    label: "Themes",
    href: "/themes",
    element: <ThemesIndex />,
  },
];
