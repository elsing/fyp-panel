"use client";

import { Alert } from "flowbite-react";
import useSWR from "swr";
import { fetcher } from "../Fetcher";
import StreamTile from "./StreamTile";

interface IStream {
  stream_id: number;
  river_id: number;
  flow_id: number;
  name: string;
  role: string;
  port: number;
  config: string;
  public_key: string;
  endpoint: string;
  tunnel: string;
  error: string;
  status: string;
}

export default function RenderStreams({ river }: { river: number }) {
  const { data } = useSWR(
    `https://api.singer.systems/rivers/${river}/streams`,
    (url: string) => fetcher(url, { arg: ["GET", {}] }),
    {
      suspense: true,
    }
  );

  return (
    <div>
      {data?.success || data?.code === 404 ? (
        <div className="max-w-full bg-gray-200 dark:bg-cyan-700 flex flex-col">
          {/* If rivers exist and the delta is not 0, map them */}
          {data?.code !== 404 && river !== 0 ? (
            data.json.map((stream: IStream) => {
              return <StreamTile stream={stream} key={stream.stream_id} />;
            })
          ) : (
            <div className="p-4 m-4 row-span-full max-w-full flex justify-center">
              <Alert color="info" withBorderAccent={true} className="w-max">
                {river !== 0 && "No Streams in this River."}
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
