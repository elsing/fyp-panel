import { toast } from "react-toastify";

export async function fetcher(
  url: string,
  { arg }: { arg: any | undefined } = { arg: undefined }
) {
  const method = arg[0];
  const input = arg[1];

  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => {
    controller.abort();
  }, 5000);

  // input: object
  async function handleResponse(response: Response) {
    const json = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        toast.error("You are not authorized to perform this action. Uour sesssion has probably expired. Please log in again.");
  
      } 
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
        signal: signal,
      });
      return handleResponse(response);
    } else if (method === "GET" || method === "DELETE") {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        signal: signal,
      });
      return handleResponse(response);
    }
    //   Convert to JSON
  } catch (error) {
    console.log(error);
    return { success: false, json: error, code: 500 };
  }
}
