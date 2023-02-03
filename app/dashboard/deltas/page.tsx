"use client";

import { fetcher } from "@/components/Fetcher";
import RenderDeltas from "@/components/Deltas/RenderDeltas";
import { useState, useEffect, Suspense } from "react";
import useSWR from "swr";

export default function Deltas() {
  const [deltas, setDeltas] = useState({});

  const { data } = useSWR("https://api.singer.systems/deltas", (url: string) =>
    fetcher(url, { arg: ["GET", {}] })
  );

  useEffect(() => {
    console.log("Refresh Deltas");
    if (data?.success) {
      setDeltas(data.json);
      console.log("data:", data.json);
    }
  }, [data]);

  return (
    <div>
      <div className="p-4 m-4">
        <h1 className="text-xl font-bold">Deltas</h1>
        <h2>
          These are the definition of a collection of flows working together to
          create a stream. A river defined what protocol the flows will use, the
          delta groups these.
        </h2>
      </div>
      <Suspense>
        {data?.success || data?.code === 404 ? (
          <RenderDeltas
            deltas={data?.json}
            empty={data?.code === 404 ? true : false}
          />
        ) : (
          <div className="m-4 p-4">
            <p className="text-red-500">
              Unable to load deltas, please try again.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
