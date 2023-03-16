import RiverBody from "./RiverBody";
import RiverFooter from "./RiverFooter";
import RiverHeader from "./RiverHeader";

interface IRiver {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function RiverTile({ river }: { river: IRiver }) {
  return (
    <div className="bg-gray-500 border-black border rounded-lg m-4 p-4 shadow-xl flex justify-between flex-col">
      {/* Render each part of the tile */}
      <RiverHeader river={river} />
      <RiverBody river_id={river.river_id} />
      <RiverFooter river={river} />
    </div>
  );
}
