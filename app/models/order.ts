import { IModelField } from ".";
import { customerFields } from "./customer";

export interface IOrder {
  id: string;
  ship_date?: string;
  customer_id?: string;
  added_by: string;
  added_on: string;
}

export const orderFields: IModelField[] = [
  {
    name: "id",
    label: "ID",
    placeholder: "Enter ID",
    required: true,
    type: "string",
  },
  {
    name: "ship_date",
    label: "Ship Date",
    placeholder: "Enter ship date",
    required: false,
    type: "date",
  },
  {
    name: "customer_id",
    alias: "customer.name",
    label: "Customer",
    placeholder: "Enter customer ID",
    required: false,
    type: "list",
    list_type: "customer",
    list_fields: customerFields,
  },
];
