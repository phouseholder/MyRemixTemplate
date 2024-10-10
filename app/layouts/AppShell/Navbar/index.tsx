import { NavLink } from "@mantine/core";
import { useLocation } from "@remix-run/react";
import { InlineInputClasses } from "node_modules/@mantine/core/lib/components/InlineInput";
import classes from "./Navbar.module.css";

interface INavbar {
  links: any[];
}

export default function Navbar({ links }: INavbar) {
  const location = useLocation();

  return (
    <>
      {links.map((item) => (
        <NavLink
          key={item.label}
          href={item.to}
          label={item.label}
          leftSection={item.icon}
          data-active={item.to === location.pathname || undefined}
          variant="filled"
          className={classes.navLink}
          color="var(--mantine-color-body)"
        />
      ))}
    </>
  );
}
