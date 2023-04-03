import Redirect from "@/components/Navbar/AuthRedirect";
import styles from "@/components/pattern.module.css";
import AuthChecker from "@/components/Shared/AuthChecker";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthChecker url="/dashboard" reverse="y">
      <main className={styles.background}>{children}</main>
    </AuthChecker>
  );
}
