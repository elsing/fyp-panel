"use client";

import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Redirect({ url }: { url: string }) {
  console.log(url);
  const router = useRouter();
  router.push(url);

  return (
    <main>
      <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 text-black dark:text-white ">
        {url === "/login" ? (
          <>
            <p>You must be logged in, redirecting...!</p>
            <Spinner color="purple" aria-label="Purple spinner example" />
          </>
        ) : (
          <p>You are already logged in, redirecting...!</p>
        )}
      </div>
    </main>
  );
}
