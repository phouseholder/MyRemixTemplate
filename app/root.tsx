import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "./theme";
import Customers from "./routes/customers/route";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
          <ScrollRestoration />
          <Scripts />
          <ColorSchemeScript />
        </MantineProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
