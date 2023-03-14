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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

  // Register the form
  const {
    register,
    getValues,
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
    trigger: triggerRiver,
    isMutating: isMutatingRiver,
    data: river,
    error: errorRiver,
  } = useAPI(`river/${objectID}`);

  // If exists, load the data, otherwise, load the form empty
  useEffect(() => {
    if (stream?.code === 200) {
      console.log(stream?.json);
      reset(stream?.json);
    }
  }, [stream, reset]);

  // Handle on open
  useEffect(() => {
    if (status && mode === "edit") {
      console.log("river", objectID);
      trigger(["GET", {}]);
    }
  }, [status]);

  // Handle on close
  function onClose() {
    // setStatus(false);
    setStatus(false);
  }

  // Handle submit
  function handleClick() {
    if (mode === "add") {
      trigger(["POST", getValues()]);
    } else if (mode === "edit") {
      trigger(["PATCH", getValues()]);
    }
    if (stream?.code === 200) {
      setStatus(false);
    } else {
      console.log("fail");
      console.log(stream?.json);
      toast.error(stream?.json.message);
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
            {!stream && (
              <div>
                <Label htmlFor="Role">Role</Label>
                <Select {...register("role", { required: true })}>
                  <option value="client">Client</option>
                  <option value="server">Server</option>
                </Select>
              </div>
            )}
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
          {stream ? (
            <Button
              className="w-full"
              color="success"
              onClick={() => handleClick()}
            >
              Save
            </Button>
          ) : (
            <Button className="w-full" onClick={() => handleClick()}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
