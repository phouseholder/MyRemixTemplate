import { Database } from "../database";

/**
 * Performs a POST request to insert a new row into the specified table in the PostgreSQL database.
 * Uses PostgREST for inserting into the database.
 *
 * @template T - The table name, which must be a key of the Database's Tables.
 * @param {string} url - The URL to send the POST request to.
 * @param {Database["Tables"][T]["Insert"]} payload - The data to insert as an object.
 * @returns {Promise<Database["Tables"][T]["Row"]>} - Returns the newly inserted row.
 * @throws {Error} - Throws an error if the network response is not ok.
 */
export default async function post<T extends keyof Database["Tables"]>(
  url: string,
  payload: Database["Tables"][T]["Insert"]
): Promise<Database["Tables"][T]["Row"]> {
  // Define headers for the request
  const headers = {
    Prefer: "return=representation", // Request the inserted row to be returned in the response
    "Content-Type": "application/json; charset=utf-8", // Set the content type to JSON
    Connection: "keep-alive", // Keep the connection alive
  };

  // Perform the fetch request with POST method to the specified URL
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
  });

  // Check if the response is not OK (status code outside the range 200-299)
  if (!response.ok) {
    // Throw an error with the status text if the response is not OK
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  // Parse the response body as JSON and cast it to the expected type
  const data = (await response.json()) as Database["Tables"][T]["Row"];

  // Return the newly inserted row
  return data;
}
