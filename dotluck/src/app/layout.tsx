"use client"
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "../app/components/headers";
import { BackgroundBeamsWithCollision } from "../app/components/ui/background-beams-with-collision";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { config } from "@/wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "DOTLUCK - Decentralized Lottery on Polkadot",
//   description: "Join the decentralized lottery on Polkadot and win big!",
// };
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
        <Header />
      
              <BackgroundBeamsWithCollision>
                <main className="relative z-10">{children}</main>
              </BackgroundBeamsWithCollision>
              </Providers>
      </body>
    </html>
   
  );
}
