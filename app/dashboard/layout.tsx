import RenderNavbar from "@/components/Navbar/Navbar";
import StatusContext from "@/components/Context/modal";
import Footer from "@/components/Shared/Footer";
import AuthChecker from "@/components/Shared/AuthChecker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // function Authenticated() {
  //   const cookiesList = cookies();
  //   const hasCookie = cookiesList.has("auth_token");
  //   return hasCookie;
  // }

  // const hasAuth: boolean = Authenticated();
  return (
    <AuthChecker url="/login">
      <div className="flex flex-col min-h-screen dark:text-white">
        <RenderNavbar />
        <StatusContext>
          {children}
          {/* <div className="">{children}</div> */}
        </StatusContext>
        <Footer />
      </div>
    </AuthChecker>
  );
}
