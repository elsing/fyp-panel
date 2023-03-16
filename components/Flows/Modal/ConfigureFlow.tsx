"use client";

import { Modal } from "flowbite-react";
import { Suspense, useEffect, useState } from "react";
import DeleteModal from "../../Shared/DeleteModal";
import { useModalContext } from "../../Context/modal";
import FlowForm from "./FlowForm";
import SaveFooter from "@/components/Shared/Modal/SaveFooter";
import DeleteFooter from "../../Shared/Modal/DeleteFooter";

export default function ConfigureFlow({ flow }: { flow: number }) {
  const [formData, setFormData] = useState<object>({});
  const [saveData, setSaveData] = useState<boolean>(false);
  const { configureModalStatus, setConfigureModalStatus } = useModalContext();
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  // Close the modal
  function onClose() {
    setConfigureModalStatus(false);
  }

  return (
    <div>
      <DeleteModal
        status={deleteModalStatus}
        setStatus={setDeleteModalStatus}
        role="flows"
        role_key={flow}
        url="flows"
      />

      <Modal show={configureModalStatus} onClose={onClose}>
        <Modal.Header>Modify a Flow</Modal.Header>
        <Modal.Body>
          <Suspense fallback={<p>testing...!</p>}>
            <FlowForm
              flow={flow}
              saveData={saveData}
              setFormData={setFormData}
            />
          </Suspense>
        </Modal.Body>
        <Modal.Footer>
          <DeleteFooter data_key={flow} role="flows" />
          <SaveFooter
            data_key={flow}
            role="flows"
            setSaveData={setSaveData}
            formData={formData}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
