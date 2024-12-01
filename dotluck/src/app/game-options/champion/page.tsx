"use client";

import { Button } from "../../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import championImage from "../../../../public/Leonardo_Phoenix_A_middleaged_man_with_a_beaming_smile_and_tea_0.jpg";

export default function ChampionGame() {
  return (
    <div className="container mx-auto px-0 py-0">
      <div className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image
              src={championImage}
              alt="Champion Game"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-transparent text-center bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                The Champion Game
              </h2>
              <p className="text-lg mb-8 text-white">
                Welcome to The Champion game! Here you can play for high stakes
                and big rewards. This is your chance to compete with the best
                and aim for life-changing wins. Are you ready to join the
                DOTLUCK Pool and prove you&apos;re a true champion?
              </p>
              <div className="px-6 pb-6 flex justify-center">
                <Link href="/pool">
                  <Button className="w-full md:w-auto justify-v text-lg py-2 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white transition-all duration-300">
                    Start Game
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/game-options" className="text-sky-400 hover:text-sky-300">
          Back to Game Selection
        </Link>
      </div>
    </div>
  );
}
