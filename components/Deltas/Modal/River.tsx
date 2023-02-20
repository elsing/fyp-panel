import { Button, TextInput } from "flowbite-react";

interface River {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function River({ river }: { river: River }) {
  // const { setDeleteModalStatus } = useModalContext();
  // const { setConfigureModalStatus } = useModalContext();
  // const { trigger, error } = useAPI(`rivers/${id}`);

  // async function handleDeleteRiver(id: number) {
  //   console.log("River_id", id);
  //   await trigger(["DELETE", { id: river.river_id }]);
  //   setConfigureModalStatus(false);
  // }

  return (
    <div>
      <div className="flex flex-row gap-2 my-2" key={"div" + river.river_id}>
        <TextInput
          type="text"
          defaultValue={river.name}
          key={"river" + river.river_id}
          className="flex w-5/6"
        />
        <TextInput
          type="text"
          defaultValue={river.protocol}
          readOnly={true}
          key={"protocol" + river.river_id}
          disabled={true}
          className="flex w-1/6"
        />
        {/* <Button
          color="failure"
          className="flex w-1/6"
          key={"delete" + river.river_id}
          data-key={river.river_id}
          // disabled={true}
          onClick={() => handleDeleteRiver(river.river_id)}
          // onClick={() => setDeleteModalStatus(true)}
        >
          Delete
        </Button> */}
      </div>
    </div>
  );
}
