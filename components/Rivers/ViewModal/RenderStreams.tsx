"use client";

import { useModalContext } from "@/components/Context/modal";
import AddStream from "@/components/Streams/AddModal/AddStream";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

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

export default function RenderStreams({
  streams,
  setStatus,
}: {
  streams: IStream[];
  setStatus: Function;
}) {
  const { setObjectID } = useModalContext();
  const [configureModalStatus, setConfigureModalStatus] = useState(false);

  function toggleEditStream(stream_id: number | string) {
    console.log("edit stream clicked");
    setObjectID(stream_id);
    setConfigureModalStatus(true);
  }

  return (
    <div>
      <AddStream
        status={configureModalStatus}
        setStatus={setConfigureModalStatus}
        mode={"edit"}
      />
      <Table className="dark:text-white">
        <Table.Head className="dark:bg-gray-600">
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Port</Table.HeadCell>
          <Table.HeadCell>Endpoint</Table.HeadCell>
          <Table.HeadCell>Tunnel</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {streams.map((stream) => (
            <Table.Row key={stream.stream_id} className="dark:bg-gray-500">
              <Table.Cell>{stream.name}</Table.Cell>
              <Table.Cell>{stream.role}</Table.Cell>
              <Table.Cell>{stream.port}</Table.Cell>
              <Table.Cell>{stream.endpoint}</Table.Cell>
              <Table.Cell>{stream.tunnel}</Table.Cell>

              <Table.Cell>
                {stream.status === "up" ? (
                  <p className="text-green-400 font-bold">{stream.status}</p>
                ) : stream.status === "down" ? (
                  <p className="text-red-400 font-bold">{stream.status}</p>
                ) : (
                  <p>{stream.status}</p>
                )}
              </Table.Cell>
              <Table.Cell>
                <button
                  className="hover:underline text-blue-400"
                  key={"editbtn" + stream.stream_id}
                  onClick={() =>
                    // toggleEditStream(`${stream.river_id}.${stream.stream_id}`)
                    toggleEditStream(stream.stream_id)
                  }
                >
                  More / Edit
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
