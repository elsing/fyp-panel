import { cookies } from "next/headers";
import { Suspense } from "react";

export default function Username() {
  function getInfo() {
    const payload = String(cookies().get("auth_token"));
    const data = payload.split(".", 3);
    console.log("data:", data);
    console.log("payload:", payload);
    return data;
  }
  const username = getInfo();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>{getInfo()}</h1>
      </div>
    </Suspense>
  );
}
