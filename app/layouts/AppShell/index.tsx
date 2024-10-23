import {
  AppShell,
  Burger,
  Stack,
  Image,
  ScrollArea,
  Divider,
  Flex,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconClipboardList,
  IconDashboard,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";
import logo from "~/assets/img/logo.png";
import Navbar, { ILink } from "./Navbar";

import classes from "./AppShell.module.css";
import Configuration from "./Configuration";

interface IMyAppShellProps {
  children: React.ReactNode;
}

export default function MyAppShell({ children }: IMyAppShellProps) {
  const [opened, { toggle }] = useDisclosure();

  const isTablet = useMediaQuery("(max-width: 48em)");

  const footerLinks: ILink[] = [
    {
      to: "/auth/logout",
      label: "Log Out",
      icon: IconLogout,
    },
  ];

  const links: ILink[] = [
    {
      to: "/Dashboard",
      label: "Dashboard",
      icon: IconDashboard,
    },
    {
      to: "/Customers",
      label: "Customers",
      icon: IconUsers,
    },
    {
      to: "/Orders",
      label: "Orders",
      icon: IconClipboardList,
    },
  ];

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Flex justify="space-between" h="100%" pl="md" pr="md">
          <Stack justify="center">
            <Image src={logo} w={75} />
          </Stack>
          <Stack justify="center">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            {!isTablet && <Configuration />}
          </Stack>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar className={classes.navbar}>
        <AppShell.Section grow component={ScrollArea}>
          <Navbar links={links} />
        </AppShell.Section>
        <Divider />
        <AppShell.Section>
          <Navbar links={footerLinks} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
