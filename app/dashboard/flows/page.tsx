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
    `${process.env.NEXT_PUBLIC_API_URL}/flows`,
    (url: string) => fetcher(url, { arg: ["GET", {}] }),
    {
      suspense: true,
    }
  );

  useEffect(() => {
    if (data?.success) {
      setFlows(data.json);
    }
  }, [data]);

  return (
    <div className="">
      <div className="p-4 m-4">
        <h1 className="text-xl font-bold">Flows</h1>
        <h2>
          These are the daemons that connect to each other to create streams.
        </h2>
        <button onClick={() => console.log(process.env.NEXT_PUBLIC_API_URL)}>
          test
        </button>
      </div>
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
    </div>
  );
}
