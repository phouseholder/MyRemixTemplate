import { constructQuery, Database, tableUrl } from "./database";
import get from "./network/get";

/**
 * Fetches a single row from the specified table in the PostgreSQL database that matches the search criteria.
 * Uses PostgREST for querying the database.
 *
 * @template T - The table name, which must be a key of the Database's Tables.
 * @param {T} table - The name of the table to query.
 * @param {Partial<Database["Tables"][T]["Row"]>} search - The search criteria as a partial object of the table's row.
 * @param {string} [options] - Additional query options as a string.
 * @returns {Promise<Database["Tables"][T]["Row"] | null>} - Returns a single row if found, otherwise null.
 */
export async function findOne<T extends keyof Database["Tables"]>(
  table: T,
  search: Partial<Database["Tables"][T]["Row"]>,
  options?: string
): Promise<Database["Tables"][T]["Row"] | null> {
  // Construct the query string from the search criteria
  const queryString = constructQuery(search);

  // Append any additional query options to the query string
  const queryStringWithOptions = options
    ? `${queryString}&${options}`
    : queryString;

  // Perform the GET request to the PostgREST endpoint with the constructed URL
  const results = await get<Database["Tables"][T]["Row"][]>(
    `${tableUrl(table, queryStringWithOptions)}`
  );

  // If no results are found, return null
  if (results.length === 0) {
    return null;
  }

  // Return the first result found
  return results[0];
}
