"use client";

import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect({ url }: { url: string }) {
  const router = useRouter();

  useEffect(() => {
    router.push(url);
  }, [router, url]);

  return (
    <main>
      <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 text-black dark:text-white ">
        {url === "/login" ? (
          <>
            <p>You must be logged in, redirecting...!</p>
            <Spinner color="purple" aria-label="Purple spinner example" />
          </>
        ) : (
          url === "/dashboard" && (
            <>
              <p>You are already logged in, redirecting...!</p>
              <Spinner color="purple" aria-label="Purple spinner example" />
            </>
          )
        )}
      </div>
    </main>
  );
}
