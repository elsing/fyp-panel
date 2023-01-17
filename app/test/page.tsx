// import Image from "next/image";
// import { Inter } from "@next/font/google";

// const inter = Inter({ subsets: ["latin"] });

import { cookies } from "next/headers";

export default function Cookies() {
  const nextCookies = cookies();
  return nextCookies.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ));
}

// export default function Home() {
//   return (
//     <main>
//       <h1>Test</h1>
//     </main>
//   );
// }
