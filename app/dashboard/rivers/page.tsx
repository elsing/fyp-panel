"use client";

import { fetcher } from "@/components/Fetcher";
import RenderRivers from "@/components/Rivers/RenderRivers";
import { useState, useEffect, Suspense } from "react";
import useSWR from "swr";

export default function Rivers() {
  const [rivers, setRivers] = useState({});

  const { data } = useSWR(
    "https://api.singer.systems/rivers",
    (url: string) => fetcher(url, { arg: ["GET", {}] }),
    {
      suspense: true,
    }
  );

  useEffect(() => {
    console.log("Refresh Rivers");
    if (data?.success) {
      setRivers(data.json);
      console.log("data:", data.json);
    }
  }, [data]);

  return (
    <div>
      <div className="p-4 m-4">
        <h1 className="text-xl font-bold">Rivers</h1>
        <h2>
          These are the definition of a collection of flows working together to
          create a streams. A stream defined how the flows will act, the river
          groups these.
        </h2>
      </div>
      <Suspense>
        {data?.success || data?.code === 404 ? (
          <RenderRivers
            rivers={data?.json}
            empty={data?.code === 404 ? true : false}
          />
        ) : (
          <div className="m-4 p-4">
            <p className="text-red-500">
              Unable to load rivers, please try again.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
