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
import StreamBody from "./AddStreamBody";

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
  const [flowName, setFlowName] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);
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

  // If exists, load the data, otherwise, load the form empty
  useEffect(() => {
    if (status) {
      if (mode == "edit") {
        if (stream?.success && !updating) {
          reset(stream?.json);
          setFlowID(stream?.json.flow_id);
        }
      }
    }
    if (updating && status) {
      setUpdating(false);
      if (stream) {
        if (stream?.success) {
          toast.success(`${stream?.json.message}`);
          setStatus(false);
          reset();
        } else if (mode == "edit") {
          toast.error(`Failed to update Stream: ${stream?.json.message}`);
        } else if (mode == "add") {
          toast.error(`Failed to add stream: ${stream?.json.message}`);
        }
      }
    }
    // Update is not added to prevent double loading the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream, reset, status, mode, setFlowID, setStatus]);

  // Handle on open
  useEffect(() => {
    if (status && mode == "edit") {
      trigger(["GET", {}]);
    } else if (status && mode == "add") {
      setFlowID("");
    }
  }, [status, trigger, mode]);

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
    if (mode == "add") {
      await trigger(["POST", getValues()]);
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/rivers/${river_id}/streams`);
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
          {stream?.success || mode == "add" ? (
            <StreamBody
              register={register}
              mode={mode}
              flowID={flowID}
              setFlowID={setFlowID}
              stream={stream?.json}
            />
          ) : (
            <p>Unable to load stream data.</p>
          )}
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
