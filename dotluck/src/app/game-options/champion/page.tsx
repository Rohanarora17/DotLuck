"use client";

import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { NO_LOSS_LOTTERY_ABI } from "@/constants";

const contractAddress = "0xb93545C7c85aa67C8Daf09fFCE41749178213485";
const abi = NO_LOSS_LOTTERY_ABI;

export default function ChampionGame() {
  const raffleStats = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getRaffleStats',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            The Champion Game
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Welcome to the Champion Game, where high stakes meet big rewards. This exclusive pool is designed for those who dare to dream big and play bigger. With a fixed maximum stake of $2.00, every player has an equal shot at glory. Are you ready to prove you're a true champion?
          </p>
        </div>

        <div className="space-y-6">
          <Link 
            href="/champions-pool"
            className="block transition-transform hover:scale-[1.02]"
          >
            <Card className="w-full bg-[#232d3f] border-0 hover:bg-[#2a3649]">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">Champion Pool</h3>
                      <span className="px-3 py-1 text-xs font-medium text-sky-400 bg-sky-400/10 rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-400">High stakes, high rewards</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Staked</p>
                    <p className="font-bold text-white">
                      {raffleStats.data ? formatUnits(raffleStats.data[1], 10) : '0'} xcDOT
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Maximum Stake</p>
                    <p className="font-bold text-white">$2.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/game-options" className="text-sky-400 hover:text-sky-300">
            Back to Game Selection
          </Link>
        </div>
      </div>
    </div>
  );
}

