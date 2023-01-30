export async function fetcher(
  url: string,
  { arg }: { arg: any | undefined } = { arg: undefined }
) {
  const method = arg[0];
  const input = arg[1];

  // input: object
  async function handleResponse(response: Response) {
    const json = await response.json();
    if (!response.ok) {
      return { success: false, json: json, code: response.status };
    }
    return { success: true, json: json, code: response.status };
  }

  try {
    if (method === "POST" || method === "PATCH") {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        body: JSON.stringify(input),
      });
      return await handleResponse(response);
    } else if (method === "GET" || method === "DELETE") {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
      });
      return await handleResponse(response);
    }
    //   Convert to JSON
  } catch (error) {
    console.log(error);
    return { success: false, json: error, code: 500 };
  }
}