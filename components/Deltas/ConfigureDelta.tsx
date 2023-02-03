"use client";

import { Modal } from "flowbite-react";
import { useState } from "react";
import RiverForm from "./Modal/RiverForm";
import DeleteFooter from "./Modal/DeleteFooter";
import SaveFooter from "./Modal/SaveFooter";
import DeltaForm from "./Modal/DeltaForm";

export default function ConfigureDelta({
  status,
  setStatus,
  delta,
}: // dataEmpty,
{
  status: boolean;
  setStatus: Function;
  delta: number;
  // dataEmpty: boolean;
}) {
  // For saving the delta
  const [formData, setFormData] = useState(undefined);
  const [saveData, setSaveData] = useState(false);

  // For closing the modal
  function onClose() {
    setStatus(false);
  }

  return (
    <div>
      <Modal show={status} onClose={onClose}>
        <Modal.Header>Configure Delta / Streams</Modal.Header>
        <Modal.Body>
          <div>
            <DeltaForm
              delta={delta}
              status={status}
              saveData={saveData}
              setFormData={setFormData}
            />

            <RiverForm delta={delta} status={status} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <DeleteFooter delta={delta} setStatus={setStatus} />

          <SaveFooter
            delta={delta}
            setStatus={setStatus}
            setSaveData={setSaveData}
            formData={formData}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
