import {
  AppShell,
  Burger,
  Stack,
  Image,
  ScrollArea,
  Divider,
  Button,
  Group,
  Flex,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconDashboard,
  IconUsers,
  IconClipboardList,
  IconLogout,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import logo from "~/assets/img/logo.png";
import Navbar from "./Navbar";

import classes from "./AppShell.module.css";

interface IMyAppShellProps {
  children: React.ReactNode;
}

export default function MyAppShell({ children }: IMyAppShellProps) {
  const [opened, { toggle }] = useDisclosure();

  const isTablet = useMediaQuery("(max-width: 48em)");

  const links = [
    {
      to: "/Dashboard",
      label: "Dashboard",
      icon: <IconDashboard size="1rem" stroke={1.5} />,
    },
    {
      to: "/Customers",
      label: "Customers",
      icon: <IconUsers size="1rem" stroke={1.5} />,
    },
    {
      to: "/Orders",
      label: "Orders",
      icon: <IconClipboardList size="1rem" stroke={1.5} />,
    },
  ];

  const footerLinks = [
    {
      to: "/auth/logout",
      label: "Log Out",
      icon: <IconLogout size="1rem" stroke={1.5} />,
    },
  ];

  //Logic for toggling the Color Scheme
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

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
            {!isTablet && (
              <Button
                variant="outline"
                size="sm"
                color="red"
                onClick={toggleColorScheme}
              >
                {computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
              </Button>
            )}
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
