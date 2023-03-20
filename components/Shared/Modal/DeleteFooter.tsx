import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import DeleteModal from "@/components/Shared/DeleteModal";
import { Button } from "flowbite-react";
import { useState } from "react";
import { mutate } from "swr";

export default function DeleteFooter({
  data_key,
  role,
}: {
  data_key: number;
  role: string;
}) {
  // Handle delete button
  // const { setDeleteModalStatus } = useModalContext();
  const [deleteModalStatus, setDeleteModalStatus] = useState<boolean>(false);

  return (
    <div className="flex w-1/2">
      <DeleteModal
        role="flows"
        role_key={data_key}
        url="flows"
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
