"use client";

import { useState } from "react";
import RenderRivers from "@/components/Rivers/RenderRivers";
import DeltaSelector from "@/components/Rivers/DeltaSelector";

export default function Flows() {
  const [delta, setDelta] = useState<number>(0);

  return (
    <div>
      <div className="p-4 m-4">
        <h1 className="text-xl font-bold">Rivers / Streams</h1>
        <h2>These are the rivers that each contain connecting streams.</h2>
        <DeltaSelector setDelta={setDelta} />
      </div>
      <div>
        <RenderRivers delta={delta} />
      </div>
    </div>
  );
}
