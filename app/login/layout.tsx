import styles from "./pattern.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Login page
    <body className={styles.background}>{children}</body>
  );
}
