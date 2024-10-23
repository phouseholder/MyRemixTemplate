import { IconClipboardList, IconDashboard, IconLogout, IconUsers } from "@tabler/icons-react";
import { Icon, IconProps } from "@tabler/icons-react";

export interface ILink {
    label: string;
    to: string;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

export const footerLinks: ILink[] = [
    {
        to: "/auth/logout",
        label: "Log Out",
        icon: IconLogout,
    },
];

export const links: ILink[] = [
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