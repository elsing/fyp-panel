"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { Button, Modal, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import useAPI from "@/components/Hooks/useAPI";

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

  const { trigger, isMutating, data, error } = useAPI("deltas");

  useEffect(() => {
    if (data?.success && status) {
      toast.success("Delta created successfully");
    } else if (data) {
      toast.error("Delta creation failed");
    }
    onClose();
    // Only update when data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onClose() {
    setStatus(false);
    reset();
  }

  async function onSubmit(formResult: object) {
    setFormData(formResult);
    await trigger(["POST", formResult]);
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/deltas`);
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
