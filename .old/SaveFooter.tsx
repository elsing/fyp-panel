import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { mutate } from "swr";

export default function SaveFooter({
  delta,
  setSaveData,
  formData,
}: {
  delta: number;
  setSaveData: Function;
  formData: object | undefined;
}) {
  // Handle modal save button

  const { trigger, isMutating, data, error } = useAPI(`delta/${delta}`);
  const { setConfigureModalStatus } = useModalContext();

  // When change in saveData, save the form data to the DB
  useEffect(() => {
    async function handleSave(formResult: object) {
      await trigger(["PATCH", formResult]);
      setConfigureModalStatus(false); // Close the modal
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/deltas`); // Refresh the deltas list
    }
    if (formData === undefined) return;
    handleSave(formData); // Save the form data to the DB
    setSaveData(false); // Allow form to saved again
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
