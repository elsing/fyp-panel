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
      <body className="bg-slate-300 dark:bg-gray-700">
        <main>
          <Provider>{children}</Provider>
          <Toast />
        </main>
      </body>
    </html>
  );
}
