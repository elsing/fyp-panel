"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "../Fetcher";
import DeleteFlowModal from "./DeleteFlowModal";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

export default function ModifyModal({
  status,
  setStatus,
  flow,
}: {
  status: boolean;
  setStatus: Function;
  flow: number | undefined;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // For defining the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // For setting or changing flow data
  const { trigger, isMutating, data, error } = useSWRMutation(
    `https://api.singer.systems/flows/${flow}`,
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
    mutate("https://api.singer.systems/flows");
  }

  // Handle flow delete button
  async function handleDelete() {
    await trigger(["DELETE", {}]);
    setShowDeleteModal(false);
    setStatus(false);
    mutate("https://api.singer.systems/flows");
  }

  // Set the modify modal form data to the current flow data
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
    // If the flow is defined, trigger the fetcher
    if (flow !== undefined) {
      trigger(["GET", {}]);
    }
  }, [status, flow, trigger]);

  return (
    <div>
      <DeleteFlowModal
        status={showDeleteModal}
        setStatus={setShowDeleteModal}
        deleteFlow={handleDelete}
      />

      <Modal show={status} onClose={onClose}>
        <Modal.Header>Modify a Flow</Modal.Header>
        <Modal.Body>
          <Suspense fallback={<p>testing...!</p>}>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div>
                  <Label htmlFor="name">Name</Label>
                  <TextInput
                    type="text"
                    {...register("name", { required: true, maxLength: 20 })}
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert">A name is required!</p>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <p>The name must be 20 characters or less.</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    {...register("description", {
                      required: true,
                      maxLength: 255,
                    })}
                    rows={4}
                  />
                  {errors.description?.type === "maxLength" && (
                    <p>The description must be 255 characters or less.</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox {...register("monitor")} />
                  <Label htmlFor="monitor">Monitor?</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox {...register("locked")} />
                  <Label htmlFor="locked">
                    Locked? (Make unavaliable to rivers)
                  </Label>
                </div>

                <div>
                  <Label htmlFor="api_key">API Key</Label>
                  <TextInput
                    className="select-all"
                    readOnly={true}
                    {...register("api_key")}
                  />
                </div>
              </form>
            </div>
          </Suspense>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row justify-center w-full gap-2">
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
              disabled={isMutating}
              className="flex w-1/2"
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
