import { cookies } from "next/headers";
import { Suspense } from "react";
import nextBase64 from "next-base64";
import UserAvatar from "@/components/avatar";

export default async function UserDetails() {
  async function getInfo() {
    const userCookies = cookies();
    try {
      const payload = await userCookies.get("auth_token");
      const cookie = await String(payload.value).split(".", 2);
      const data = await nextBase64.decode(String(cookie[1]));
      const userInfo = await JSON.parse(data);
      return userInfo;
    } catch {
      return "User not found";
    }
  }
  const details = await getInfo();

  return (
    <div className="grid grid-cols-2 md:grid-rows-2 items-center justify-center h-16 md:w-64 min-w-min">
      <UserAvatar className="row-span-2 hidden md:block w-fit" />
      <h1 className="md:col-span-1 col-span-2">
        {details.first_name + " " + details.last_name}
      </h1>
      <p className="md:col-span-1 col-span-2 hidden md:block">
        @{details.username}
      </p>
    </div>
  );
}
