"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";
import { Button } from "flowbite-react";

async function logoutRequest(url: string) {
  return await fetch(url, {
    method: "GET",
    credentials: "include",
    // headers: { "Access-Control-Request-Method": "Allow" },
  });
}

export default function Logout() {
  const router = useRouter();
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // const [logoutSuccess, setlogoutSuccess] = useState(false);
  const [logoutWait, setlogoutWait] = useState(true);
  // //   logoutRequest("https://api.singer.systems/auth/logout");

  const { trigger, isMutating } = useSWRMutation(
    "https://api.singer.systems/auth/logout",
    logoutRequest
  );

  const handleLogout = async () => {
    // if (wait) {
    setlogoutWait(false);
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

      console.log("Logout Success!");
      await sleep(1000);
      // router.push("/dashboard");
      router.refresh();
      // return "test";
    } else {
      // Handle login error
      // setlogoutSuccess(false);
      console.log("Logout Failed!");
      // return "test2";
    }
    // }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Button
        color="failure"
        pill={true}
        className="m-4"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Suspense>
  );
}
