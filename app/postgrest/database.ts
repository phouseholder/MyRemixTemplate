import { ICustomer } from "~/models/customer";
import { IOrder } from "~/models/order";
import { IOrderItem } from "~/models/order_item";
import { IProduct } from "~/models/product";
import { IUser } from "~/models/user";
import { deleteRow } from "./delete";
import { findAll } from "./findAll";
import { findOne } from "./findOne";
import { update } from "./update";
import { create } from "./create";

// Base URL for PostgREST server
const POSTGREST_URL = "https://my-remix-template-vuzn-9aqf163qd-phouseholders-projects.vercel.app";

// Interface for the Database structure used by PostgREST
export interface Database {
  Tables: {
    customer: {
      Row: ICustomer;
      Insert: Omit<ICustomer, "id" | "added_on">; // Assuming 'id' and 'added_on' are auto-generated
      Update: Partial<Omit<ICustomer, "id" | "added_on">>; // Partial updates
    };
    user: {
      Row: IUser;
      Insert: Omit<IUser, "username">; // Assuming 'username' is auto-generated
      Update: Partial<Omit<IUser, "username">>; // Partial updates
    };
    product: {
      Row: IProduct;
      Insert: Omit<IProduct, "id" | "added_on">; // Assuming 'id' and 'added_on' are auto-generated
      Update: Partial<Omit<IProduct, "id" | "added_on">>; // Partial updates
    };
    order: {
      Row: IOrder;
      Insert: Omit<IOrder, "id" | "added_on">; // Assuming 'id' and 'added_on' are auto-generated
      Update: Partial<Omit<IOrder, "id" | "added_on">>; // Partial updates
    };
    order_item: {
      Row: IOrderItem;
      Insert: Omit<IOrderItem, "id" | "added_on">; // Assuming 'id' and 'added_on' are auto-generated
      Update: Partial<Omit<IOrderItem, "id" | "added_on">>; // Partial updates
    };
  };
}

/**
 * Helper function to create the full URL for a table in the PostgREST server.
 *
 * @param {keyof Database["Tables"]} table - The name of the table.
 * @param {string} [options] - Additional query options as a string.
 * @returns {string} - The full URL for the table.
 */
export function tableUrl(
  table: keyof Database["Tables"],
  options?: string
): string {
  return `${POSTGREST_URL}/${table}${options ? `?${options}` : ""}`;
}

/**
 * Helper function to construct the query string from search criteria.
 *
 * @param {Partial<T>} search - The search criteria as a partial object.
 * @returns {string} - The constructed query string.
 */
export function constructQuery<T>(search: Partial<T>): string {
  return Object.entries(search)
    .map(([key, value]) => `${key}=eq.${encodeURIComponent(value as string)}`)
    .join("&");
}

// Database operations object, consolidating all CRUD operations
const database = {
  findOne,
  findAll,
  create,
  update,
  delete: deleteRow,
};

export default database;
