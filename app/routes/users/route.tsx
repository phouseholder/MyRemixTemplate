import MyAppShell from "~/layouts/AppShell";
import { TableSort } from "~/components/TableSort";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { handleCRUD } from "~/utils/crud";
import { userFields } from "~/models/user";
import database from "~/postgrest/database";
import { useLoaderData } from "@remix-run/react";
import { Grid } from "@mantine/core";
import Panel from "~/components/Panel";

export async function loader() {
  return json(await database.findAll("user"));
}

export async function action({ request }: ActionFunctionArgs) {
  return await handleCRUD(request, userFields, "user");
}

export default function User() {
  const users = useLoaderData<typeof loader>();

  return (
    <MyAppShell>
      <Grid p="md">
        <Grid.Col>
          <Panel title="Users">
            <TableSort
              data={users}
              colDef={userFields}
              createTitle="Create New User"
              editTitle="Edit User"
            />
          </Panel>
        </Grid.Col>
      </Grid>
    </MyAppShell>
  );
}
