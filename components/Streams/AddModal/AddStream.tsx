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
  const [flowName, setFlowName] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

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

  // Handle updating or saving
  useEffect(() => {
    if (updating && status) {
      if (stream?.success) {
        toast.success(`${stream?.json.message}`);
        setUpdating(false);
        onClose();
      } else if (mode == "edit") {
        toast.error(`Failed to update Stream: ${stream?.json.message}`);
      } else if (mode == "add") {
        toast.error(`Failed to add stream: ${stream?.json.message}`);
      }
      }
  }, [stream]);

  // If exists, load the data, otherwise, load the form empty
  useEffect(() => {
    if (status) {
      if (mode == "edit") {
        if (stream?.success && !updating) {
          reset(stream?.json);
          console.log("stream", stream);
          console.log("flow id to use", stream?.json.flow_id);
          setFlowID(stream?.json.flow_id);
      }
    }
  }
  }, [stream, reset]);

  // When flow is loaded, set the flow name (replaces ID)
  useEffect(() => {
    console.log("flow id", flowID);
    triggerFlow(["GET", {}]);
  }, [flowID, setFlowName]);

  // 
  useEffect(() => {
    if (flow?.code === 200) {
      console.log("flow", flow);
      setFlowName(flow?.json.name);
    }
  }, [flow, setFlowName]);

  // Handle on open
  useEffect(() => {
    if (status && mode == "edit") {
      trigger(["GET", {}]);
    } else if (status && mode == "add") {
      setFlowID("");
      triggerFlow(["GET", {}]);
    }
  }, [status]);

  // Handle on close
  function onClose() {
    // setStatus(false);
    reset();
    setStatus(false);
  }

  // Handle submit
  async function handleClick() {
    setValue("river_id", river_id);
    setUpdating(true);
    console.log("mode", mode);
    console.log("values", getValues());
    if (mode == "add") {
      await trigger(["POST", getValues()]);
    } else if (mode == "edit") {
      console.log("submitted");
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
            <h1 className="dark:text-white">
              {mode == "add" ? "Please fill in the required boxes." : stream?.json.role == "server" && "Servers cannot currently be edited. Please delete and re-add."}
            </h1>
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
              <Label htmlFor="Flow">Flow (where the VPN actually runs)</Label>
              {mode == "add" ? (
                <Select
                  {...register("flow_id", {
                    required: true,
                  })}
                >
                  {flow?.json?.map((flow: any) => {
                    return (
                      <option
                        value={flow.flow_id}
                        key={flow.flow_id}
                        disabled={flow.locked}
                      >
                        {flow.name}
                      </option>
                    );
                  })}
                </Select>
              ) : (
                <TextInput
                  placeholder={flowName}
                  type="text"
                  readOnly={true}
                  // placeholder={flowName}
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
            disabled={stream?.json.role == "server" ? true : false}
          >
            {mode == "add" ? "Add Stream" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
