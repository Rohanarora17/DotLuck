import { Button } from "../../components/ui/button"
import Link from 'next/link'

export default function ChampionGame() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
        The Champion Game
      </h1>
      <p className="text-lg mb-8 text-white">
        Welcome to The Champion game! Here you can play for high stakes and big rewards.
      </p>
      <Button className="text-lg py-2 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white transition-all duration-300">
        Start Game
      </Button>
      <div className="mt-8">
        <Link href="/game" className="text-sky-400 hover:text-sky-300">
          Back to Game Selection
        </Link>
      </div>
    </div>
  )
}

