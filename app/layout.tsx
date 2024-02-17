import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { Providers } from "@/components/utils/providers";
import { Footer } from "@/features/layout/Footer";
import { Header } from "@/features/layout/Header";
import { SiteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" data-color-mode="dark">
      <head />
      <body className="h-full font-sans antialiased bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <div className="flex flex-col h-full border-solid border-x">
              <Header />
              <div className="flex-1 w-full max-w-2xl min-h-[90vh] px-6 py-3 m-auto h-2/4 border-solid border-x">
                {children}
              </div>
              <Footer />
            </div>
            {modal}
          </Providers>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
