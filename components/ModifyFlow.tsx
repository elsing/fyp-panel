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
import { fetcher } from "./fetcher";
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
  const [formData, setFormData] = useState<object>({});
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
    setFormData(formResult);
    await trigger(["PATCH", formResult]);
    setStatus(false);
    mutate("https://api.singer.systems/flows");
  }

  async function handleDelete() {
    await trigger(["DELETE", {}]);
    console.log("Deleted!");
    setShowDeleteModal(false);
    setStatus(false);
    mutate("https://api.singer.systems/flows");
  }

  // Set the modal form data to the flow data
  useEffect(() => {
    if (data?.code === 200) {
      reset(data?.json);
    }
  }, [data, reset]);

  // Trigger the fetcher when the modal is opened
  useEffect(() => {
    if (!status) {
      return;
    }
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
        <Modal.Header>Modify a flow</Modal.Header>
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
                    {...register("name", { required: true, maxLength: 50 })}
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert">A name is required!</p>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <p>The name must be 50 characters or less.</p>
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
                    <p>The name must be 255 characters or less.</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox {...register("monitor")} />
                  <Label htmlFor="monitor">Monitor?</Label>
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
              color="success"
              onClick={handleSubmit(onSubmit)}
              disabled={isMutating}
              className="flex w-1/2"
            >
              Save
            </Button>
            <Button
              color="failure"
              onClick={() => setShowDeleteModal(true)}
              className="flex w-1/2"
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
