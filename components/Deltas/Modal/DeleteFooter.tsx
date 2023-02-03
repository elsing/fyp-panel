import useAPI from "@/components/Hooks/useAPI";
import { Button } from "flowbite-react";
import { useState } from "react";
import { mutate } from "swr";
import DeleteDeltaModal from "../DeleteDeltaModal";

export default function DeleteFooter({
  delta,
  setStatus,
}: {
  delta: number;
  setStatus: Function;
}) {
  // Handle delta delete button

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { trigger, isMutating, data, error } = useAPI(`delta/${delta}`);

  // Delete specified delta
  async function handleDelete() {
    await trigger(["DELETE", {}]);
    setShowDeleteModal(false);
    setStatus(false);
    mutate("https://api.singer.systems/deltas");
  }

  return (
    <div className="flex w-1/2">
      <DeleteDeltaModal
        status={showDeleteModal}
        setStatus={setShowDeleteModal}
        deleteDelta={handleDelete}
      />
      <Button
        color="failure"
        onClick={() => setShowDeleteModal(true)}
        className="w-full"
      >
        Delete
      </Button>
    </div>
  );
}
