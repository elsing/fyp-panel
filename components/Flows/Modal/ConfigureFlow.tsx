"use client";

import { Modal } from "flowbite-react";
import { Suspense, useEffect, useState } from "react";
import DeleteModal from "../../Shared/DeleteModal";
import { useModalContext } from "../../Context/modal";
import FlowForm from "./FlowForm";
import SaveFooter from "@/components/Shared/Modal/SaveFooter";
import DeleteFooter from "../../Shared/Modal/DeleteFooter";

export default function ConfigureFlow() {
  const [formData, setFormData] = useState<object>({});
  const [saveData, setSaveData] = useState<boolean>(false);
  const { configureModalStatus, setConfigureModalStatus, objectID } = useModalContext();
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  // Close the modal
  function onClose() {
    setConfigureModalStatus(false);
  }

  return (
    <div>
      {/* <DeleteModal
        status={deleteModalStatus}
        setStatus={setDeleteModalStatus}
        role="flows"
        role_key={flow}
        url="flows"
      /> */}

      <Modal show={configureModalStatus} onClose={onClose}>
        <Modal.Header>Modify a Flow</Modal.Header>
        <Modal.Body>
          <Suspense fallback={<p>testing...!</p>}>
            <FlowForm
              saveData={saveData}
              setFormData={setFormData}
            />
          </Suspense>
        </Modal.Body>
        <Modal.Footer>
          <DeleteFooter />
          <SaveFooter
            role="flows"
            saveData={saveData}
            setSaveData={setSaveData}
            formData={formData}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
