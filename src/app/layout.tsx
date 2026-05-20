import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Lexora",
  description: "Advanced multilingual NLP intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en" suppressHydrationWarning>

      <body className={GeistSans.className}>

        <ThemeProvider>

          {children}

          <Toaster
            position="top-right"
            richColors
            theme="system"
          />

        </ThemeProvider>
      </body>
    </html>
  );
}