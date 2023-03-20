"use client";

import { useModalContext } from "../Context/modal";

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

export default function FlowTile({
  flow,
  setStatus,
}: {
  flow: IFlow;
  setStatus: Function;
}) {
  const { setObjectID } = useModalContext()

  return (
    <div className="flex flex-col bg-gray-500 hover:bg-gray-400 border-black border rounded-lg m-4 p-4 h-min shadow-xl">
      <p className="text-center font-bold">{flow.name}</p>
      <p>
        Status:{" "}
        {flow.status === "online"
          ? "✅"
          : flow.status === "offline"
          ? "❌"
          : "❓"}
      </p>
      <p className="flex-wrap h-fit">Description {flow.description}</p>
      <p>Monitored: {flow.monitor ? "✅" : "❌"}</p>
      <p>Locked: {flow.locked ? "🔒" : "🔓"}</p>
      <button
        type="button"
        onClick={() => {
          setStatus(true);
          setObjectID(flow.flow_id)
        }}
      >
        Modify
      </button>
    </div>
  );
}
