import Panel from "~/components/Panel";
import { Grid, ScrollArea, Box } from "@mantine/core";
import database from "~/postgrest/database";
import MyAppShell from "~/layouts/AppShell";
import { useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { TableSort } from "~/components/TableSort";
import { customerFields } from "~/models/customer";
import { handleCRUD } from "~/utils/crud";
import { orderFields } from "~/models/order";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Customers" },
    { name: "Customers", content: "Customers of your application" },
  ];
};

export async function loader() {
  return json({
    customers: await database.findAll("customer"),
    orders: await database.findAll("order"),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  return await handleCRUD(request, customerFields, "customer");
}

export default function Customers() {
  const { customers, orders } = useLoaderData<typeof loader>();
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0].id);

  function handleSelectCustomer(id: string) {
    setSelectedCustomer(id);
  }

  return (
    <MyAppShell>
      <Grid p="md">
        <Grid.Col>
          <Panel title="Customers">
            <TableSort
              data={customers}
              colDef={customerFields.filter(
                (field) => !["id"].includes(field.name)
              )}
              createTitle="Create New Customer"
              editTitle="Edit Customer"
              onSelect={handleSelectCustomer}
            />
          </Panel>
        </Grid.Col>
        <Grid.Col>
          <Panel title="Orders">
            <TableSort
              data={orders}
              colDef={orderFields.filter(
                (field) => !["id"].includes(field.name)
              )}
              createTitle="Create New Order"
              editTitle="Edit Order"
              bindings={{
                col: "customer_id",
                val: selectedCustomer,
              }}
              formAction="/Orders"
            />
          </Panel>
        </Grid.Col>
      </Grid>
    </MyAppShell>
  );
}
