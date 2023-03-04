import { useModalContext } from "@/components/Context/modal";
import { Button } from "flowbite-react";

export default function RiverFooter({ river_id }: { river_id: number }) {
  const {
    setDeleteModalStatus,
    setConfigureModalStatus,
    setDataModalStatus,
    setObjectID,
  } = useModalContext();

  return (
    <div>
      <div className="w-full border-black border my-2"></div>
      <div className="flex flex-row gap-2">
        <Button
          className="w-1/3"
          onClick={() => {
            setObjectID(river_id);
            setDataModalStatus(true);
          }}
        >
          View
        </Button>
        <Button
          className="w-1/3"
          color="success"
          onClick={() => {
            setObjectID(river_id);
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
