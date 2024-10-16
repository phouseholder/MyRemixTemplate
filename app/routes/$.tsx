import { Alert, Grid } from "@mantine/core";
import MyAppShell from "~/layouts/AppShell";
import { IconInfoCircle } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <MyAppShell>
      <Grid p="md">
        <Grid.Col>
          <Alert
            variant="light"
            color="red"
            title="ERROR 404"
            icon={<IconInfoCircle />}
          >
            We are sorry but it looks like the page you are looking for does not
            exist.
          </Alert>
        </Grid.Col>
      </Grid>
    </MyAppShell>
  );
}
