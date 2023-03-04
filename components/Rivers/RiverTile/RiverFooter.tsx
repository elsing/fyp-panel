import { useModalContext } from "@/components/Context/modal";
import { Button } from "flowbite-react";
import ViewRiver from "../../Streams/ViewModal/ViewSteam";

export default function RiverFooter() {
  const { setDeleteModalStatus } = useModalContext();
  const { setConfigureModalStatus } = useModalContext();
  const { setDataModalStatus } = useModalContext();
  return (
    <div>
      <div className="w-full border-black border my-2"></div>
      <div className="flex flex-row gap-2">
        <Button className="w-1/3" onClick={() => setDataModalStatus(true)}>
          View
        </Button>
        <Button
          className="w-1/3"
          color="success"
          onClick={() => setConfigureModalStatus(true)}
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
