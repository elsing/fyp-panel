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
  handleClick,
}: {
  flow: IFlow;
  handleClick: Function;
}) {
  return (
    <div className="flex flex-col bg-gray-500 hover:bg-gray-400 border-black border rounded-lg m-4 p-4 h-40 shadow-xl">
      <p className="text-center font-bold">{flow.name}</p>
      <p>
        Status:{" "}
        {flow.status === "up" ? "✅" : flow.status === "down" ? "❌" : "❓"}
      </p>
      <p className="flex-wrap h-fit">Description {flow.description}</p>
      <p>Monitored: {flow.monitor ? "✅" : "❌"}</p>
      <p>Locked: {flow.locked ? "🔒" : "🔓"}</p>
      <button
        data-modal-target="modify-flow-modal"
        data-modal-toggle="modify-flow-modal"
        type="button"
        onClick={() => {
          handleClick(flow.flow_id);
        }}
      >
        Modify
      </button>
    </div>
  );
}
