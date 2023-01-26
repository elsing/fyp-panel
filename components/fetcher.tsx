export const fetcher = async (url: string, method: string) => {
  try {
    const resonse = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    //   Convert to JSON
    const json = await resonse.json();
    if (!resonse.ok) {
      return { success: false, json: json, code: resonse.status };
    }
    return { success: true, json: json, code: resonse.status };
  } catch (error) {
    return { success: false };
  }
};
