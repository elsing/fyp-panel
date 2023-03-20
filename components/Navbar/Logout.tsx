"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Button } from "flowbite-react";
import useAPI from "../Hooks/useAPI";
import { toast } from "react-toastify";

export default function Logout() {
  const router = useRouter();
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [logoutSuccess, setlogoutSuccess] = useState<boolean>(false);
  const [logoutWait, setlogoutWait] = useState<boolean>(false);

  const { trigger, data, isMutating } = useAPI("auth/logout");

  useEffect(() => {
    if (data?.success) {
      console.log("Logout Success!");
      router.refresh();
      // setlogoutSuccess(true);
      setlogoutSuccess(true);
      return;
    }
  }, [data]);

  useEffect(() => {
    if (logoutWait) {
      setlogoutWait(false);
      console.log("trig");
      // Handle successful logout
      trigger(["GET", {}]);
      sleep(2000);

      if (!logoutSuccess) {
        toast.success("Logout Success!");
      } else {
        toast.error("Logout Failed!");
      }
    }
  }, [logoutWait]);

  function handleClick() {
    if (!logoutWait) {
      setlogoutWait(true);
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Button color="failure" pill={true} className="m-4" onClick={handleClick}>
        Logout
      </Button>
    </Suspense>
  );
}
