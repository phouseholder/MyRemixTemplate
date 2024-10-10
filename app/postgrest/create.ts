import { Database, tableUrl } from "./database";
import post from "./network/post";

/**
 * Inserts a new row into the specified table in the PostgreSQL database.
 * Uses PostgREST for inserting into the database.
 *
 * @template T - The table name, which must be a key of the Database's Tables.
 * @param {T} table - The name of the table to insert into.
 * @param {Database["Tables"][T]["Insert"]} data - The data to insert as an object.
 * @returns {Promise<Database["Tables"][T]["Row"]>} - Returns the newly inserted row.
 */
export async function create<T extends keyof Database["Tables"]>(
  table: T,
  data: Database["Tables"][T]["Insert"]
): Promise<Database["Tables"][T]["Row"]> {
  // Log the create operation details for debugging
  console.log("CREATE", table, data, tableUrl(table));

  // Perform the POST request to the PostgREST endpoint with the table URL and insert data
  const result = await post<T>(tableUrl(table), data);

  // Return the newly inserted row
  return result;
}
