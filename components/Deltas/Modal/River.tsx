import { useModalContext } from "@/components/Context/modal";
import DeleteModal from "@/components/Shared/DeleteModal";
import { Button, TextInput } from "flowbite-react";

interface River {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function River({ river }: { river: River }) {
  const { setDeleteModalStatus } = useModalContext();

  return (
    <div>
      <div className="flex flex-row gap-2 my-2" key={"div" + river.river_id}>
        <TextInput
          type="text"
          defaultValue={river.name}
          key={"river" + river.river_id}
          className="flex w-4/6"
        />
        <TextInput
          type="text"
          defaultValue={river.protocol}
          readOnly={true}
          key={"protocol" + river.river_id}
          disabled={true}
          className="flex w-1/6"
        />
        <Button
          color="failure"
          className="flex w-1/6"
          key={"delete" + river.river_id}
          disabled={true}
          onClick={() => setDeleteModalStatus(true)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
