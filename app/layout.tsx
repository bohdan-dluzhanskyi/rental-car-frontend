import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "My Project",
  description: "Created with Next.js and TanStack Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
