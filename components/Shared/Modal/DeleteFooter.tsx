import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import DeleteModal from "@/components/Shared/DeleteModal";
import { Button } from "flowbite-react";
import { useState } from "react";
import { mutate } from "swr";

export default function DeleteFooter({
  role,
  url,
}: {
  role: string;
  url: string;
}) {
  // Handle delete button
  const { objectID } = useModalContext();
  const [deleteModalStatus, setDeleteModalStatus] = useState<boolean>(false);

  return (
    <div className="flex w-1/2">
      <DeleteModal
        role={role}
        role_key={objectID}
        url={url}
        status={deleteModalStatus}
        setStatus={setDeleteModalStatus}
      />
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
