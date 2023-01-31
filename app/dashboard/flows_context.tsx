// "use client";

// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { fetcher } from "@/components/Fetcher";
// import useSWRMutation from "swr/mutation";
// import useSWR from "swr";

// interface flowContextProps {
//   flows: object | undefined;
//   getFlows: () => void;
//   isMutating: boolean;
// }

// const FlowsContext = createContext<flowContextProps | undefined>(undefined);

// export const useFlowsContext = () => useContext(FlowsContext);

// function Test() {
//   const { data } = useSWR(
//     "https://api.singer.systems/flows",
//     (url: string) => fetcher(url, { arg: ["GET", {}] }),
//     {
//       suspense: true,
//     }
//   );
//   return { data };
// }

// export default function FlowsContextProvider({
//   children,
// }: PropsWithChildren<{}>) {
//   const [flows, setFlows] = useState<object | undefined>();

//   const { trigger, isMutating, data, error } = useSWRMutation(
//     "https://api.singer.systems/flows",
//     fetcher
//   );

//   function getFlows() {
//     setFlows(Test());
//     trigger(["GET", {}]);
//   }

//   useEffect(() => {
//     // setFlows(data);
//     console.log("flows activated", flows);
//   }, [flows]);

//   return (
//     <FlowsContext.Provider value={{ flows, getFlows, isMutating }}>
//       {children}
//     </FlowsContext.Provider>
//   );
// }
