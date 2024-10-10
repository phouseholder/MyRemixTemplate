/**
 * Performs a GET request to the specified URL.
 *
 * @template T - The expected type of the response data.
 * @param {string} url - The URL to send the GET request to.
 * @returns {Promise<T>} - Returns the response data.
 * @throws {Error} - Throws an error if the network response is not ok.
 */
export default async function get<T>(url: string): Promise<T> {
  // Perform the fetch request to the specified URL with keep-alive header
  const response = await fetch(url, {
    headers: {
      Connection: "keep-alive",
    },
  });

  // Check if the response is not OK (status code outside the range 200-299)
  if (!response.ok) {
    // Throw an error with the status text if the response is not OK
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  // Parse the response body as JSON and cast it to the expected type
  const data = (await response.json()) as T;

  // Return the parsed data
  return data;
}
