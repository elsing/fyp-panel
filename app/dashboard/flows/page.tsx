"use client";

import { Suspense } from "react";
import RenderFlows from "@/components/Flows/RenderFlows";
import { fetcher } from "@/components/Fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Spinner } from "flowbite-react";

export default function Flows() {
  const [flows, setFlows] = useState({});

  const { data } = useSWR(
    "https://api.singer.systems/flows",
    (url: string) => fetcher(url, { arg: ["GET", {}] }),
    {
      suspense: true,
    }
  );

  useEffect(() => {
    console.log("effect trigger");
    if (data?.success) {
      setFlows(data.json);
      console.log("data:", data.json);
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
      <div className="p-4 m-4">
        <h1 className="text-xl font-bold">Flows</h1>
        <h2>
          These are the daemons that connect to each other to create streams.
        </h2>
      </div>
      <Suspense>
        {data?.success || data?.code === 404 ? (
          <RenderFlows
            flows={data?.json}
            empty={data?.code === 404 ? true : false}
          />
        ) : (
          <div className="m-4 p-4">
            <p className="text-red-500">
              Unable to load flows, please try again.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
