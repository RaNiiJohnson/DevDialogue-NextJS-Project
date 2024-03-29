import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Providers } from "@/components/utils/providers";
import { Footer } from "@/features/layout/Footer";
import { Header } from "@/features/layout/Header";
import { SiteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import "./globals.css";

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
              <div className="flex-1 w-full max-w-2xl min-h-[90vh] px-6 py-3 m-auto h-2/4 border-solid border-x max-sm:px-2">
                {children}
              </div>
              <Footer />
            </div>
            {modal}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
