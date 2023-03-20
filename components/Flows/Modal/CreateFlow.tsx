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
import { fetcher } from "../../Fetcher";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { toast } from "react-toastify";
import useAPI from "@/components/Hooks/useAPI";

export default function CreateModal({
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

  const { trigger, isMutating, data, error } = useAPI("flows")

  useEffect(() => {
    if (data?.success) {
      toast.success("Flow created successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  }, [data]);

  function onClose() {
    setStatus(false);
    reset();
  }

  async function onSubmit(formResult: object) {
    setFormData(formResult);
    await trigger(["POST", formResult]);
    setStatus(false);
    reset();
    mutate("https://api.singer.systems/flows");
  }

  return (
    <Modal show={status} onClose={onClose}>
      <Modal.Header>Create a flow</Modal.Header>
      <Modal.Body>
        <Suspense fallback={<p>testing...!</p>}>
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
              <Textarea
                {...register("description", { required: true, maxLength: 255 })}
                rows={4}
                placeholder="Description"
              />
              {errors.description?.type === "maxLength" && (
                <p>The description must be 255 characters or less.</p>
              )}
              <div className="flex items-center gap-2">
                <Checkbox {...register("monitor", {})} />
                <Label htmlFor="promotion">Monitor?</Label>
              </div>

              {/* <input type="submit" /> */}
            </form>
          </div>
        </Suspense>
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
