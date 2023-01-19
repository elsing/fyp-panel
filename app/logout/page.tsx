"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";
// import Logout from "@/components/logout";

async function logoutRequest(url: string) {
  return await fetch(url, {
    method: "GET",
    //   headers: { "Access-Control-Request-Method": "Allow" },
  });
}

export default function Logout() {
  const router = useRouter();
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [logoutSuccess, setlogoutSuccess] = useState(false);
  // const [logoutWait, setlogoutWait] = useState(true);
  // //   logoutRequest("https://api.singer.systems/auth/logout");

  const { trigger, isMutating } = useSWRMutation(
    "https://api.singer.systems/auth/logout",
    logoutRequest
  );

  const execute = async () => {
    // setlogoutWait(false);
    // await sleep(5000);
    // console.log("1");
    // await sleep(1000);
    // console.log("2");
    // await sleep(1000);
    // console.log("3");
    // await sleep(1000);
    // console.log("4");
    // setlogoutSuccess(false);
    // // Once form submited ex. {Email: 'John@example.com', Password: 'secret'}
    const result = await trigger();
    if (result?.status === 200) {
      // Handle successful logout
      setlogoutSuccess(true);
      console.log("Logout Success!");
      await sleep(5000);
      router.push("/login");
      return 200;
    } else {
      // Handle login error
      setlogoutSuccess(false);
      console.log("Logout Failed!");
      return 500;
    }
  };

  const logoutStatus = execute();

  return (
    <main>
      <div className="flex flex-col justify-center h-screen items-center">
        <h1>Logged out</h1>
      </div>
    </main>
  );
}
