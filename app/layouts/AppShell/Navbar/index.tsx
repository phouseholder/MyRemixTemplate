import { NavLink } from "@mantine/core";
import { useLocation } from "@remix-run/react";
import classes from "./Navbar.module.css";
import { Icon, IconProps } from "@tabler/icons-react";

export interface ILink {
  label: string;
  to: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

interface INavbar {
  links: ILink[];
}

export default function Navbar({ links }: INavbar) {
  const location = useLocation();

  return (
    <>
      {links.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          href={to}
          label={label}
          leftSection={<Icon size="1rem" stroke={1.5} />}
          data-active={to === location.pathname || undefined}
          variant="filled"
          className={classes.navLink}
          color="var(--mantine-color-body)"
        />
      ))}
    </>
  );
}
