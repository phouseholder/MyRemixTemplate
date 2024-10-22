import { constructQuery, Database, tableUrl } from "./database";

/**
 * Deletes rows from the specified table in the PostgreSQL database that match the search criteria.
 * Uses PostgREST for deleting from the database.
 *
 * @template T - The table name, which must be a key of the Database's Tables.
 * @param {T} table - The name of the table to delete from.
 * @param {Partial<Database["Tables"][T]["Row"]>} where - The search criteria as a partial object of the table's row.
 * @returns {Promise<T | null>} - Returns the deleted row if successful, otherwise null.
 */
export async function deleteRow<T extends keyof Database["Tables"]>(
  table: T,
  where: Partial<Database["Tables"][T]["Row"]>
): Promise<T | null> {
  // Construct the query string from the search criteria
  const queryString = constructQuery(where);

  // Construct the base URL for the table
  const tableString = tableUrl(table);

  // Combine the base URL and query string to form the full URL
  const fullUrl = `${tableString}?${queryString}`;

  const response = await fetch(fullUrl, {
    method: "DELETE",
    headers: {
      Prefer: "return=representation",
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return null;
}
