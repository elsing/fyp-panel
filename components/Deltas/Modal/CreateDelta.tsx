"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "../../Fetcher";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { Button, Modal, TextInput } from "flowbite-react";

export default function CreateDelta({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: Function;
}) {
  const [formData, setFormData] = useState<object>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { trigger, isMutating, data, error } = useSWRMutation(
    "https://api.singer.systems/deltas/",
    fetcher
  );

  function onClose() {
    setStatus(false);
    reset();
  }

  async function onSubmit(formResult: object) {
    setFormData(formResult);
    await trigger(["POST", formResult]);
    setStatus(false);
    reset();
    mutate("https://api.singer.systems/deltas");
  }

  return (
    <Modal show={status} onClose={onClose}>
      <Modal.Header>Create a delta</Modal.Header>
      <Modal.Body>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <TextInput
              type="text"
              placeholder="Name"
              {...register("name", { required: true, maxLength: 20 })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">A name is required</p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className="text-red-500">
                The name must be 20 characters or less.
              </p>
            )}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col w-full">
          <Button
            color="success"
            onClick={handleSubmit(onSubmit)}
            disabled={isMutating}
          >
            Create
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
