import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useActionData, useLoaderData, Form, useLocation, useFetcher } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createTheme, MantineProvider, ColorSchemeScript, Flex, Stack, Group, Image, Paper, Alert, TextInput, PasswordInput, Button, Text, NavLink, useMantineColorScheme, useComputedColorScheme, AppShell, Burger, ScrollArea, Divider, Modal, Grid, Select, NumberInput, Table, ActionIcon, rem, Box, UnstyledButton, Center, keys, SimpleGrid } from "@mantine/core";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { scrypt } from "crypto";
import { promisify } from "util";
import { IconInfoCircle, IconSun, IconMoon, IconDashboard, IconUsers, IconClipboardList, IconLogout, IconTrash, IconPencil, IconSearch, IconChevronUp, IconChevronDown, IconSelector, IconArrowUpRight, IconArrowDownRight, IconUserPlus, IconDiscount2, IconReceipt2, IconCoin } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { AreaChart, BarChart } from "@mantine/charts";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  primaryColor: "mainColor",
  colors: {
    mainColor: [
      "#ff0000",
      "#eef3ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc1",
      "#5f7cb8",
      "#5474b4",
      "#44639f",
      "#39588f",
      "#2d4b81"
    ]
  },
  other: {
    "--mantine-breakpoint-xs": "36em",
    "--mantine-breakpoint-sm": "48em",
    "--mantine-breakpoint-md": "62em",
    "--mantine-breakpoint-lg": "75em",
    "--mantine-breakpoint-xl": "88em",
    "--mantine-spacing-xs": "0.625rem",
    "--mantine-spacing-sm": "0.75rem",
    "--mantine-spacing-md": "1rem",
    "--mantine-spacing-lg": "1.25rem",
    "--mantine-spacing-xl": "2rem",
    "--mantine-font-size-xs": "0.75rem",
    "--mantine-font-size-sm": "0.875rem",
    "--mantine-font-size-md": "1rem",
    "--mantine-font-size-lg": "1.125rem",
    "--mantine-font-size-xl": "1.25rem",
    "--mantine-line-height-xs": 1.4,
    "--mantine-line-height-sm": 1.45,
    "--mantine-line-height-md": 1.55,
    "--mantine-line-height-lg": 1.6,
    "--mantine-line-height-xl": 1.65,
    "--mantine-shadow-xs": "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)",
    "--mantine-shadow-sm": "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem",
    "--mantine-shadow-md": "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem",
    "--mantine-shadow-lg": "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 0.75rem 0.75rem -0.4375rem",
    "--mantine-shadow-xl": "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem",
    "--mantine-radius-xs": "0.125rem",
    "--mantine-radius-sm": "0.25rem",
    "--mantine-radius-md": "0.5rem",
    "--mantine-radius-lg": "1rem",
    "--mantine-radius-xl": "2rem",
    "--mantine-color-default-color": "var(--mantine-color-black)"
  }
});
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsxs(MantineProvider, { theme, defaultColorScheme: "dark", children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(ColorSchemeScript, {})
    ] }) })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    // use any name you want here
    sameSite: "lax",
    // this helps with CSRF
    path: "/",
    // remember to add this so the cookie will work in all routes
    httpOnly: true,
    // for security reasons, make this cookie http only
    secrets: process.env.SESSIONS_SECRETS !== void 0 ? [process.env.SESSIONS_SECRETS] : [""],
    // replace this with an actual secret
    secure: process.env.NODE_ENV === "production"
    // enable this in prod only
  }
});
const { getSession, commitSession, destroySession } = sessionStorage;
const scryptAsync = promisify(scrypt);
async function checkPassword(plainPassword, hashedPassword) {
  const [salt, key] = hashedPassword.split(":");
  const hashedBuffer = await scryptAsync(plainPassword, salt, 64);
  return key === hashedBuffer.toString("hex");
}
async function deleteRow(table, where) {
  const queryString = constructQuery(where);
  const tableString = tableUrl(table);
  const fullUrl = `${tableString}?${queryString}`;
  console.log(fullUrl);
  const response = await fetch(fullUrl, {
    method: "DELETE",
    headers: {
      Prefer: "return=representation",
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive"
    }
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  if (response.status !== 204) {
    const data2 = await response.json();
    return data2;
  }
  return null;
}
async function get(url) {
  const response = await fetch(url, {
    headers: {
      Connection: "keep-alive"
    }
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const data2 = await response.json();
  return data2;
}
async function findAll(table, options) {
  return get(tableUrl(table, options));
}
async function findOne(table, search, options) {
  const queryString = constructQuery(search);
  const queryStringWithOptions = options ? `${queryString}&${options}` : queryString;
  const results = await get(
    `${tableUrl(table, queryStringWithOptions)}`
  );
  if (results.length === 0) {
    return null;
  }
  return results[0];
}
async function patch(url, payload) {
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      Prefer: "return=representation",
      // Request the updated row to be returned in the response
      "Content-Type": "application/json; charset=utf-8",
      // Set the content type to JSON
      Connection: "keep-alive"
      // Keep the connection alive
    }
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const data2 = await response.json();
  return data2;
}
async function update(table, where, data2) {
  const queryString = constructQuery(where);
  const tableString = tableUrl(table);
  const fullUrl = `${tableString}?${queryString}`;
  const result = await patch(`${fullUrl}`, data2);
  return result;
}
async function post(url, payload) {
  const headers = {
    Prefer: "return=representation",
    // Request the inserted row to be returned in the response
    "Content-Type": "application/json; charset=utf-8",
    // Set the content type to JSON
    Connection: "keep-alive"
    // Keep the connection alive
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const data2 = await response.json();
  return data2;
}
async function create(table, data2) {
  console.log("CREATE", table, data2, tableUrl(table));
  const result = await post(tableUrl(table), data2);
  return result;
}
const POSTGREST_URL = "http://localhost:8080";
function tableUrl(table, options) {
  return `${POSTGREST_URL}/${table}${options ? `?${options}` : ""}`;
}
function constructQuery(search) {
  return Object.entries(search).map(([key, value2]) => `${key}=eq.${encodeURIComponent(value2)}`).join("&");
}
const database = {
  findOne,
  findAll,
  create,
  update,
  delete: deleteRow
};
let authenticator = new Authenticator(sessionStorage, {
  sessionErrorKey: "auth-error",
  sessionKey: "auth"
});
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get("username");
    const password = form.get("password");
    if (!username) {
      throw new Error("Username is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (typeof password !== "string") {
      throw new Error("Invalid password");
    }
    const user = await database.findOne("user", { username });
    if (!user) {
      throw new Error("Invalid username");
    }
    if (!user.password) {
      throw new Error("Invalid password");
    }
    const isPasswordValid = checkPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  }),
  "user-pass"
);
async function loader$4({ request }) {
  await authenticator.logout(request, {
    redirectTo: "/auth/login"
  });
  return null;
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const logo = "/assets/logo-DDmNspqG.png";
async function loader$3({ request }) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/"
  });
  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json(
    { error },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}
async function action$2({
  request
}) {
  const result = await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  });
  return result;
}
function Auth() {
  const actionData = useActionData();
  const { error } = useLoaderData();
  const errorIcon = /* @__PURE__ */ jsx(IconInfoCircle, {});
  return /* @__PURE__ */ jsx(Flex, { justify: "center", h: "100vh", children: /* @__PURE__ */ jsxs(Stack, { justify: "center", children: [
    /* @__PURE__ */ jsx(Group, { justify: "center", children: /* @__PURE__ */ jsx(Image, { src: logo, w: 200 }) }),
    /* @__PURE__ */ jsxs(Paper, { withBorder: true, p: "md", radius: "md", w: 500, children: [
      error && /* @__PURE__ */ jsx(
        Alert,
        {
          mb: "md",
          variant: "light",
          color: "red",
          title: "ERROR",
          icon: errorIcon,
          children: error.message
        }
      ),
      /* @__PURE__ */ jsxs(Form, { method: "POST", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            name: "username",
            label: "Username",
            placeholder: "Username",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          PasswordInput,
          {
            mt: "md",
            name: "password",
            label: "Password",
            placeholder: "Password",
            type: "password",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(Group, { justify: "right", children: /* @__PURE__ */ jsx(Button, { mt: "md", type: "submit", children: "Submit" }) }),
        actionData && /* @__PURE__ */ jsx(Alert, { color: "red", children: "Unable to sign in" })
      ] })
    ] })
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: Auth,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const title$1 = "_title_17c84_1";
const PanelContent = "_PanelContent_17c84_13";
const classes$4 = {
  title: title$1,
  PanelContent
};
function Panel({ children, title: title2 }) {
  return /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(Text, { size: "md", className: classes$4.title, children: title2 }),
    /* @__PURE__ */ jsx(Paper, { withBorder: true, p: "sm", radius: "sm", className: classes$4.PanelContent, children })
  ] });
}
const navLink = "_navLink_8zzxt_1";
const classes$3 = {
  navLink
};
function Navbar({ links }) {
  const location = useLocation();
  return /* @__PURE__ */ jsx(Fragment, { children: links.map((item) => /* @__PURE__ */ jsx(
    NavLink,
    {
      href: item.to,
      label: item.label,
      leftSection: item.icon,
      "data-active": item.to === location.pathname || void 0,
      variant: "filled",
      className: classes$3.navLink,
      color: "var(--mantine-color-body)"
    },
    item.label
  )) });
}
const main$1 = "_main_1elz4_1";
const navbar = "_navbar_1elz4_7";
const classes$2 = {
  main: main$1,
  navbar
};
function MyAppShell({ children }) {
  const [opened, { toggle }] = useDisclosure();
  const isTablet = useMediaQuery("(max-width: 48em)");
  const links = [
    {
      to: "/Dashboard",
      label: "Dashboard",
      icon: /* @__PURE__ */ jsx(IconDashboard, { size: "1rem", stroke: 1.5 })
    },
    {
      to: "/Customers",
      label: "Customers",
      icon: /* @__PURE__ */ jsx(IconUsers, { size: "1rem", stroke: 1.5 })
    },
    {
      to: "/Orders",
      label: "Orders",
      icon: /* @__PURE__ */ jsx(IconClipboardList, { size: "1rem", stroke: 1.5 })
    }
  ];
  const footerLinks = [
    {
      to: "/auth/logout",
      label: "Log Out",
      icon: /* @__PURE__ */ jsx(IconLogout, { size: "1rem", stroke: 1.5 })
    }
  ];
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true
  });
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsxs(
    AppShell,
    {
      header: { height: 50 },
      navbar: {
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      },
      children: [
        /* @__PURE__ */ jsx(AppShell.Header, { children: /* @__PURE__ */ jsxs(Flex, { justify: "space-between", h: "100%", pl: "md", pr: "md", children: [
          /* @__PURE__ */ jsx(Stack, { justify: "center", children: /* @__PURE__ */ jsx(Image, { src: logo, w: 75 }) }),
          /* @__PURE__ */ jsxs(Stack, { justify: "center", children: [
            /* @__PURE__ */ jsx(
              Burger,
              {
                opened,
                onClick: toggle,
                hiddenFrom: "sm",
                size: "sm"
              }
            ),
            !isTablet && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                color: "red",
                onClick: toggleColorScheme,
                children: computedColorScheme === "dark" ? /* @__PURE__ */ jsx(IconSun, {}) : /* @__PURE__ */ jsx(IconMoon, {})
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(AppShell.Navbar, { className: classes$2.navbar, children: [
          /* @__PURE__ */ jsx(AppShell.Section, { grow: true, component: ScrollArea, children: /* @__PURE__ */ jsx(Navbar, { links }) }),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsx(AppShell.Section, { children: /* @__PURE__ */ jsx(Navbar, { links: footerLinks }) })
        ] }),
        /* @__PURE__ */ jsx(AppShell.Main, { className: classes$2.main, children })
      ]
    }
  );
}
const th = "_th_ebyzo_1";
const main = "_main_ebyzo_9";
const control = "_control_ebyzo_17";
const icon$1 = "_icon_ebyzo_35";
const classes$1 = {
  th,
  main,
  control,
  icon: icon$1
};
function MyModal({
  children,
  centered,
  close,
  fullscreen,
  opened,
  size,
  title: title2
}) {
  const isTablet = useMediaQuery("(max-width: 48em)");
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Modal,
    {
      opened,
      onClose: close,
      title: title2,
      fullScreen: isTablet || fullscreen,
      "data-centered": centered,
      transitionProps: {
        transition: "fade",
        duration: 600,
        timingFunction: "linear"
      },
      size,
      children
    }
  ) });
}
async function getListData(modelFields, table) {
  var _a, _b;
  const data2 = await database.findAll(table);
  const valueField = ((_a = modelFields.find((field) => field.name === "id")) == null ? void 0 : _a.name) || "id";
  const labelField = ((_b = modelFields.find((field) => field.list_title)) == null ? void 0 : _b.name) || "title";
  const listData = data2.map((item) => ({
    label: item[labelField] || "",
    value: item[valueField]
  }));
  return listData;
}
function renderFields(fields, defaults) {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  if (fields === void 0) {
    return;
  }
  return fields.filter((field) => field.name !== "id").map(
    ({
      type,
      label,
      name,
      placeholder,
      required,
      list_fields,
      list_type
    }) => {
      switch (type) {
        case "string":
          return /* @__PURE__ */ jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx(
            TextInput,
            {
              name,
              label,
              placeholder,
              required,
              defaultValue: defaults ? defaults[name] : void 0
            }
          ) }, name);
        case "number":
          return /* @__PURE__ */ jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx(
            NumberInput,
            {
              name,
              label,
              placeholder,
              required,
              defaultValue: defaults ? defaults[name] : void 0
            }
          ) }, name);
        case "date":
          return /* @__PURE__ */ jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx(
            DateInput,
            {
              name,
              label,
              placeholder,
              defaultValue: defaults ? new Date(
                new Date(defaults[name]).getTime() + new Date(defaults[name]).getTimezoneOffset() * 6e4
              ) : void 0
            }
          ) }, name);
        case "list":
          useEffect(() => {
            setIsLoading(true);
            getListData(list_fields, list_type).then((data2) => setListData(data2)).finally(() => setIsLoading(false));
          }, [list_type]);
          return /* @__PURE__ */ jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx(
            Select,
            {
              name,
              label,
              data: listData,
              defaultValue: defaults ? defaults[name] : void 0
            }
          ) }, name);
      }
    }
  );
}
function MyForm({
  action: action2,
  cancelText = "Cancel",
  color,
  children,
  defaultValues,
  submitText = "Submit",
  fields,
  method,
  onSubmit,
  onCancel
}) {
  const fetcher = useFetcher({ key: "form" });
  return /* @__PURE__ */ jsxs(fetcher.Form, { method, action: action2, children: [
    /* @__PURE__ */ jsxs(Grid, { grow: true, children: [
      renderFields(fields, defaultValues),
      children
    ] }),
    /* @__PURE__ */ jsxs(Flex, { justify: "right", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          mt: "md",
          mr: "xs",
          variant: "subtle",
          onClick: onCancel,
          color,
          children: cancelText
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          mt: "md",
          type: "submit",
          variant: "filled",
          onClick: onSubmit,
          color,
          children: submitText
        }
      )
    ] })
  ] });
}
function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? reversed ? IconChevronUp : IconChevronDown : IconSelector;
  return /* @__PURE__ */ jsx(Table.Th, { className: classes$1.th, children: /* @__PURE__ */ jsx(UnstyledButton, { onClick: onSort, className: classes$1.control, children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
    /* @__PURE__ */ jsx(Text, { fw: 500, fz: "sm", children }),
    /* @__PURE__ */ jsx(Center, { className: classes$1.icon, children: /* @__PURE__ */ jsx(Icon, { style: { width: rem(16), height: rem(16) }, stroke: 1.5 }) })
  ] }) }) });
}
function filterData(data2, search) {
  const query = search.toLowerCase().trim();
  return data2.filter(
    (item) => keys(data2[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}
function sortData(data2, payload) {
  const { sortBy } = payload;
  if (!sortBy) {
    return filterData(data2, payload.search);
  }
  return filterData(
    [...data2].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }
      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}
function TableSort({
  data: data2,
  colDef,
  createTitle = "Create New Record",
  formAction,
  editTitle = "Edit Record",
  deleteTitle = "",
  bindings,
  onSelect
}) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data2);
  const [deleteID, setDeleteID] = useState();
  const [editID, setEditID] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [selectedRow, setSelectedRow] = useState(data2[0].id);
  const [defaultValues, setDefaultValues] = useState();
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [delOpened, { open: delOpen, close: delClose }] = useDisclosure(false);
  const [addOpened, { open: addOpen, close: addClose }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] = useDisclosure(false);
  useEffect(() => {
    setSortedData(
      sortData(data2, { sortBy, reversed: reverseSortDirection, search: "" })
    );
  }, [data2]);
  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data2, { sortBy: field, reversed, search }));
  };
  const handleSearchChange = (event) => {
    const { value: value2 } = event.currentTarget;
    setSearch(value2);
    setSortedData(
      sortData(data2, { sortBy, reversed: reverseSortDirection, search: value2 })
    );
  };
  const handleDelete = (id) => {
    setDeleteID(id);
    delOpen();
  };
  const handleEdit = (row) => {
    setDefaultValues(row);
    setEditID(row.id);
    editOpen();
  };
  const rows = sortedData.filter((row) => bindings ? row[bindings.col] === bindings.val : true).map((row) => /* @__PURE__ */ jsxs(
    Table.Tr,
    {
      onClick: () => {
        setSelectedRow(row.id);
        onSelect ? onSelect(row.id) : void 0;
      },
      bg: selectedRow === row.id ? "var(--mantine-color-red-light)" : void 0,
      children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Stack, { justify: "center", children: /* @__PURE__ */ jsxs(Flex, { justify: "center", children: [
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              color: "red",
              variant: "transparent",
              size: "sm",
              ml: "xs",
              onClick: () => handleDelete(row.id),
              children: /* @__PURE__ */ jsx(IconTrash, {})
            }
          ),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              color: "blue",
              variant: "transparent",
              size: "sm",
              ml: "xs",
              onClick: () => handleEdit(row),
              children: /* @__PURE__ */ jsx(IconPencil, {})
            }
          )
        ] }) }) }),
        colDef.filter((col) => col.name !== "id").map((col) => /* @__PURE__ */ jsx(Table.Td, { children: row[col.name] }, col.name))
      ]
    },
    row.id
  ));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Group, { justify: "space-between", mb: "xs", children: [
      /* @__PURE__ */ jsx(Button, { size: "xs", onClick: addOpen, color: "green", children: "Create" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          placeholder: "Search by any field",
          size: "xs",
          w: "30%",
          leftSection: /* @__PURE__ */ jsx(
            IconSearch,
            {
              style: { width: rem(16), height: rem(16) },
              stroke: 1.5
            }
          ),
          value: search,
          onChange: handleSearchChange
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(ScrollArea, { w: "100%", children: /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsxs(
        Table,
        {
          horizontalSpacing: "md",
          verticalSpacing: "xs",
          miw: 700,
          layout: "fixed",
          className: classes$1.main,
          children: [
            /* @__PURE__ */ jsx(Table.Tbody, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
              /* @__PURE__ */ jsx("th", {}),
              colDef.filter((col) => col.name !== "id").map((col) => /* @__PURE__ */ jsx(
                Th,
                {
                  sorted: sortBy === col.name,
                  reversed: reverseSortDirection,
                  onSort: () => setSorting(col.name),
                  children: col.label
                },
                col.name
              ))
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: rows.length > 0 ? rows : null })
          ]
        }
      ),
      /* @__PURE__ */ jsx(MyModal, { title: deleteTitle, opened: delOpened, close: delClose, children: /* @__PURE__ */ jsxs(
        MyForm,
        {
          method: "DELETE",
          onSubmit: delClose,
          onCancel: delClose,
          color: "red",
          submitText: "Delete",
          action: formAction,
          children: [
            /* @__PURE__ */ jsx("input", { type: "text", name: "id", value: deleteID, readOnly: true, hidden: true }),
            /* @__PURE__ */ jsx(Text, { mt: "md", p: "md", mb: "md", size: "lg", fw: 700, children: "This action cannot be undone. Are you sure you want to proceed?" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(MyModal, { title: createTitle, opened: addOpened, close: addClose, children: /* @__PURE__ */ jsx(
        MyForm,
        {
          fields: colDef,
          method: "POST",
          onSubmit: addClose,
          onCancel: addClose,
          color: "green",
          submitText: "Create",
          action: formAction
        }
      ) }),
      /* @__PURE__ */ jsx(MyModal, { title: editTitle, opened: editOpened, close: editClose, children: /* @__PURE__ */ jsx(
        MyForm,
        {
          fields: colDef,
          method: "PATCH",
          onSubmit: editClose,
          onCancel: editClose,
          color: "blue",
          defaultValues,
          action: formAction,
          children: /* @__PURE__ */ jsx("input", { type: "text", name: "id", value: editID, readOnly: true, hidden: true })
        }
      ) })
    ] }) })
  ] });
}
const customerFields = [
  {
    name: "id",
    label: "ID",
    placeholder: "Enter ID",
    required: true,
    type: "string"
  },
  {
    name: "name",
    label: "Name",
    placeholder: "Enter full name",
    required: false,
    type: "string",
    list_title: true
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    required: false,
    type: "string"
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter phone number",
    required: false,
    type: "string"
  }
];
async function handleCRUD(request, fields, table) {
  const result = {};
  const user = await authenticator.isAuthenticated(request);
  if (!user) throw new Error("Unauthorized User");
  const added_by = user == null ? void 0 : user.username;
  const body = await request.formData();
  fields.forEach((field) => {
    if (field.name === "id" && request.method === "POST") return;
    const value2 = body.get(field.name);
    result[field.name] = value2 !== null ? value2 : null;
  });
  result["added_by"] = added_by;
  switch (request.method) {
    case "POST":
      return await database.create(table, result);
    case "DELETE":
      return await database.delete(table, { id: result.id });
    case "PATCH":
      return await database.update(table, { id: result["id"] }, result);
  }
}
const orderFields = [
  {
    name: "id",
    label: "ID",
    placeholder: "Enter ID",
    required: true,
    type: "string"
  },
  {
    name: "ship_date",
    label: "Ship Date",
    placeholder: "Enter ship date",
    required: false,
    type: "date"
  },
  {
    name: "customer_id",
    alias: "customer.name",
    label: "Customer",
    placeholder: "Enter customer ID",
    required: false,
    type: "list",
    list_type: "customer",
    list_fields: customerFields
  }
];
const meta$3 = () => {
  return [
    { title: "Customers" },
    { name: "Customers", content: "Customers of your application" }
  ];
};
async function loader$2() {
  return json({
    customers: await database.findAll("customer"),
    orders: await database.findAll("order")
  });
}
async function action$1({ request }) {
  return await handleCRUD(request, customerFields, "customer");
}
function Customers() {
  const { customers, orders } = useLoaderData();
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0].id);
  function handleSelectCustomer(id) {
    setSelectedCustomer(id);
  }
  return /* @__PURE__ */ jsx(MyAppShell, { children: /* @__PURE__ */ jsxs(Grid, { p: "md", children: [
    /* @__PURE__ */ jsx(Grid.Col, { children: /* @__PURE__ */ jsx(Panel, { title: "Customers", children: /* @__PURE__ */ jsx(
      TableSort,
      {
        data: customers,
        colDef: customerFields,
        createTitle: "Create New Customer",
        editTitle: "Edit Customer",
        onSelect: handleSelectCustomer
      }
    ) }) }),
    /* @__PURE__ */ jsx(Grid.Col, { children: /* @__PURE__ */ jsx(Panel, { title: "Orders", children: /* @__PURE__ */ jsx(
      TableSort,
      {
        data: orders,
        colDef: orderFields,
        createTitle: "Create New Order",
        editTitle: "Edit Order",
        bindings: {
          col: "customer_id",
          val: selectedCustomer
        },
        formAction: "/Orders"
      }
    ) }) })
  ] }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Customers,
  loader: loader$2,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const value = "_value_g9dcf_1";
const diff = "_diff_g9dcf_13";
const icon = "_icon_g9dcf_25";
const title = "_title_g9dcf_33";
const Content = "_Content_g9dcf_43";
const classes = {
  value,
  diff,
  icon,
  title,
  Content
};
const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin
};
const data$1 = [
  { title: "Revenue", icon: "receipt", value: "13,456", diff: 34 },
  { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
  { title: "Coupons usage", icon: "discount", value: "745", diff: 18 },
  { title: "New customers", icon: "user", value: "188", diff: -30 }
];
function StatsGrid() {
  const stats = data$1.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return /* @__PURE__ */ jsxs(
      Paper,
      {
        className: classes.Content,
        withBorder: true,
        p: "md",
        radius: "md",
        children: [
          /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", className: classes.title, children: stat.title }),
            /* @__PURE__ */ jsx(Icon, { className: classes.icon, size: "1.4rem", stroke: 1.5 })
          ] }),
          /* @__PURE__ */ jsxs(Group, { align: "flex-end", gap: "xs", mt: 25, children: [
            /* @__PURE__ */ jsx(Text, { className: classes.value, children: stat.value }),
            /* @__PURE__ */ jsxs(
              Text,
              {
                c: stat.diff > 0 ? "teal" : "red",
                fz: "sm",
                fw: 500,
                className: classes.diff,
                children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    stat.diff,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsx(DiffIcon, { size: "1rem", stroke: 1.5 })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Text, { fz: "xs", c: "dimmed", mt: 7, children: "Compared to previous month" })
        ]
      },
      stat.title
    );
  });
  return /* @__PURE__ */ jsx("div", { className: classes.root, children: /* @__PURE__ */ jsx(SimpleGrid, { p: "md", cols: { base: 1, xs: 2, md: 4 }, children: stats }) });
}
const meta$2 = () => {
  return [
    { title: "Dashboard" },
    { name: "this is the main dashboard", content: "Dashboard" }
  ];
};
function Dashboard() {
  return /* @__PURE__ */ jsxs(MyAppShell, { children: [
    /* @__PURE__ */ jsx(StatsGrid, {}),
    /* @__PURE__ */ jsxs(SimpleGrid, { p: "md", cols: { base: 1, md: 2 }, children: [
      /* @__PURE__ */ jsx(Panel, { title: "Line Chart", children: /* @__PURE__ */ jsx(
        AreaChart,
        {
          h: 300,
          data,
          dataKey: "date",
          type: "stacked",
          withLegend: true,
          series,
          curveType: "natural",
          areaProps: { isAnimationActive: true }
        }
      ) }),
      /* @__PURE__ */ jsx(Panel, { title: "Bar Chart", children: /* @__PURE__ */ jsx(
        BarChart,
        {
          h: 300,
          data,
          dataKey: "date",
          withLegend: true,
          series,
          tickLine: "y",
          barProps: { isAnimationActive: true }
        }
      ) })
    ] })
  ] });
}
const data = [
  { date: "Jan", Series1: 120, Series2: 230, Series3: 310 },
  { date: "Feb", Series1: 180, Series2: 250, Series3: 400 },
  { date: "Mar", Series1: 140, Series2: 310, Series3: 390 },
  { date: "Apr", Series1: 270, Series2: 260, Series3: 420 },
  { date: "May", Series1: 330, Series2: 390, Series3: 470 },
  { date: "Jun", Series1: 290, Series2: 440, Series3: 520 },
  { date: "Jul", Series1: 370, Series2: 460, Series3: 570 },
  { date: "Aug", Series1: 410, Series2: 510, Series3: 620 },
  { date: "Sep", Series1: 500, Series2: 480, Series3: 670 },
  { date: "Oct", Series1: 530, Series2: 560, Series3: 720 },
  { date: "Nov", Series1: 480, Series2: 600, Series3: 760 },
  { date: "Dec", Series1: 620, Series2: 650, Series3: 810 }
];
const series = [
  { name: "Series1", color: "indigo" },
  { name: "Series2", color: "blue" },
  { name: "Series3", color: "teal" }
];
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data,
  default: Dashboard,
  meta: meta$2,
  series
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [
    { title: "orders" },
    { name: "orders", content: "orders of your application" }
  ];
};
async function loader$1() {
  return json(await database.findAll("order"));
}
async function action({ request }) {
  return await handleCRUD(request, orderFields, "order");
}
function Orders() {
  const orders = useLoaderData();
  return /* @__PURE__ */ jsx(MyAppShell, { children: /* @__PURE__ */ jsx(Group, { grow: true, p: "md", children: /* @__PURE__ */ jsx(Panel, { title: "Orders", children: /* @__PURE__ */ jsx(
    TableSort,
    {
      data: orders,
      colDef: orderFields,
      editTitle: "Edit Order",
      createTitle: "Create New Order"
    }
  ) }) }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Orders,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/auth/login"
  });
  return redirect("/Dashboard");
}
function Index() {
  return /* @__PURE__ */ jsx(MyAppShell, { children: /* @__PURE__ */ jsx("h1", { children: "Hello World" }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function NotFound() {
  return /* @__PURE__ */ jsx(MyAppShell, { children: /* @__PURE__ */ jsx(
    Alert,
    {
      variant: "light",
      color: "red",
      title: "ERROR 404",
      icon: /* @__PURE__ */ jsx(IconInfoCircle, {}),
      children: "We are sorry but it looks like the page you are looking for does not exist."
    }
  ) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Bynp5NC7.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/components-2haR1cev.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-UEHQ4jrq.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/components-2haR1cev.js", "/assets/MantineThemeProvider-AiyNdeD2.js", "/assets/px-CiO0pVtX.js"], "css": ["/assets/root-CeXECEkv.css"] }, "routes/auth.logout": { "id": "routes/auth.logout", "parentId": "root", "path": "auth/logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CP6p3kPr.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/logo-BJBMIdx3.js", "/assets/components-2haR1cev.js", "/assets/Group-BzWSrohI.js", "/assets/IconInfoCircle-DPWO-f9i.js", "/assets/TextInput-DiKqi-CN.js", "/assets/CloseButton-DOK_eBUn.js", "/assets/MantineThemeProvider-AiyNdeD2.js"], "css": [] }, "routes/customers": { "id": "routes/customers", "parentId": "root", "path": "customers", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BYjo3CDb.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/index-BX1xLC-e.js", "/assets/index-2mA2zYzM.js", "/assets/order-B-gZVp-R.js", "/assets/components-2haR1cev.js", "/assets/logo-BJBMIdx3.js", "/assets/MantineThemeProvider-AiyNdeD2.js", "/assets/Group-BzWSrohI.js", "/assets/px-CiO0pVtX.js", "/assets/CloseButton-DOK_eBUn.js", "/assets/TextInput-DiKqi-CN.js"], "css": ["/assets/index-D9lTTDSq.css", "/assets/index-pY-vCZ97.css", "/assets/order-NuDoyHqG.css"] }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CK0NM8_w.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/logo-BJBMIdx3.js", "/assets/Group-BzWSrohI.js", "/assets/index-BX1xLC-e.js", "/assets/MantineThemeProvider-AiyNdeD2.js", "/assets/px-CiO0pVtX.js", "/assets/index-2mA2zYzM.js"], "css": ["/assets/route-D3y8wI_6.css", "/assets/index-D9lTTDSq.css", "/assets/index-pY-vCZ97.css"] }, "routes/orders": { "id": "routes/orders", "parentId": "root", "path": "orders", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-adnzrwyy.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/index-BX1xLC-e.js", "/assets/index-2mA2zYzM.js", "/assets/order-B-gZVp-R.js", "/assets/components-2haR1cev.js", "/assets/Group-BzWSrohI.js", "/assets/logo-BJBMIdx3.js", "/assets/MantineThemeProvider-AiyNdeD2.js", "/assets/px-CiO0pVtX.js", "/assets/CloseButton-DOK_eBUn.js", "/assets/TextInput-DiKqi-CN.js"], "css": ["/assets/index-D9lTTDSq.css", "/assets/index-pY-vCZ97.css", "/assets/order-NuDoyHqG.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-bEK5Wbo_.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/index-2mA2zYzM.js", "/assets/logo-BJBMIdx3.js", "/assets/MantineThemeProvider-AiyNdeD2.js", "/assets/px-CiO0pVtX.js"], "css": ["/assets/index-pY-vCZ97.css"] }, "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_-Bp3oS6iw.js", "imports": ["/assets/index-Bm35sZ9Q.js", "/assets/index-2mA2zYzM.js", "/assets/IconInfoCircle-DPWO-f9i.js", "/assets/logo-BJBMIdx3.js", "/assets/MantineThemeProvider-AiyNdeD2.js", "/assets/px-CiO0pVtX.js", "/assets/CloseButton-DOK_eBUn.js"], "css": ["/assets/index-pY-vCZ97.css"] } }, "url": "/assets/manifest-6589d031.js", "version": "6589d031" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/auth.logout": {
    id: "routes/auth.logout",
    parentId: "root",
    path: "auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/customers": {
    id: "routes/customers",
    parentId: "root",
    path: "customers",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/orders": {
    id: "routes/orders",
    parentId: "root",
    path: "orders",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
