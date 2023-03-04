import { useModalContext } from "@/components/Context/modal";
import { Modal } from "flowbite-react";

export default function ViewStream({ river_id }: { river_id: number }) {
  const { dataModalStatus, setDataModalStatus } = useModalContext();

  function onClose() {
    setDataModalStatus(false);
  }

  return (
    <div>
      <Modal show={dataModalStatus} onClose={onClose}>
        <Modal.Header>View River</Modal.Header>
        <Modal.Body>
          <p>View River</p>
        </Modal.Body>
        <Modal.Footer>
          <p>Footer</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
