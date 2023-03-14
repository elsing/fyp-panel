"use client";

import StatusContext, { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import { Alert, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import RenderStreams from "./RenderStreams";
import { toast } from "react-toastify";

export default function ViewRiver({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: Function;
}) {
  const { setObjectID, objectID } = useModalContext();

  const {
    trigger,
    isMutating,
    data: streams,
    error,
  } = useAPI(`river/${objectID}/streams`);

  // Close the modal
  function onClose() {
    setStatus(false);
    setObjectID(0);
  }

  // Handle on open
  useEffect(() => {
    if (status) {
      trigger(["GET", {}]);
    }
  }, [status]);

  // Handle data arrival
  useEffect(() => {
    if (streams?.code !== 200) {
      toast.error(streams?.json.message);
      onClose();
    }
  }, [streams]);

  return (
    <div>
      {streams?.success && (
        <Modal show={status} onClose={onClose} size="5xl">
          <Modal.Header>View Streams</Modal.Header>
          <Modal.Body>
            {/* Got prop drilling here, but it's fine for now I guess */}
            <RenderStreams streams={streams.json} setStatus={setStatus} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
