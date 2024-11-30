import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function CautiousGame() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        The Cautious Game
      </h1>
      <p className="text-lg mb-8 text-white">
      "Always leave with something, our No-Loss Lottery guarantees you never lose money, with a 100% zero-loss rate every time you play!"
      </p>
      <Button className="text-lg py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white transition-all duration-300">
        Start Game
      </Button>
      <div className="mt-8">
        <Link href="/game-options">
          Back to Game Selection
        </Link>
      </div>
    </div>
  );
}
