import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function CautiousGame() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        The Cautious Game
      </h1>
      <p className="text-lg mb-8 text-white">
        Welcome to The Cautious game! Here you can play with lower stakes and more frequent rewards.
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
