import { useModalContext } from "@/components/Context/modal";
import useAPI from "@/components/Hooks/useAPI";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect } from "react";
import River from "./River";

interface River {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function MapRivers({
  delta,
  update,
}: {
  delta: number;
  update: boolean;
}) {
  const { trigger, isMutating, data, error } = useAPI(`delta/${delta}/rivers`);
  const { configureModalStatus } = useModalContext();

  useEffect(() => {
    if (configureModalStatus) {
      trigger(["GET", {}]);
    }
  }, [configureModalStatus, update, trigger]);

  return data?.success ? (
    data.json.map((river: River) => (
      <River river={river} key={river.river_id} />
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
