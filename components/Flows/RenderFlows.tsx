"use client";

import CreateFlow from "./Modal/CreateFlow";
import ConfigureFlow from "./Modal/ConfigureFlow";
import CreateButton from "../Shared/CreateButton";
import FlowTile from "./FlowTile";
import { useModalContext } from "../Context/modal";
import { useState } from "react";

interface IFlow {
  flow_id: number;
  org_id: number;
  stream_id: number;
  name: string;
  status: string;
  description: string;
  monitor: boolean;
  api_key: string;
  locked: boolean;
}

export default function RenderFlows({
  flows,
  empty,
}: {
  flows: IFlow[];
  empty: boolean;
}) {
  const [key, setKey] = useState<number>(0);
  const { setConfigureModalStatus } = useModalContext();
  const [showCreateModal, setCreateModal] = useState(false);

  function handleClick(id: number) {
    if (id !== 0) {
      setConfigureModalStatus(true);
    } else {
      setCreateModal(true);
    }
    setKey(id);
  }

  return (
    <div>
      {/* <CreateFlow /> */}
      <ConfigureFlow flow={key} />
      {/* Show the create flows button */}
      <CreateFlow status={showCreateModal} setStatus={setCreateModal} />

      <div className="w-screen grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-pink-500 ">
        <CreateButton handleClick={handleClick} />
        {/* If flows exist, map them */}
        {!empty &&
          flows.map((flow) => {
            return (
              <FlowTile
                flow={flow}
                handleClick={handleClick}
                key={flow.flow_id}
              />
            );
          })}
      </div>
    </div>
  );
}
