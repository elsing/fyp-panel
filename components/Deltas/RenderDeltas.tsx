"use client";

import { useEffect, useState } from "react";
import CreateDelta from "./Modal/CreateDelta";
import ConfigureDelta from "./Modal/ConfigureDelta";
import { fetcher } from "../Fetcher";
import useSWR from "swr";
import CreateButton from "../Shared/CreateButton";
import DeltaTile from "./DeltaTile";
import { useModalContext } from "@/components/Context/modal";

interface DeltaConfig {
  delta_id: number;
  org_id: number;
  name: string;
  initiated: boolean;
}

export default function RenderDeltas({
  deltas,
  empty,
}: {
  deltas: DeltaConfig[];
  empty: boolean;
}) {
  const [key, setKey] = useState<number>(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { setConfigureModalStatus } = useModalContext();
  const [showModifyModal, setShowModifyModal] = useState(false);

  function handleClick(id: number) {
    if (id !== 0) {
      setConfigureModalStatus(true);
    } else {
      setShowCreateModal(true);
    }
    setKey(id);
  }

  return (
    <div>
      <CreateDelta status={showCreateModal} setStatus={setShowCreateModal} />
      <ConfigureDelta delta={key} />
      <div className="w-screen grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-pink-500 ">
        <CreateButton handleClick={handleClick} />
        {/* If flows exist, map them */}
        {!empty &&
          deltas.map((delta, i) => {
            return (
              <DeltaTile
                delta={delta}
                handleClick={handleClick}
                key={"delta-tile" + i}
              />
            );
          })}
      </div>
    </div>
  );
}
