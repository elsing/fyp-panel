import { useModalContext } from "@/components/Context/modal";
import { Modal } from "flowbite-react";

export default function AddStream({ river_id }: { river_id: number }) {
  const { configureModalStatus, setConfigureModalStatus } = useModalContext();

  function onClose() {
    setConfigureModalStatus(false);
  }

  return (
    <div>
      <Modal show={configureModalStatus} onClose={onClose}>
        <Modal.Header>Add Stream</Modal.Header>
        <Modal.Body>
          <p>Add Stream</p>
        </Modal.Body>
        <Modal.Footer>
          <p>Footer</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
