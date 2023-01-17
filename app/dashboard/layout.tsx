export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Nav bar is going here...!
    <div>
      Header
      <body>{children}</body>
      Footer
    </div>
  );
}
