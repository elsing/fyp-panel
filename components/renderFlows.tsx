"use client";

export interface FlowConfig {
  id: number;
  org_id: number;
  stream_id: number;
  name: string;
  protocol: string;
  port: number;
  status: string;
  to: string;
  // flows
}

export default function RenderFlows({ flows }: { flows: FlowConfig[] }) {
  console.log(flows);
  return (
    <div className="w-screen grid grid-cols-4 bg-pink-500 ">
      {flows.map((flow) => {
        {
          console.log(flow);
        }
        return (
          <div
            key={flow.id}
            className="flex flex-col bg-gray-500 border-black border rounded-lg m-4 p-4 h-40 shadow-xl"
          >
            <p>Name: {flow.name}</p>
            <p>Status: {flow.status}</p>
            <p>Protocol: {flow.protocol}</p>
            <p>Port: {flow.port}</p>
            <p>To: {flow.to}</p>
          </div>
        );
      })}
      <div className="bg-gray-500 border-black border rounded-lg m-4 p-4 h-40 shadow-xl flex flex-col">
        <div className="flex flex-col justify-center h-screen items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1 className="flex">Create</h1>
        </div>
      </div>
    </div>
  );
}
