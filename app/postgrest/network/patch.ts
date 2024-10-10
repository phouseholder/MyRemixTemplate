import { Database } from "../database";

/**
 * Performs a PATCH request to update a row in the specified table in the PostgreSQL database.
 * Uses PostgREST for updating the database.
 *
 * @template T - The table name, which must be a key of the Database's Tables.
 * @param {string} url - The URL to send the PATCH request to.
 * @param {Database["Tables"][T]["Update"]} payload - The data to update as an object.
 * @returns {Promise<Database["Tables"][T]["Row"]>} - Returns the updated row.
 * @throws {Error} - Throws an error if the network response is not ok.
 */
export default async function patch<T extends keyof Database["Tables"]>(
  url: string,
  payload: Database["Tables"][T]["Update"]
): Promise<Database["Tables"][T]["Row"]> {
  // Perform the fetch request with PATCH method to the specified URL
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      Prefer: "return=representation", // Request the updated row to be returned in the response
      "Content-Type": "application/json; charset=utf-8", // Set the content type to JSON
      Connection: "keep-alive", // Keep the connection alive
    },
  });

  // Check if the response is not OK (status code outside the range 200-299)
  if (!response.ok) {
    // Throw an error with the status text if the response is not OK
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  // Parse the response body as JSON and cast it to the expected type
  const data = (await response.json()) as Database["Tables"][T]["Row"];

  // Return the updated row
  return data;
}
