import { Paper, Stack, Text } from "@mantine/core";
import classes from "./Panel.module.css";

interface IPanel {
  children: React.ReactNode;
  title?: string;
}

export default function Panel({ children, title }: IPanel) {
  return (
    <Stack>
      <Text size="md" className={classes.title}>
        {title}
      </Text>
      <Paper withBorder p="sm" radius="sm" className={classes.PanelContent}>
        {children}
      </Paper>
    </Stack>
  );
}
