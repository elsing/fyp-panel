import { cookies } from "next/headers";
import { Suspense } from "react";
import nextBase64 from "next-base64";

export default function Username() {
  function getInfo() {
    const userCookies = cookies();
    try {
      const payload = userCookies.get("auth_token");
      const cookie = String(payload.value).split(".", 2);
      const userInfo = JSON.parse(nextBase64.decode(cookie[1]));
      return userInfo.first_name + " " + userInfo.last_name;
    } catch {
      return "User not found";
    }
  }
  const username = getInfo();

  return (
    <div className="flex flex-col justify-center">
      <h1>{getInfo()}</h1>
    </div>
  );
}
