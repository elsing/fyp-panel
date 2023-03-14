import { useModalContext } from "@/components/Context/modal";
import DeleteModal from "@/components/Shared/DeleteModal";
import AddStream from "@/components/Streams/AddModal/AddStream";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import ViewRiver from "../ViewModal/ViewRiver";

interface IRiver {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function RiverFooter({ river }: { river: IRiver }) {
  const [dataModalStatus, setDataModalStatus] = useState(false);
  const [configureModalStatus, setConfigureModalStatus] = useState(false);

  const { setDeleteModalStatus, setObjectID } = useModalContext();

  return (
    <div>
      {/* Initate Modals */}
      <div>
        <ViewRiver status={dataModalStatus} setStatus={setDataModalStatus} />
        <AddStream
          status={configureModalStatus}
          setStatus={setConfigureModalStatus}
          mode={"add"}
          river_id={river.river_id}
        />
        <DeleteModal
          role="rivers"
          role_key={river.river_id}
          url={`deltas/${river.delta_id}/rivers`}
        />
      </div>
      <div className="w-full border-black border my-2"></div>
      <div className="flex flex-row gap-2">
        <Button
          className="w-1/3"
          onClick={() => {
            setObjectID(river.river_id);
            setDataModalStatus(true);
          }}
        >
          View
        </Button>
        <Button
          className="w-1/3"
          color="success"
          onClick={() => {
            setObjectID(river.river_id);
            setConfigureModalStatus(true);
          }}
        >
          Add
        </Button>
        <Button
          className="w-1/3"
          color="failure"
          onClick={() => setDeleteModalStatus(true)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
