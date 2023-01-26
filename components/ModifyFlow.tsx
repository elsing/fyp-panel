"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "./fetcher";

export default function ModifyModal({
  status,
  setStatus,
  key,
}: {
  status: boolean;
  setStatus: Function;
  key: number;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (formData) => console.log(formData);

  function onClose() {
    setStatus(false);
  }

  const { data } = useSWR("https://api.singer.systems/flows", fetcher, {
    suspense: true,
  });

  useEffect(() => {
    reset();
    if (data?.success) {
      setFlows(data.json);
      console.log("data:", data.json);
    } else {
      if (data?.code === 401) {
        window.location.href = "/login";
      }
      setFlows({ loaded: false });
      console.log("else...!", data?.json);
    }
  }, [reset, status]);

  return (
    <Modal show={status} onClose={onClose}>
      <Modal.Header>Modify a flow</Modal.Header>
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
                {...register("name", { required: true, maxLength: 50 })}
              />
              {errors.name?.type === "required" && (
                <p role="alert">A name is required!</p>
              )}
              {errors.name?.type === "maxLength" && (
                <p>The name must be 50 characters or less.</p>
              )}
              <Textarea
                {...register("description", { required: true, maxLength: 255 })}
                rows={4}
              />
              {errors.description?.type === "maxLength" && (
                <p>The name must be 255 characters or less.</p>
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
        <div className="flex flex-col justify-center w-full">
          <Button color="success" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
function useSWR(
  arg0: string,
  fetcher: any,
  arg2: { suspense: boolean }
): { data: any } {
  throw new Error("Function not implemented.");
}
