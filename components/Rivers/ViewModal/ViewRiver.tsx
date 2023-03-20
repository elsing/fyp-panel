"use client";

import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import { Modal } from "flowbite-react";
import { useEffect } from "react";
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
  }, [status, trigger]);

  // Handle data arrival
  useEffect(() => {
    if (streams?.code !== 200) {
      toast.error(streams?.json.message);
      setStatus(false);
      setObjectID(0);
    }
  }, [streams, setStatus, setObjectID]);

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
