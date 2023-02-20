import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { mutate } from "swr";
import { flattenDiagnosticMessageText } from "typescript";

export default function SaveFooter({
  data_key,
  role,
  setSaveData,
  formData,
}: {
  data_key: number;
  role: string;
  setSaveData: Function;
  formData: object | undefined;
}) {
  // Handle modal save button

  const { trigger, isMutating, data, error } = useAPI(`${role}/${data_key}`);
  const { setConfigureModalStatus } = useModalContext();

  // When change in saveData, save the form data to the DB
  useEffect(() => {
    async function handleSave(formResult: object) {
      await trigger(["PATCH", formResult]);
      setConfigureModalStatus(false); // Close the modal
      mutate(`https://api.singer.systems/${role}`); // Refresh the list
    }
    if (data_key !== 0) {
      if (formData === undefined) return;
      handleSave(formData); // Save the form data to the DB
      setSaveData(false); // Allow form to saved again
    }
  }, [formData, trigger, setConfigureModalStatus, setSaveData, role]);

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
