import useAPI from "@/components/Hooks/useAPI";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect } from "react";

interface River {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function RenderRivers({
  delta,
  status,
  update,
}: {
  delta: number;
  status: boolean;
  update: boolean;
}) {
  const { trigger, isMutating, data, error } = useAPI(`deltarivers/${delta}`);

  useEffect(() => {
    if (status) {
      console.log("useEffect");
      trigger(["GET", {}]);
    }
  }, [status, update, trigger]);

  return data?.success ? (
    data?.json.map((river: River) => (
      <>
        <div className="flex flex-row gap-2 my-2" key={"div" + river.river_id}>
          <TextInput
            type="text"
            defaultValue={river.name}
            key={"river" + river.river_id}
            className="flex w-4/6"
          />
          <TextInput
            type="text"
            defaultValue={river.protocol}
            readOnly={true}
            key={"protocol" + river.river_id}
            disabled={true}
            className="flex w-1/6"
          />
          <Button
            color="failure"
            className="flex w-1/6"
            key={"delete" + river.river_id}
          >
            Delete
          </Button>
        </div>
      </>
    ))
  ) : (
    <>
      <div>
        <Alert color="warning" withBorderAccent={true}>
          Currently no rivers exist in this Delta. You can add rivers in the
          form above.
        </Alert>
      </div>
    </>
  );
}
