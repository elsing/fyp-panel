interface IStream {
  stream_id: number;
  river_id: number;
  flow_id: number;
  name: string;
  role: string;
  port: number;
  config: string;
  tunnel: string;
  error: string;
}

export default function StreamTile({ stream }: { stream: IStream }) {
  return (
    <div className="flex flex-row gap-2">
      <p>{stream.name}</p>
      <p>{stream.role}</p>
      <p>{stream.port}</p>
    </div>
  );
}
