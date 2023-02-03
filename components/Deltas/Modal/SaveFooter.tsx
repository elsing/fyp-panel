import useAPI from "@/components/Hooks/useAPI";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { mutate } from "swr";

export default function SaveFooter({
  delta,
  setStatus,
  setSaveData,
  formData,
}: {
  delta: number;
  setStatus: Function;
  setSaveData: Function;
  formData: object;
}) {
  // Handle modal save button

  const { trigger, isMutating, data, error } = useAPI(`delta/${delta}`);

  // When change in saveData, save the form data to the DB
  useEffect(() => {
    async function handleSave(formResult: object) {
      await trigger(["PATCH", formResult]);
      console.log("formResult", formData);
      setStatus(false);
      mutate("https://api.singer.systems/deltas");
    }
    if (formData === undefined) return;
    handleSave(formData); // Save the form data to the DB
    setSaveData(false); // Allow form to saved again
  }, [formData, trigger, setStatus, setSaveData]);

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
