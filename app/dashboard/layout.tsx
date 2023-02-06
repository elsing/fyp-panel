import { cookies } from "next/headers";
import Redirect from "@/components/Navbar/AuthRedirect";
import RenderNavbar from "@/components/Navbar/Navbar";
import StatusContext from "@/components/Context/modal";
import Footer from "@/components/Shared/Footer";

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
        <div className="flex flex-col min-h-screen">
          <RenderNavbar />
          <StatusContext>
            <div className="">{children}</div>
          </StatusContext>
          <Footer />
        </div>
      </main>
    );
  } else {
    return <Redirect url="/login" />;
  }
}
