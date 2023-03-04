import { useModalContext } from "@/components/Context/modal";
import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddStream({ river_id }: { river_id: number }) {
  const { configureModalStatus, setConfigureModalStatus, objectID } =
    useModalContext();

  // Register the form
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch the streams
  //   const {
  //     trigger,
  //     isMutating,
  //     data: streams,
  //     error,
  //   } = useAPI(`river/${river_id}/streams`);

  //   // If exists, load the data, otherwise, load the form empty
  //   useEffect(() => {
  //     if (data?.code === 200) {
  //       reset(data?.json);
  //     }
  //   }, [data, reset]);

  // Handle on close
  function onClose() {
    setConfigureModalStatus(false);
  }

  useEffect(() => {
    if (configureModalStatus) {
      console.log("river", river_id);
      console.log("addmodal", objectID);
    }
  }, [objectID]);

  return (
    <div>
      <Modal show={configureModalStatus} onClose={onClose}>
        <Modal.Header>Add Stream</Modal.Header>
        <Modal.Body>
          <h1>Please fill in the required boxes.</h1>
        </Modal.Body>
        <Modal.Footer>
          <p>Save Button</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
