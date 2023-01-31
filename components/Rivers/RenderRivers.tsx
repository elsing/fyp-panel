"use client";

import { useEffect, useState } from "react";
import CreateRiver from "./CreateRiver";
import ModifyRiver from "./ConfigureRiver";
import { fetcher } from "../Fetcher";
import useSWR from "swr";

export interface RiverConfig {
  river_id: number;
  org_id: number;
  name: string;
  initiated: boolean;
}

export default function RenderRivers({
  rivers,
  empty,
}: {
  rivers: RiverConfig[];
  empty: boolean;
}) {
  const [key, setKey] = useState<number>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [flowData, setFlowData] = useState<object>({});

  function handleClick(id: number) {
    if (id !== 0) {
      setShowModifyModal(true);
    } else {
      setShowCreateModal(true);
    }
    setKey(id);
  }

  // const { data } = useSWR(
  //   "https://api.singer.systems/flows",
  //   (url: string) => fetcher(url, { arg: ["GET", {}] }),
  //   {
  //     suspense: true,
  //   }
  // );

  //   useEffect(() => {
  //     console.log("Refresh River Flows");
  //     if (data?.success) {
  //       console.log("data:", data.json);
  //     }
  //   }, [data]);

  return (
    <div>
      <CreateRiver status={showCreateModal} setStatus={setShowCreateModal} />
      <ModifyRiver
        status={showModifyModal}
        setStatus={setShowModifyModal}
        river={key}
        // dataEmpty={data?.code === 404 ? true : false}
      />
      <div className="w-screen grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-pink-500 ">
        <div className="bg-gray-500 border-black border rounded-lg m-4 p-4 h-40 shadow-xl flex flex-col hover:bg-gray-400">
          <button
            onClick={() => {
              handleClick(0);
            }}
            className="flex flex-col justify-center h-screen items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <h1 className="flex">Create</h1>
          </button>
        </div>
        {/* If flows exist, map them */}
        {!empty &&
          rivers.map((river) => {
            return (
              <div
                key={river.river_id}
                // data-key={river.river_id}
                className="flex flex-col bg-gray-500 hover:bg-gray-400 border-black border rounded-lg m-4 p-4 h-40 shadow-xl"
              >
                <p className="text-center font-bold">{river.name}</p>
                <br />
                <p>Initiated: {river.initiated ? "✅" : "❌"}</p>
                <br />
                <button
                  data-modal-target="modify-flow-modal"
                  data-modal-toggle="modify-flow-modal"
                  type="button"
                  onClick={() => {
                    handleClick(river.river_id);
                  }}
                >
                  Configure
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
function setFlows(json: any) {
  throw new Error("Function not implemented.");
}
