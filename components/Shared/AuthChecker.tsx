"use client";

import { Spinner } from "flowbite-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import Redirect from "../Navbar/AuthRedirect";

export default function AuthChecker({
  children,
  url,
  reverse = "n",
}: {
  children: React.ReactNode;
  url: string;
  reverse?: string;
}) {
  const [hasAuth, setHasAuth] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (checking === false) {
      if (hasAuth) {
        if (reverse === "y") {
          router.push(url);
        }
      } else {
        if (url === "/login") {
          router.push(url); 
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, checking]);

  useEffect(() => {
    setChecking(true);
    const auth_token = Cookies.get("auth_token");
    const test = Cookies.get();
    if (auth_token) {
      setHasAuth(true);
    }
    setChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

return (
    checking ? (
      <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 text-black dark:text-white">
        <p>Checking auth...!</p>
        <Spinner color="purple" />
      </div>
    ) : (
    hasAuth ? (
      reverse === "y" ? (
        <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 text-black dark:text-white">
        <p>You are already logged in, redirecting...!</p>
        <Spinner color="purple" />
        </div>  
        ) : (
          <>
          {children}
          </>
          )
          ) : (
            url !== "/login" ? (
              <>
              {children}
              </>
              ) : (
                <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 text-black dark:text-white">
                <p>You must be logged in, redirecting...!</p>
                <Spinner color="purple" />
                </div>
                )
                )
    )
              );
            }
            