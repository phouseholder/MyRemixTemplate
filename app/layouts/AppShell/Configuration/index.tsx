import { Drawer, ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettingsFilled } from "@tabler/icons-react";
import { ColorSchemeToggle } from "~/components";

const Configuration = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Configuration"
        position="right"
      >
        <ColorSchemeToggle />
      </Drawer>

      <ActionIcon variant="transparent" onClick={open} size={30} color="gray">
        <IconSettingsFilled />
      </ActionIcon>
    </>
  );
};

export default Configuration;
