import useAPI from "@/components/Hooks/useAPI";
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IStream {
  stream_id: number;
  river_id: number;
  flow_id: number;
  name: string;
  role: string;
  port: number;
  config: string;
  public_key: string;
  endpoint: string;
  tunnel: string;
  error: string;
  status: string;
}

export default function StreamBody({
  register,
  mode,
  flowID,
  setFlowID,
  stream,
}: {
  register: Function;
  mode: string;
  flowID: number | string;
  setFlowID: Function;
  stream: IStream;
}) {
  const [flowName, setFlowName] = useState<string>("");

  const {
    trigger: triggerFlow,
    isMutating: isMutatingFlow,
    data: flow,
    error: errorFlow,
  } = useAPI(`flow/${flowID}`);

  // When flow is set, load the flow name (replaces ID)
  useEffect(() => {
    triggerFlow(["GET", {}]);
  }, [flowID, triggerFlow]);

  // When request is done, set the flow name
  useEffect(() => {
    if (flow?.success) {
      setFlowName(flow?.json.name);
    }
  }, [flow, setFlowID]);

  return (
    <div>
      <h1 className="dark:text-white">
        {mode == "add"
          ? "Please fill in the required boxes."
          : stream.role == "server" &&
            "Servers cannot currently be edited. Please delete and re-add."}
      </h1>
      <form className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <TextInput
            type="text"
            {...register("name", { required: true, maxLength: 20 })}
          />
        </div>
        {mode == "add" && (
          <div>
            <Label htmlFor="Role">Role</Label>
            <Select {...register("role", { required: true })}>
              <option value="client">Client</option>
              <option value="server">Server</option>
            </Select>
          </div>
        )}
        <div>
          <Label htmlFor="Flow">Flow (where the VPN actually runs)</Label>
          {mode == "add" ? (
            <Select
              {...register("flow_id", {
                required: true,
              })}
            >
              {flow?.json?.map((flow: any) => {
                return (
                  <option
                    value={flow.flow_id}
                    key={flow.flow_id}
                    disabled={flow.locked}
                  >
                    {flow.name}
                  </option>
                );
              })}
            </Select>
          ) : (
            <TextInput
              placeholder={flowName}
              type="text"
              readOnly={true}
              // placeholder={flowName}
            />
          )}
        </div>
        <div>
          <Label htmlFor="Port">Port</Label>
          <TextInput
            type="number"
            defaultValue={51820}
            {...register("port", { required: true, maxLength: 5 })}
          />
        </div>
        <div>
          <Label htmlFor="IP">Internal Tunnel IP (Include CIDR)</Label>
          <TextInput
            type="text"
            {...register("ip", {
              required: true,
              maxLength: 18,
            })}
          />
        </div>
        <div>
          <Label htmlFor="Endpoint">Endpoint</Label>
          <TextInput
            type="text"
            {...register("endpoint", { required: true, maxLength: 15 })}
          />
        </div>
        <div>
          <Label htmlFor="Tunnel">Subnets to tunnel (comma seperated)</Label>
          <TextInput
            type="text"
            {...register("tunnel", { required: true, maxLength: 1000 })}
          />
        </div>
        {mode == "edit" && stream.error !== "" && (
          <div>
            <Label htmlFor="Error">An error is present...</Label>
            <Textarea
              color="failure"
              {...register("error", {
                required: true,
                maxLength: 1000,
              })}
              rows={4}
              readOnly={true}
            />
          </div>
        )}
        {mode == "edit" && (
          <div>
            <Label htmlFor="Config">Config (auto generated)</Label>
            <Textarea
              {...register("config", { required: true, maxLength: 1000 })}
              rows={6}
              readOnly={true}
            />
          </div>
        )}
      </form>
    </div>
  );
}
