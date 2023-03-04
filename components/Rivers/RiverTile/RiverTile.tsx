import AddStream from "@/components/Streams/AddModal/AddStream";
import DeleteModal from "../../Shared/DeleteModal";
import ViewRiver from "../ViewModal/ViewRiver";
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
  console.log("testing:", river);

  return (
    <div className="bg-gray-500 border-black border rounded-lg m-4 p-4 shadow-xl flex justify-between flex-col">
      {/* Initate Modals */}
      <div>
        <ViewRiver river_id={river.river_id} key={"viewbtn" + river.river_id} />
        <AddStream river_id={river.river_id} key={"addbtn" + river.river_id} />
        <DeleteModal
          role="rivers"
          role_key={river.river_id}
          url={`deltas/${river.delta_id}/rivers`}
        />
      </div>
      {/* Render each part of the tile */}
      <RiverHeader river={river} />
      <RiverBody river_id={river.river_id} />
      <RiverFooter river_id={river.river_id} />
    </div>
  );
}
