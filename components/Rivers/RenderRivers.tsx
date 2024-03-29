"use client";

import RiverTile from "./RiverTile/RiverTile";
import { useState } from "react";
import { Alert } from "flowbite-react";
import { fetcher } from "../Fetcher";
import useSWR from "swr";
import { useModalContext } from "../Context/modal";

interface IRiver {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function RenderRivers({ delta }: { delta: number }) {
  const [key, setKey] = useState<number>(0);
  const { objectID } = useModalContext();

  // Collect all rivers from the delta
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/deltas/${delta}/rivers`,
    (url: string) => fetcher(url, { arg: ["GET", {}] }),
    {
      suspense: true,
    }
  );

  return (
    <div>
      {data?.success || data?.code === 404 ? (
        <div className="w-screen bg-gray-200 dark:bg-cyan-700 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {/* If rivers exist and the delta is not 0, map them */}
          {data?.code !== 404 && delta !== 0 ? (
            data.json.map((river: IRiver) => {
              return <RiverTile river={river} key={river.river_id} />;
            })
          ) : (
            <div className="p-4 m-4 row-span-full min-w-max col-span-full flex justify-center">
              <Alert color="info" withBorderAccent={true} className="w-max">
                {delta !== 0
                  ? "No Rivers in this Deltas, please add them in the Deltas page."
                  : "Please select a Delta."}
              </Alert>
            </div>
          )}
        </div>
      ) : (
        <h1 className="p-4 m-4">River not able to render.</h1>
      )}
    </div>
  );
}
