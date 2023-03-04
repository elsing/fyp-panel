interface IRiver {
  river_id: number;
  delta_id: number;
  name: string;
  protocol: string;
}

export default function RiverHeader({ river }: { river: IRiver }) {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-xl">{river.name}</p>
        <div>
          <h2 className="flex items-center italic">
            Protocol: {river.protocol}
          </h2>
        </div>
      </div>
      <div className="w-full border-black border my-2"></div>
    </div>
  );
}
