import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function GameOptions() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Choose Your Game
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* The Champion Game */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <Image
            src="/placeholder.svg"
            alt="The Champion Game"
            width={300}
            height={200}
            className="mb-4 rounded"
          />
          <h2 className="text-lg font-bold text-white mb-4">The Champion Game</h2>
          <Link href="/game-options/champion">
            <Button className="text-lg py-2 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white transition-all duration-300">
              Play Champion
            </Button>
          </Link>
        </div>

        {/* The Cautious Game */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <Image
            src="/placeholder.svg"
            alt="The Cautious Game"
            width={300}
            height={200}
            className="mb-4 rounded"
          />
          <h2 className="text-lg font-bold text-white mb-4">The Cautious Game</h2>
          <Link href="/game-options/cautious">
            <Button className="text-lg py-2 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white transition-all duration-300">
              Play Cautious
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
