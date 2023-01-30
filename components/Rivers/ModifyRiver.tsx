"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "../Fetcher";
import DeleteRiverModal from "./DeleteRiverModal";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

export default function CreateRiver({
  status,
  setStatus,
  river,
}: {
  status: boolean;
  setStatus: Function;
  river: number | undefined;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // For defining the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // For setting or changing river data
  const { trigger, isMutating, data, error } = useSWRMutation(
    `https://api.singer.systems/rivers/${river}`,
    fetcher
  );

  // Close the modal
  function onClose() {
    setStatus(false);
  }

  // Handle model save button
  async function onSubmit(formResult: object) {
    await trigger(["PATCH", formResult]);
    setStatus(false);
    mutate("https://api.singer.systems/rivers");
  }

  // Handle river delete button
  async function handleDelete() {
    await trigger(["DELETE", {}]);
    setShowDeleteModal(false);
    setStatus(false);
    mutate("https://api.singer.systems/rivers");
  }

  // Set the modify modal form to the current river data
  useEffect(() => {
    if (data?.code === 200) {
      reset(data?.json);
    }
  }, [data, reset]);

  // Trigger the fetcher when the modal is opened
  useEffect(() => {
    // Don't trigger if the modal is closed
    if (!status) {
      return;
    }
    // If a river exists, trigger the fetcher
    if (river !== undefined) {
      trigger(["GET", {}]);
    }
  }, [status, river, trigger]);

  return (
    <div>
      <DeleteRiverModal
        status={showDeleteModal}
        setStatus={setShowDeleteModal}
        deleteRiver={handleDelete}
      />

      <Modal show={status} onClose={onClose}>
        <Modal.Header>Configure River</Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            ></form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={() => setShowDeleteModal(true)}
            className="flex w-1/2"
          >
            Delete
          </Button>
          <Button
            color="success"
            onClick={handleSubmit(onSubmit)}
            className="flex w-1/2"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
