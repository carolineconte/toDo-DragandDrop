import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EditTaskContextProvider } from '@/context/EditTaskContext'
import { TaskListContextProvider } from "@/context/TaskListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My to do List",
  description: "caroline conte project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
        <Header />
        <EditTaskContextProvider>
          <TaskListContextProvider>
            {children}
          </TaskListContextProvider>
        </EditTaskContextProvider>
        <Footer />
      </body>
    </html>
  );
}
