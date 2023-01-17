"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { Url, UrlObject } from "url";
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
  const [loginSuccess, setloginSuccess] = useState(true);
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
    setloginSuccess(true);
    console.log("data", data);
    // Once form submited ex. {Email: 'John@example.com', Password: 'secret'}
    const result: typeof data = await trigger(data);
    if (result?.status === 200) {
      // Handle successful login
      router.push("/dashboard");
    } else {
      // Handle login error
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
            <p className="text-3xl my-2 font-bold">Sign in</p>
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
              required={true}
              {...register("password", { required: true })}
            />
          </div>
          {/* <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div> */}
          <Button type="submit" disabled={isMutating}>
            {/* disabled={!dirty || isSubmitting} */}
            Submit
          </Button>
          {loginSuccess === false && (
            <Label
              className="font-bold text-center text-red-500 text-xl"
              value="Login failed, please try again"
            />
          )}
          <p className="">
            To create an account or reset a password, ask an admin. For now.
          </p>
        </form>
      </div>
    </main>
  );
}
