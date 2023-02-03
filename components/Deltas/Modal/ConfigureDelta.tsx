"use client";

import { Modal } from "flowbite-react";
import { useState } from "react";
import RiverForm from "./RiverForm";
import DeltaForm from "./DeltaForm";
import { useModalContext } from "@/components/Context/modal";
import SaveFooter from "@/components/Shared/Modal/SaveFooter";
import DeleteFooter from "@/components/Shared/Modal/DeleteFooter";

export default function ConfigureDelta({ delta }: { delta: number }) {
  // For saving the delta
  const [formData, setFormData] = useState(undefined);
  const [saveData, setSaveData] = useState(false);
  const { configureModalStatus, setConfigureModalStatus } = useModalContext();

  // For closing the modal
  function onClose() {
    setConfigureModalStatus(false);
  }

  return (
    <div>
      <Modal show={configureModalStatus} onClose={onClose}>
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
          <DeleteFooter data_key={delta} role="deltas" />
          <SaveFooter
            data_key={delta}
            role="deltas"
            setSaveData={setSaveData}
            formData={formData}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
