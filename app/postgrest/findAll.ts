import { Database, tableUrl } from "./database";
import get from "./network/get";

/**
 * Fetches all rows from the specified table in the PostgreSQL database.
 * Uses PostgREST for querying the database.
 *
 * @template T - The table name, which must be a key of the Database's Tables.
 * @param {T} table - The name of the table to query.
 * @param {string} [options] - Additional query options as a string.
 * @returns {Promise<Database["Tables"][T]["Row"][]>} - Returns an array of rows from the table.
 */
export async function findAll<T extends keyof Database["Tables"]>(
  table: T,
  options?: string
): Promise<Database["Tables"][T]["Row"][]> {
  // Perform the GET request to the PostgREST endpoint with the constructed URL
  return get<Database["Tables"][T]["Row"][]>(tableUrl(table, options));
}
