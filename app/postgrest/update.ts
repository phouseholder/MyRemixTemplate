import { constructQuery, Database, tableUrl } from "./database";
import patch from "./network/patch";

/**
 * Updates rows in the specified table in the PostgreSQL database that match the search criteria.
 * Uses PostgREST for updating the database.
 *
 * @template T - The table name, which must be a key of the Database's Tables.
 * @param {T} table - The name of the table to update.
 * @param {Partial<Database["Tables"][T]["Row"]>} where - The search criteria as a partial object of the table's row.
 * @param {Database["Tables"][T]["Update"]} data - The data to update as an object.
 * @returns {Promise<Database["Tables"][T]["Row"]>} - Returns the updated row.
 */
export async function update<T extends keyof Database["Tables"]>(
  table: T,
  where: Partial<Database["Tables"][T]["Row"]>,
  data: Database["Tables"][T]["Update"]
): Promise<Database["Tables"][T]["Row"]> {
  // Construct the query string from the search criteria
  const queryString = constructQuery(where);

  // Construct the base URL for the table
  const tableString = tableUrl(table);

  // Combine the base URL and query string to form the full URL
  const fullUrl = `${tableString}?${queryString}`;

  // Perform the PATCH request to the PostgREST endpoint with the constructed URL and update data
  const result = await patch<T>(`${fullUrl}`, data);

  // Return the updated row
  return result;
}
