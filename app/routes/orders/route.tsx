import Panel from "~/components/Panel";
import { Group } from "@mantine/core";
import database from "~/postgrest/database";
import MyAppShell from "~/layouts/AppShell";
import { useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { TableSort } from "~/components";
import { orderFields } from "~/models/order";
import { handleCRUD } from "~/utils/crud";

export const meta: MetaFunction = () => {
  return [
    { title: "Orders" },
    { name: "Orders", content: "Orders of your application" },
  ];
};

export async function loader() {
  return json(await database.findAll("order"));
}

export async function action({ request }: ActionFunctionArgs) {
  return await handleCRUD(request, orderFields, "order");
}

export default function Orders() {
  const orders = useLoaderData<typeof loader>();

  return (
    <MyAppShell>
      <Group grow p="md">
        <Panel title="Orders">
          <TableSort
            data={orders}
            colDef={orderFields}
            editTitle="Edit Order"
            createTitle="Create New Order"
          />
        </Panel>
      </Group>
    </MyAppShell>
  );
}
