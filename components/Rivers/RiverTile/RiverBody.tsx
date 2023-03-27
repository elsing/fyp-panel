"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { fetcher } from "@/components/Fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

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

export default function RiverBody({ river_id }: { river_id: number }) {
  const [servers, setServers] = useState(0);
  const [clients, setClients] = useState(0);
  let serverCount = 0;
  let clientCount = 0;

  const { data: streams } = useSWR(
    `https://api.singer.systems/rivers/${river_id}/streams`,
    (url: string) => fetcher(url, { arg: ["GET", {}] }),
    {
      suspense: true,
    }
  );

  useEffect(() => {
    serverCount = 0;
    clientCount = 0;
    if (streams?.success) {
      streams.json.map((stream: IStream) => {
        if (stream.role === "server") {
          serverCount = serverCount + 1;
        } else {
          clientCount = clientCount + 1;
        }
      });
    }
    setServers(serverCount);
    setClients(clientCount);
  }, [streams]);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center items-center">
          <p className="text-8xl">{servers}</p>
          <h2 className="font-bold k">Server(s)</h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-8xl">{clients}</p>
          <h2 className="font-bold">Client(s)</h2>
        </div>
      </div>
    </div>
  );
}
