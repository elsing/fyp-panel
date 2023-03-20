"use client";

import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <main>
      <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto w-64 h-64 lg:py-0 text-black dark:text-white ">
        <Spinner color="purple" aria-label="Purple spinner example" />
        <p className="font-bold">Loading...!</p>
      </div>
    </main>
  );
}
