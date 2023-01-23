import Redirect from "@/components/authRedirect";
import styles from "@/components/pattern.module.css";
import { cookies } from "next/headers";

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

  if (hasAuth === false) {
    return <main className={styles.background}>{children}</main>;
  } else {
    return <Redirect url="/dashboard" />;
  }
}
