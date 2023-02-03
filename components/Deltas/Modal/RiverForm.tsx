"use client";

import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAPI from "../../Hooks/useAPI";
import RenderRivers from "./RenderRivers";

// There is prop drilling here, this needs to be reviewed.

export default function RiverForm({
  status,
  delta,
}: {
  status: boolean;
  delta: number;
}) {
  const { trigger, isMutating, data, error } = useAPI("rivers");
  const [update, setUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleAddRiver(formResult: object) {
    Object.assign(formResult, { delta_id: delta });
    console.log(formResult);
    await trigger(["POST", formResult]);
    reset();
    setUpdate(!update);
  }

  useEffect(() => {
    if (status) {
      reset();
    }
  }, [status, reset]);

  return (
    <div>
      <br />
      <form className="flex flex-col gap-2">
        <Label htmlFor="protocols">
          Here you can add rivers (groups of streams) to your delta.
        </Label>
        <div className="flex flex-row gap-2">
          <TextInput
            type="text"
            {...register("name", { required: true })}
            placeholder="Name for river."
            className="flex w-3/6"
          />
          <Select
            {...register("protocol", { required: true })}
            className="flex w-2/6"
          >
            <option value="wireguard">Wireguard</option>
            <option value="ipsec" disabled={true}>
              IPSec
            </option>
            <option value="openvpn" disabled={true}>
              OpenVPN
            </option>
          </Select>
          <Button
            color="success"
            className="flex w-1/6"
            onClick={handleSubmit(handleAddRiver)}
          >
            Add
          </Button>
        </div>
      </form>
      <br />
      <div>
        <Label htmlFor="rivers">Existing rivers in this delta.</Label>
        <br />
        <RenderRivers delta={delta} status={status} update={update} />
      </div>
    </div>
  );
}
