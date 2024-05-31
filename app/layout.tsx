import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Navigation } from "@/components/navbar/page";
import { Toaster } from "@/components/ui/toaster";
import Background from "@/components/ui/background";

const inter = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "leaf",
  description: "A simple voting system to share with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary-2`}>
        <Background />
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
