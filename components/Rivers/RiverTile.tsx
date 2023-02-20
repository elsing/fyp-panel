"use client";

import { Button } from "flowbite-react";
import { useModalContext } from "../Context/modal";
import DeleteModal from "../Shared/DeleteModal";
import RenderStreams from "../Streams/RenderStreams";

interface IRiver {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function RiverTile({ river }: { river: IRiver }) {
  const { setDeleteModalStatus } = useModalContext();

  return (
    <div className="bg-gray-500 border-black border rounded-lg m-4 p-4 shadow-xl">
      <DeleteModal
        role="rivers"
        role_key={river.river_id}
        url={`deltasrivers/${river.delta_id}`}
      />
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-xl">{river.name}</p>
        <div>
          <div className="flex flex-row gap-2">
            <h2 className="flex items-center italic">
              Protocol: {river.protocol}
            </h2>
            <Button color="failure" onClick={() => setDeleteModalStatus(true)}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full border-black border my-2"></div>
      <RenderStreams />
    </div>
  );
}
