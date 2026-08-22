import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "West African Fish Farm - Fish Farming & Aquaculture in Nigeria",
  description: "Direct exporter and supplier of Nigerian freshwater fish, exotic live specimens, polypterus, elephant nose, and African pikes.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#020203] text-zinc-100 min-h-screen antialiased selection:bg-yellow-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
