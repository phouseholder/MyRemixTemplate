import { NavLink } from "@mantine/core";
import { useLocation } from "@remix-run/react";
import classes from "./Navbar.module.css";
import { ILink } from "../links";

interface INavbar {
  links: ILink[];
  hideLabel?: boolean;
}

export default function Navbar({ links, hideLabel = false }: INavbar) {
  const location = useLocation();

  return (
    <>
      {links.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          href={to}
          label={!hideLabel ? label : undefined}
          leftSection={<Icon size="1.5rem" stroke={1.5} />}
          data-active={to === location.pathname || undefined}
          variant="filled"
          className={classes.navLink}
          color="var(--mantine-color-body)"
        />
      ))}
    </>
  );
}
