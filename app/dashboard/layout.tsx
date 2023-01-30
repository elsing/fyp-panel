import { cookies } from "next/headers";
import Redirect from "@/components/Navbar/AuthRedirect";
import RenderNavbar from "@/components/Navbar/Navbar";

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

  if (hasAuth) {
    return (
      <main className="dark:text-white">
        <RenderNavbar />
        {children}
        <footer>Footer</footer>
      </main>
    );
  } else {
    return <Redirect url="/login" />;
  }
}
