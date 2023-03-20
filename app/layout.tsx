import Toast from "@/components/Shared/Toast";
import { Provider } from "@/components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="dark:bg-gray-800">
        <main>
          <Provider>{children}</Provider>
          <Toast />
        </main>
      </body>
    </html>
  );
}
