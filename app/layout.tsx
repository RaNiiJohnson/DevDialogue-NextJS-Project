import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { Header } from "@/features/layout/Header";
import { SiteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" data-color-mode="dark">
        <head />
        <body className="h-full font-sans antialiased bg-background">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col h-full">
              <Header />
              <div className="flex-1 w-full h-full max-w-2xl px-6 py-3 m-auto border-solid border-x">
                {children}
              </div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
