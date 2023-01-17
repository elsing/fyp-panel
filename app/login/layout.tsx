import styles from "./pattern.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Login page
    <main className={styles.background}>{children}</main>
  );
}
