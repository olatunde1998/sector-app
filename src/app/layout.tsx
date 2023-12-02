"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../app/components/navbar/Navbar";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <QueryClientProvider client={queryClient}>
        <body
          className={inter.className}
          style={{ backgroundColor: "#10172A" }}
        >
          <Navbar />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
