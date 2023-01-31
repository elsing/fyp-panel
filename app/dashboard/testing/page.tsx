// "use client";

// import { fetcher } from "@/components/Fetcher";
// import { Button } from "flowbite-react";
// import useSWRMutation from "swr/mutation";
// import { useFlowsContext } from "../flows_context";
// import { useEffect } from "react";

// export default function Settings() {
//   const {
//     flows,
//     getFlows,
//     isMutating,
//   }: { flows: any; getFlows: Function; isMutating: boolean } =
//     useFlowsContext();

//   useEffect(() => {
//     if (flows) {
//       console.log("flows", flows);
//     }
//   }, [flows]);

//   return (
//     <main>
//       <p>Settings</p>
//       <Button onClick={() => getFlows()} disabled={isMutating}>
//         Make request
//       </Button>
//     </main>
//   );
// }
