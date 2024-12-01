"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "../app/components/headers";
import { BackgroundBeamsWithCollision } from "../app/components/ui/background-beams-with-collision";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Providers>
          <QueryClientProvider client={queryClient}>
            <Header />
            <BackgroundBeamsWithCollision>
              <main className="relative z-10">{children}</main>
            </BackgroundBeamsWithCollision>
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
