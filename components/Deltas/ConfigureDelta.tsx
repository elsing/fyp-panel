"use client";

import { Modal } from "flowbite-react";
import { useState } from "react";
import RiverForm from "./Modal/RiverForm";
import DeleteFooter from "./Modal/DeleteFooter";
import SaveFooter from "./Modal/SaveFooter";
import DeltaForm from "./Modal/DeltaForm";
import { useModalContext } from "@/components/Context/modal";

export default function ConfigureDelta({ delta }: { delta: number }) {
  // For saving the delta
  const [formData, setFormData] = useState(undefined);
  const [saveData, setSaveData] = useState(false);
  const { deltaModalStatus, setDeltaModalStatus } = useModalContext();

  // For closing the modal
  function onClose() {
    setDeltaModalStatus(false);
  }

  return (
    <div>
      <Modal show={deltaModalStatus} onClose={onClose}>
        <Modal.Header>Configure Delta / Streams</Modal.Header>
        <Modal.Body>
          <div>
            <DeltaForm
              delta={delta}
              saveData={saveData}
              setFormData={setFormData}
            />

            <RiverForm delta={delta} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <DeleteFooter delta={delta} />

          <SaveFooter
            delta={delta}
            setSaveData={setSaveData}
            formData={formData}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
