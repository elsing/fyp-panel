"use client";

import { useState } from "react";
import { Inter } from "@next/font/google";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import Darkmode from "@/components/darkmode";
// import

const inter = Inter({ subsets: ["latin"] });

async function loginRequest(url: string, { arg }: { arg: object }) {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    credentials: "include",
    headers: { "Access-Control-Request-Method": "Allow" },
  });
}

export default function Login() {
  const router = useRouter();
  const [loginSuccess, setloginSuccess] = useState(false);
  const [loginFailed, setloginFailed] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const { trigger, data, error, isMutating } = useSWRMutation(
    "https://api.singer.systems/auth",
    loginRequest
  );

  const onSubmit = async (data: any) => {
    setloginFailed(false);
    console.log("data", data);
    // Once form submited ex. {Email: 'John@example.com', Password: 'secret'}
    const result: typeof data = await trigger(data);
    if (result?.status === 200) {
      // Handle successful login
      setloginSuccess(true);
      router.push("/dashboard");
    } else {
      // Handle login error
      setloginFailed(true);
      setloginSuccess(false);
      console.log("Login Failed!");
    }
  };
  // bg-gray-200 dark:bg-gray-900
  return (
    <main>
      <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0">
        <h1 className="my-4 text-5xl dark:text-white font-bold">Watershed</h1>
        <form
          className="flex flex-col gap-4 bg-white dark:bg-gray-700 p-6 rounded-lg max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <p className="text-3xl my-2 font-bold dark:text-white">Sign in</p>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="johndoe"
              {...register("username", { required: true })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          {/* <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div> */}
          {loginSuccess && (
            <Button type="submit" disabled={isMutating || loginSuccess}>
              {/* disabled={!dirty || isSubmitting} */}
              Success...redirecting!
            </Button>
          )}
          {loginSuccess === false && (
            <Button type="submit" disabled={isMutating || loginSuccess}>
              {/* disabled={!dirty || isSubmitting} */}
              Submit
            </Button>
          )}
          {loginFailed && (
            <Label
              className="font-bold text-center text-red-500 text-xl"
              value="Login failed, please try again"
            />
          )}
          <p className="dark:text-white font-semibold">
            To create an account or reset a password, ask an admin. For now.
          </p>
          <div className="flex flex-row justify-center">
            <Darkmode />
          </div>
        </form>
      </div>
    </main>
  );
}
