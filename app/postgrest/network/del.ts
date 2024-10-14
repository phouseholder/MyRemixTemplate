async function del<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
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
