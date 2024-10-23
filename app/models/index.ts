import { Database } from "~/postgrest/database";
import { ICustomer, customerFields } from './customer'
import { IOrderItem } from "./order_item";
import { IOrder, orderFields } from './order';
import { IProduct } from './product';
import { IUser, ERole, userFields } from './user';

// See stores/formFields.ts as an example.
// It is recommended to use ChatGPT or another LLM to generate IModelField based on the .entity.ts file
export interface IModelField {
  name: string;
  alias?: string;
  label: string;
  placeholder: string;
  required: boolean;
  type: "string" | "date" | "number" | "boolean" | "list" | "password";
  list_type?: keyof Database["Tables"];
  list_title?: boolean;
  list_fields?: IModelField[];
  title?: boolean;
}

export {
  type ICustomer,
  type IOrderItem,
  type IOrder,
  type IProduct,
  type IUser,
  type ERole,
  orderFields,
  customerFields,
  userFields
}
