import { useModalContext } from "@/components/Context/modal";
import { Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAPI from "../../Hooks/useAPI";

export default function DeltaForm({
  saveData,
  setFormData,
}: {
  saveData: boolean;
  setFormData: Function;
}) {
  // Register the form
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { configureModalStatus, objectID } = useModalContext();
  const { trigger, isMutating, data, error } = useAPI(`delta/${objectID}`);

  // When the data is loaded, load the flow details
  useEffect(() => {
    if (data?.code === 200) {
      reset(data?.json);
    }
  }, [data, reset]);

  // Trigger the fetcher when the modal is opened
  useEffect(() => {
    if (configureModalStatus) {
      trigger(["GET", {}]);
    }
  }, [configureModalStatus, trigger]);

  // When user clicks save, set the form data
  useEffect(() => {
    if (saveData) {
      setFormData(getValues());
    }
  }, [saveData, setFormData, getValues]);

  return (
    <form
      // onSubmit={handleSubmit(handleSave)}
      className="flex flex-col gap-2"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <TextInput
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name?.type === "required" && (
          <p role="alert">A name is required!</p>
        )}
        {errors.name?.type === "maxLength" && (
          <p role="alert">The name must be 20 characters or less.</p>
        )}
      </div>
    </form>
  );
}
