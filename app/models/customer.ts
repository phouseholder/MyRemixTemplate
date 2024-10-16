import { IModelField } from ".";
export interface ICustomer {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  added_by: string;
  added_on: string;
}

export const customerFields: IModelField[] = [
  {
    name: "id",
    label: "id",
    placeholder: "Enter Username",
    required: true,
    type: "string"
  },
  {
    name: "name",
    label: "Name",
    placeholder: "Enter full name",
    required: false,
    type: "string",
    list_title: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    required: false,
    type: "string",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter phone number",
    required: false,
    type: "string",
  },
];