"use client";

import { Button, Label, Select } from "flowbite-react";
import useSWR from "swr";
import { fetcher } from "@/components/Fetcher";
import { useForm } from "react-hook-form";

interface IDelta {
  delta_id: number;
  org_id: number;
  name: string;
  initiated: boolean;
}

type FormData = {
  delta: number;
};

export default function DeltaSelector({ setDelta }: { setDelta: Function }) {
  const { data } = useSWR(
    "https://api.singer.systems/deltas",
    (url: string) => fetcher(url, { arg: ["GET", {}] }),
    {
      suspense: true,
    }
  );

  const { register, handleSubmit } = useForm<FormData>();

  async function handleSelectDelta(formResult: FormData) {
    setDelta(formResult.delta);
  }

  return (
    <div>
      <Label>Select a Delta</Label>
      <form className="flex flex-row gap-2">
        <Select className="w-4/6" {...register("delta")}>
          {data?.success ? (
            data?.json.map((delta: IDelta) => {
              return (
                <option value={delta.delta_id} key={delta.delta_id}>
                  {delta.name}
                </option>
              );
            })
          ) : (
            <option key="nodeltas" value={0}>
              No Deltas
            </option>
          )}
        </Select>
        <Button className="w-2/6" onClick={handleSubmit(handleSelectDelta)}>
          Select
        </Button>
      </form>
    </div>
  );
}
