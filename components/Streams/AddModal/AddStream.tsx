"use client";

import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import {
  Button,
  Label,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function AddStream({
  status,
  setStatus,
  mode,
  river_id,
}: {
  status: boolean;
  setStatus: Function;
  mode: string;
  river_id: number;
}) {
  const { objectID } = useModalContext();
  const [flowID, setFlowID] = useState<number | string>("");

  // Register the form
  const {
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch the stream
  const {
    trigger,
    isMutating,
    data: stream,
    error,
  } = useAPI(`stream/${objectID}`);

  const {
    trigger: triggerFlow,
    isMutating: isMutatingFlow,
    data: flow,
    error: errorFlow,
  } = useAPI(`flow/${flowID}`);

  // If exists, load the data, otherwise, load the form empty
  useEffect(() => {
    console.log("stream", stream);
    if (status) {
      if (mode == "edit") {
        if (stream?.success) {
          console.log("test");
          reset(stream?.json);
          setFlowID(stream?.json.flow_id);
          triggerFlow(["GET", {}]);
        } else {
          toast.error("Failed to load Stream details.");
        }
      }
      if (mode == "add") {
        if (stream?.success) {
          toast.success(`Successfully added stream`);
          onClose();
        } else {
          toast.error(`Failed to add stream: ${stream?.json.message}`);
        }
      }
    }
  }, [stream, reset]);

  // When stream is loaded, set the flow name (replaces ID)
  useEffect(() => {
    if (flow?.code === 200) {
      setValue("flow_id", flow?.json.name);
    }
  }, [flow, setValue]);

  // Handle on open
  useEffect(() => {
    if (status && mode === "edit") {
      trigger(["GET", {}]);
    } else if (status && mode === "add") {
      setFlowID("");
      triggerFlow(["GET", {}]);
    }
  }, [status]);

  // Handle on close
  function onClose() {
    // setStatus(false);
    setStatus(false);
    reset();
  }

  // Handle submit
  async function handleClick() {
    setValue("river_id", river_id);
    console.log("mode", mode);
    console.log("values", getValues());
    if (mode == "add") {
      await trigger(["POST", getValues()]);
    } else if (mode == "edit") {
      await trigger(["PATCH", getValues()]);
    }
  }

  return (
    <div>
      <Modal show={status} onClose={onClose}>
        <Modal.Header>
          {mode == "add" ? "Add Stream" : "View / Edit Stream"}
        </Modal.Header>
        <Modal.Body>
          {mode == "add" && (
            <h1 className="dark:text-white">
              Please fill in the required boxes.
            </h1>
          )}
          <form className="flex flex-col gap-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput
                type="text"
                {...register("name", { required: true, maxLength: 20 })}
              />
            </div>
            {mode == "add" && (
              <div>
                <Label htmlFor="Role">Role</Label>
                <Select {...register("role", { required: true })}>
                  <option value="client">Client</option>
                  <option value="server">Server</option>
                </Select>
              </div>
            )}
            <div>
              <Label htmlFor="Flow">Flow</Label>
              {mode == "add" ? (
                <Select>
                  {flow?.json?.map((flow: any) => {
                    return (
                      <option
                        value={flow.flow_id}
                        key={flow.flow_id}
                        disabled={flow.locked}
                        {...register("flow_id", { required: true })}
                      >
                        {flow.name}
                      </option>
                    );
                  })}
                </Select>
              ) : (
                <TextInput
                  type="text"
                  {...register("flow_id", { required: true })}
                  readOnly={true}
                />
              )}
            </div>
            <div>
              <Label htmlFor="Port">Port</Label>
              <TextInput
                type="number"
                defaultValue={51820}
                {...register("port", { required: true, maxLength: 5 })}
              />
            </div>
            <div>
              <Label htmlFor="IP">Internal Tunnel IP (Include CIDR)</Label>
              <TextInput
                type="text"
                {...register("ip", {
                  required: true,
                  maxLength: 18,
                })}
              />
            </div>
            <div>
              <Label htmlFor="Endpoint">Endpoint</Label>
              <TextInput
                type="text"
                {...register("endpoint", { required: true, maxLength: 15 })}
              />
            </div>
            <div>
              <Label htmlFor="Tunnel">
                Subnets to tunnel (comma seperated)
              </Label>
              <TextInput
                type="text"
                {...register("tunnel", { required: true, maxLength: 1000 })}
              />
            </div>
            {mode == "edit" && stream?.json.error !== "" && (
              <div>
                <Label htmlFor="Error">An error is present...</Label>
                <Textarea
                  color="failure"
                  {...register("error", {
                    required: true,
                    maxLength: 1000,
                  })}
                  rows={4}
                  readOnly={true}
                />
              </div>
            )}
            {mode == "edit" && (
              <div>
                <Label htmlFor="Config">Config (auto generated)</Label>
                <Textarea
                  {...register("config", { required: true, maxLength: 1000 })}
                  rows={6}
                  readOnly={true}
                />
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="w-full"
            color="success"
            onClick={() => handleClick()}
          >
            {mode == "add" ? "Add Stream" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
