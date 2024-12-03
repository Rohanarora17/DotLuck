import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Trophy, Shield } from 'lucide-react';

export default function GameOptions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Choose Your Game
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Champion Game */}
          <Card className="bg-gray-800 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                The Champion Game
              </CardTitle>
              <CardDescription className="text-cyan-300">Low stake, high rewards</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <Image
                src="/Leonardo_Phoenix_A_middleaged_man_with_a_beaming_smile_and_tea_0.jpg"
                alt="The Champion Game"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-48 mb-4"
              />
              <p className="text-gray-300">
                Take a chance to win big with minimal risk. Perfect for those who dream of hitting the jackpot!
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/game-options/champion" className="w-full">
                <Button className="w-full text-lg py-2 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white transition-all duration-300">
                  Play Champion
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* The Cautious Game */}
          <Card className="bg-gray-800 border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-500" />
                The Cautious Game
              </CardTitle>
              <CardDescription className="text-blue-300">Zero loss, High Win</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <Image
                src="/Leonardo_Phoenix_so_i_need_another_image_where_all_the_people_0.jpg"
                alt="The Cautious Game"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-48 mb-4"
              />
              <p className="text-gray-300">
                A safe bet with guaranteed returns. Ideal for those who prefer steady gains without risking their stake.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/game-options/cautious" className="w-full">
                <Button className="w-full text-lg py-2 px-6 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-cyan-600 hover:to-blue-500 text-white transition-all duration-300">
                  Play Cautious
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

