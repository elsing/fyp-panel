import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import DeleteModal from "@/components/Shared/DeleteModal";
import { Button } from "flowbite-react";
import { useState } from "react";
import { mutate } from "swr";

export default function DeleteFooter({ delta }: { delta: number }) {
  // Handle delta delete button

  const { trigger, isMutating, data, error } = useAPI(`delta/${delta}`);
  const { setDeleteModalStatus } = useModalContext();

  return (
    <div className="flex w-1/2">
      <DeleteModal role="deltas" role_key={delta} />
      <Button
        color="failure"
        onClick={() => setDeleteModalStatus(true)}
        className="w-full"
      >
        Delete
      </Button>
    </div>
  );
}
