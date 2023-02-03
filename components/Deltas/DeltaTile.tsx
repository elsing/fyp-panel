export interface DeltaConfig {
  delta_id: number;
  org_id: number;
  name: string;
  initiated: boolean;
}

export default function RenderDeltas({
  delta,
  handleClick,
}: {
  delta: DeltaConfig;
  handleClick: Function;
}) {
  return (
    <div
      key={delta.delta_id}
      // data-key={delta.delta_id}
      className="flex flex-col bg-gray-500 hover:bg-gray-400 border-black border rounded-lg m-4 p-4 h-40 shadow-xl"
    >
      <p className="text-center font-bold">{delta.name}</p>
      <br />
      <p>Initiated: {delta.initiated ? "✅" : "❌"}</p>
      <br />
      <button
        type="button"
        onClick={() => {
          handleClick(delta.delta_id);
        }}
      >
        Configure
      </button>
    </div>
  );
}
