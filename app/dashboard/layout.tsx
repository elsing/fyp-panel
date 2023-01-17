import { cookies } from "next/headers";
import Redirect from "./noAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function Authenticated() {
    const cookiesList = cookies();
    const hasCookie = cookiesList.has("auth_token");
    return hasCookie;
  }

  const hasAuth: boolean = Authenticated();

  console.log("hasAuth", hasAuth);

  if (hasAuth) {
    return (
      <main>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </main>
    );
  } else {
    return <Redirect />;
  }
}
