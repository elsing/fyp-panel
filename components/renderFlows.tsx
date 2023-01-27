"use client";

import CreateFlow from "@/components/createFlow";
import ModifyModal from "./ModifyFlow";
import { useEffect, useState } from "react";

export interface FlowConfig {
  flow_id: number;
  org_id: number;
  stream_id: number;
  name: string;
  status: string;
  description: string;
  monitor: boolean;
  // flows
}

export default function RenderFlows({ flows }: { flows: FlowConfig[] }) {
  const [key, setKey] = useState<number>();
  const [trigger, setTrigger] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showCreateModal, setCreateModal] = useState(false);

  function handleClick(id: number) {
    if (id !== 0) {
      setShowModifyModal(true);
    } else {
      setCreateModal(true);
    }
    setKey(id);
  }

  // useEffect(() => {
  //   console.log("test");
  //   if (key === undefined) {
  //     return;
  //   }
  //   if (key !== 0) {
  //     console.log("renderkeys:", key);
  //     console.log("Modify attempt");
  //     // setShowModifyModal(true);
  //   } else {
  //     console.log("Create attempt");
  //   }
  // }, [key]);

  return (
    <div>
      {/* <CreateFlow /> */}
      <ModifyModal
        status={showModifyModal}
        setStatus={setShowModifyModal}
        flow={key}
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
        {flows.map((flow) => {
          return (
            <div
              key={flow.flow_id}
              data-key={flow.flow_id}
              className="flex flex-col bg-gray-500 hover:bg-gray-400 border-black border rounded-lg m-4 p-4 h-40 shadow-xl"
              // onClick={() => {
              //   handleClick(flow.flow_id);
              // }}
              // data-modal-target="modify-flow-modal"
              // data-modal-toggle="modify-flow-modal"
            >
              <p>Name: {flow.name}</p>
              <p>Status: {flow.status}</p>
              <p className="flex-wrap h-fit">Description {flow.description}</p>
              <p>Monitored: {flow.monitor ? "Yes" : "No"}</p>
              <button
                data-modal-target="modify-flow-modal"
                data-modal-toggle="modify-flow-modal"
                type="button"
                onClick={() => {
                  handleClick(flow.flow_id);
                }}
              >
                test
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
