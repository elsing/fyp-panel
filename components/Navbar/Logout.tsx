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
  const [logoutSuccess, setlogoutSuccess] = useState<boolean>(false);
  const [logoutWait, setlogoutWait] = useState<boolean>(false);

  const { trigger, data, error, isMutating } = useAPI("auth/logout");

  useEffect(() => {
    if (data?.success) {
      toast.success("Logout Success!");
      router.push("/login");
      return;
    } else if (data) {
      toast.error("Logout Failed!");
    }
  }, [data, router]);

  useEffect(() => {
    if (logoutWait) {
      setlogoutWait(false);
      trigger(["GET", {}]);

    }
  }, [logoutWait, trigger]);

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
