"use client";

import { Suspense } from "react";
import RenderFlows from "@/components/renderFlows";
import { fetcher } from "@/components/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Spinner } from "flowbite-react";

export default function Flows() {
  const [flows, setFlows] = useState({});

  const { data } = useSWR("https://api.singer.systems/flows", fetcher, {
    suspense: true,
  });

  useEffect(() => {
    if (data?.success) {
      setFlows(data);
      console.log("data:", data?.json);
    } else {
      if (data?.code === 401) {
        window.location.href = "/login";
      }
      setFlows({ loaded: false });
      console.log("else...!", data?.json);
    }
  }, [data]);

  return (
    <div>
      <h1>Flows</h1>
      <Suspense
        fallback={
          <div className="justify-center flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 text-black dark:text-white ">
            <Spinner color="purple" aria-label="Purple spinner example" />
          </div>
        }
      >
        <RenderFlows flows={data?.json} />
      </Suspense>
    </div>
  );
}
