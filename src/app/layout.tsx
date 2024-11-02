import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"
import NavbarWrapper from "@/components/navigation/navbar-wrapper";
import "./globals.css";

const opensans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIAIO",
  description: "Turning designs and simple logic into prototypes, quickly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${opensans.className} antialiased`}
      >
        {children}
        <NavbarWrapper />
      </body>
    </html>
  );
}
