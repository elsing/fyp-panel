export const fetcher = async (
  url: string,
  method: string = "GET",
  input: object
) => {
  async function handleResponse(response: Response) {
    const json = await response.json();
    console.log(response);
    console.log(json);
    if (!response.ok) {
      console.log("error");
      return { success: false, json: json, code: response.status };
    }
    console.log("success");
    return { success: true, json: json, code: response.status };
  }

  try {
    console.log("fetcher called", url);
    if (method === "POST") {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        body: JSON.stringify(input),
      });
      return await handleResponse(response);
    } else if (method === "GET") {
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
};
