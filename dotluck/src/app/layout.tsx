import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '../app/components/headers'
import { BackgroundBeamsWithCollision } from "../app/components/ui/background-beams-with-collision"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DOTLUCK - Decentralized Lottery on Polkadot',
  description: 'Join the decentralized lottery on Polkadot and win big!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Header />
        <BackgroundBeamsWithCollision>
          <main className="relative z-10">
            {children}
          </main>
        </BackgroundBeamsWithCollision>
      </body>
    </html>
  )
}

