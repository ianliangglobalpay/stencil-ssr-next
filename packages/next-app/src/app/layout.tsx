import type { Metadata } from "next";
import "./globals.css";
import { StencilReloader } from "./components/StencilReloader";

export const metadata: Metadata = {
  title: "Stencil + Next.js Integration",
  description:
    "A minimal reproduction for testing Stencil components with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StencilReloader />
        {children}
      </body>
    </html>
  );
}
