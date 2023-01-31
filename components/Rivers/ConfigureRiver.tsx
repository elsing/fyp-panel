"use client";

import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "../Fetcher";
import DeleteRiverModal from "./DeleteRiverModal";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

export interface FlowConfig {
  flow_id: number;
  org_id: number;
  stream_id: number;
  name: string;
  status: string;
  description: string;
  monitor: boolean;
  api_key: string;
  locked: boolean;
}

export default function CreateRiver({
  status,
  setStatus,
  river,
}: // dataEmpty,
{
  status: boolean;
  setStatus: Function;
  river: number | undefined;
  // dataEmpty: boolean;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // For defining the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // For setting or changing river data
  const {
    trigger: trigRivers,
    isMutating: riverMutation,
    data: riverData,
    error: riverError,
  } = useSWRMutation(`https://api.singer.systems/rivers/${river}`, fetcher);

  const {
    trigger: trigFlows,
    isMutating: flowMutation,
    data: flowData,
    error: flowError,
  } = useSWRMutation("https://api.singer.systems/flows", fetcher);

  const {
    trigger: trigStreams,
    isMutating: streamMutation,
    data: streamData,
    error: streamError,
  } = useSWRMutation("https://api.singer.systems/streams", fetcher);

  // Close the modal
  function onClose() {
    setStatus(false);
  }

  // Handle model save button
  async function handleSave(formResult: object) {
    await trigRivers(["PATCH", formResult]);
    setStatus(false);
    mutate("https://api.singer.systems/rivers");
  }

  // Handle river delete button
  async function handleDelete() {
    await trigRivers(["DELETE", {}]);
    setShowDeleteModal(false);
    setStatus(false);
    mutate("https://api.singer.systems/rivers");
  }

  async function handleAddFlow(formResult: object) {
    await trigStreams(["POST", formResult]);
  }

  // Set the modify modal form to the current river data
  useEffect(() => {
    if (riverData?.code === 200) {
      reset(riverData?.json);
    }
  }, [riverData, reset]);

  // Trigger the fetcher when the modal is opened
  useEffect(() => {
    // Don't trigger if the modal is closed
    if (!status) {
      return;
    }
    // If a river exists, trigger the fetcher
    if (river !== undefined) {
      // mutate("https://api.singer.systems/flows");
      trigRivers(["GET", {}]);
      trigFlows(["GET", {}]);
      trigStreams(["GET", {}]);
    }
  }, [status, river, trigRivers, trigFlows, trigStreams]);

  return (
    <div>
      <DeleteRiverModal
        status={showDeleteModal}
        setStatus={setShowDeleteModal}
        deleteRiver={handleDelete}
      />

      <Modal show={status} onClose={onClose}>
        <Modal.Header>Configure River / Streams</Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(handleSave)}
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
                  <p>The name must be 20 characters or less.</p>
                )}
              </div>

              <Label htmlFor="flows">Flows avaliable</Label>
              <div className="flex flex-row gap-2">
                <Select
                  className="w-5/6"
                  id="flows"
                  {...register("flows", { required: true })}
                >
                  {flowData &&
                    flowData.json.map((flow: FlowConfig) => (
                      <>
                        {/* Render only flows that unlocked */}
                        {!flow.locked && (
                          <option key={flow.flow_id} data-key={flow.flow_id}>
                            {flow.name}
                          </option>
                        )}
                      </>
                    ))}
                </Select>
                <Button color="success" className="w-1/6">
                  Add
                </Button>
              </div>
            </form>
            <br />
            {!streamData && (
              <div>
                <Label>
                  <p>No flows added yet!</p>
                </Label>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={() => setShowDeleteModal(true)}
            className="flex w-1/2"
          >
            Delete
          </Button>
          <Button
            color="success"
            onClick={handleSubmit(handleDelete)}
            className="flex w-1/2"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
