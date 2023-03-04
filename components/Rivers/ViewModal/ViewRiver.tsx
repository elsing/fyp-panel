"use client";

import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import AddStream from "@/components/Streams/AddModal/AddStream";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import RenderStreams from "./RenderStreams";

export default function ViewRiver({ river_id }: { river_id: number }) {
  const { dataModalStatus, setDataModalStatus, objectID } = useModalContext();

  const {
    trigger,
    isMutating,
    data: streams,
    error,
  } = useAPI(`river/${objectID}/streams`);

  useEffect(() => {
    if (dataModalStatus) {
      trigger(["GET", {}]);
    }
  }, [dataModalStatus, trigger]);

  function onClose() {
    setDataModalStatus(false);
  }

  return (
    <div>
      <Modal show={dataModalStatus} onClose={onClose} size="7xl">
        <Modal.Header>View Streams</Modal.Header>
        <Modal.Body>
          {streams?.code === 200 ? (
            <RenderStreams streams={streams.json} />
          ) : (
            <p>There was an error loading the streams</p>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
          <p>Footer</p>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
