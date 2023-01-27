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
import useSWR from "swr";

export default function ModifyModal({
  status,
  setStatus,
  flow,
}: {
  status: boolean;
  setStatus: Function;
  flow: number | undefined;
}) {
  const [method, setMethod] = useState("GET");
  const [formData, setFormData] = useState<object>({});
  const [trigger, setTrigger] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onClose() {
    setStatus(false);
    reset();
  }

  const { data } = useSWR(
    trigger ? `https://api.singer.systems/flows/${flow}` : null,
    (url: string) => fetcher(url, method, { formData }),
    {
      suspense: true,
    }
  );

  function onSubmit(formResult: object) {
    setMethod("POST");
    setFormData(formResult);
    setTrigger(true);
    console.log("data:", data);
    setStatus(false);
  }

  useEffect(() => {
    if (!status) {
      return;
    }
    if (flow !== undefined) {
      console.log("called");
      setMethod("GET");
      setTrigger(true);
      console.log("data:", data?.json);
    }
  }, [status, flow, data]);

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
                defaultValue={data?.json?.name}
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
                defaultValue={data?.json?.description}
              />
              {errors.description?.type === "maxLength" && (
                <p>The name must be 255 characters or less.</p>
              )}
              <div className="flex items-center gap-2">
                <Checkbox
                  {...register("monitor", {})}
                  checked={data?.json ? data?.json.monitor : false}
                />
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
