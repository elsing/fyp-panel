"use client";

import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Redirect() {
  const router = useRouter();
  router.push("/login");
  return (
    <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0">
      <p>You must be logged in, redirecting...!</p>
      <Spinner color="purple" aria-label="Purple spinner example" />
    </div>
  );
}
