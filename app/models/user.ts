import { IModelField } from ".";

export interface IUser {
    username: string;
    role: ERole;
    display_name: string;
    password?: string;
  }
  
  export enum ERole {
    ADMIN = "admin",
    USER = "user",
  }
  
  export const userFields: IModelField[] = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter Username",
      required: true,
      type: "string"
    },
    {
      name: "display_name",
      label: "Name",
      placeholder: "Enter full name",
      required: false,
      type: "string",
      list_title: true,
    },
    {
      name: "role",
      label: "Role",
      placeholder: "Enter Role",
      required: true,
      type: "string",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter phone number",
      required: true,
      type: "string",
    },
  ];