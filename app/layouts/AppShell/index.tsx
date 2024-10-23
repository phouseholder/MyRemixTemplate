import {
  ActionIcon,
  AppShell,
  Burger,
  Stack,
  Image,
  Flex,
  Group,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import logo from "~/assets/img/logo.png";
import Navbar from "./Navbar";
import { footerLinks, links } from "./links";
import classes from "./AppShell.module.css";
import Configuration from "./Configuration";

interface IMyAppShellProps {
  children: React.ReactNode;
}

export default function MyAppShell({ children }: IMyAppShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const [nav, { toggle: toggleNav }] = useDisclosure();

  const isTablet = useMediaQuery("(max-width: 48em)");

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: nav ? 50 : 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header className={classes.header}>
        <Flex justify="space-between" h="100%" pl="md" pr="md">
          <Stack justify="center">
            <Group>
              <Image src={logo} w={75} />
              {!isTablet && (
                <ActionIcon
                  onClick={toggleNav}
                  className={classes.navbarToggle}
                  variant="transparent"
                  color="gray"
                  size={30}
                >
                  {nav ? <IconChevronRight /> : <IconChevronLeft />}
                </ActionIcon>
              )}
            </Group>
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
        <AppShell.Section grow>
          <Navbar links={links} hideLabel={nav && !isTablet} />
        </AppShell.Section>
        <AppShell.Section>
          <Navbar links={footerLinks} hideLabel={nav && !isTablet} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
