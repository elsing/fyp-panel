import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { mutate } from "swr";
import { flattenDiagnosticMessageText } from "typescript";

export default function SaveFooter({
  role,
  saveData,
  setSaveData,
  formData,
}: {
  role: string;
  saveData: boolean;
  setSaveData: Function;
  formData: object | undefined;
}) {
  // Handle modal save button

  const { setConfigureModalStatus, objectID } = useModalContext();
  const { trigger, isMutating, data, error } = useAPI(`${role}/${objectID}`);

  // When change in saveData, save the form data to the DB
  useEffect(() => {
    if (!saveData) return;
    async function handleSave(formResult: object) {
      await trigger(["PATCH", formResult]);
      setConfigureModalStatus(false); // Close the modal
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/${role}`); // Refresh the list
    }
    if (objectID !== 0) {
      if (formData === undefined) return;
      handleSave(formData); // Save the form data to the DB
      setSaveData(false); // Allow form to saved again
    }
  }, [
    formData,
    saveData,
    trigger,
    setConfigureModalStatus,
    setSaveData,
    role,
    objectID,
  ]);

  return (
    <Button
      color="success"
      onClick={() => setSaveData(true)}
      className="flex w-1/2"
    >
      Save
    </Button>
  );
}
