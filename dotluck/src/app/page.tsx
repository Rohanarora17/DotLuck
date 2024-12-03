import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../app/components/ui/button'
import polkadotlogo from "../../public/polkadot1.png"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-extrabold mb-4 text-white">Welcome to DOTLUCK</h1>
      <p className="text-4xl mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text font-bold">
        A Decentralized Lottery on Chain
      </p>
      <p className="text-2xl mb-8 text-purple-300 flex items-center justify-center gap-2">
        secured by{' '}
        <Image
          src={polkadotlogo}
          alt="Polkadot"
          width={120}
          height={30}
          className="inline-block"
        />
      </p>
      <div className="mb-8">
        <Link href="/game-options">
          <Button className="text-lg py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white transition-all duration-300">
            Try your luck 🍀
          </Button>
        </Link>
      </div>
      <p className="text-lg opacity-75 max-w-2xl mx-auto">
        Participate in a fair, transparent lottery using your DOT tokens. 
        Smart contracts ensure complete decentralization and trustlessness.
      </p>
    </div>
  )
}

