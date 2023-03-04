"use client";

import { useModalContext } from "@/components/Context/modal";
import { Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAPI from "../../Hooks/useAPI";

export default function FlowForm({
  flow,
  saveData,
  setFormData,
}: {
  flow: number;
  saveData: boolean;
  setFormData: Function;
}) {
  // Set up vars
  const { trigger, isMutating, data, error } = useAPI(`flows/${flow}`);
  const { configureModalStatus } = useModalContext();
  // Register the form
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

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
    <div>
      <form className="flex flex-col gap-2">
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
            <p>The name must be 20 characters or less.</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description", {
              required: true,
              maxLength: 255,
            })}
            rows={4}
          />
          {errors.description?.type === "maxLength" && (
            <p>The description must be 255 characters or less.</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox {...register("monitor")} />
          <Label htmlFor="monitor">Monitor?</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox {...register("locked")} />
          <Label htmlFor="locked">Locked? (Make unavaliable to Streams)</Label>
        </div>

        <div>
          <Label htmlFor="api_key">API Key</Label>
          <TextInput
            className="select-all"
            readOnly={true}
            {...register("api_key")}
          />
        </div>
      </form>
    </div>
  );
}
