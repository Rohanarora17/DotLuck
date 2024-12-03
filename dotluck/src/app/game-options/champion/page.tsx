'use client'

import { useReadContract } from "wagmi";
import { readContract } from "wagmi/actions"
import { LOTTERY_ABI } from "@/constants";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { config } from "@/wagmi";
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Progress } from "../../components/ui/progress";

interface LotteryDetails {
  id: number;
  numWinners: number;
  minParticipants: bigint;
  maxParticipants: bigint;
  participationFee: bigint;
  minFee: bigint;
  isActive: boolean;
}

const contractAddress = "0xc23D6746858a451a592C95e39A87e7Ebc754eF71";

const LotteryList = () => {
  const { data: lotteryIdCounter, isLoading: isLoadingIds } = useReadContract({
    abi: LOTTERY_ABI,
    address: contractAddress,
    functionName: "lotteryIdCounter",
  });

  const [lotteries, setLotteries] = useState<LotteryDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lotteryIdCounter) {
      const fetchLotteries = async () => {
        const fetchedLotteries: LotteryDetails[] = [];
        for (let i = 1; i < Number(lotteryIdCounter); i++) {
          const data = await readContract(config, {
            abi: LOTTERY_ABI,
            address: contractAddress,
            functionName: "lotteries",
            args: [BigInt(i)],
          });

          if (data) {
            const [numWinners, minParticipants, maxParticipants, participationFee, minFee, isActive] = data;
            fetchedLotteries.push({
              id: i,
              numWinners,
              minParticipants,
              maxParticipants,
              participationFee,
              minFee,
              isActive,
            });
          }
        }
        setLotteries(fetchedLotteries);
        setIsLoading(false);
      };

      fetchLotteries();
    }
  }, [lotteryIdCounter]);

  const formatBigintToNumber = (value: bigint): string => {
    return value.toString();
  };

  if (isLoadingIds || isLoading) {
    return <p className="text-gray-400 text-center">Loading lotteries...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/game-options" className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Game Selection
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            Champion Lotteries
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose from our available Champion Lotteries. Each lottery offers unique rewards and challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lotteries.map((lottery) => (
            <Link 
              key={lottery.id}
              href={`champion/${lottery.id}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <Card className="w-full bg-[#232d3f] border-0 hover:bg-[#2a3649]">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Champion Lottery #{lottery.id}</h3>
                      <p className="text-xs text-gray-400">
                        Status: {' '}
                        <span className={lottery.isActive ? "text-green-400" : "text-red-400"}>
                          {lottery.isActive ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Number of Winners</p>
                      <p className="text-sm font-bold text-white">{lottery.numWinners}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Min Participants:</p>
                      <p className="text-sm font-bold text-white">{formatBigintToNumber(lottery.minParticipants)} xcDOT</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Max Participants</p>
                      <p className="text-sm font-bold text-white">{formatBigintToNumber(lottery.maxParticipants)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Participation Fee</p>
                      <p className="text-sm font-bold text-white">{formatBigintToNumber(lottery.participationFee)}</p>
                    </div>
                    <div>
                    <p>
                    <strong>Minimum Fee:</strong> {formatBigintToNumber(lottery.minFee)} xcDOT
                  </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Lottery Progress</p>
                    <Progress value={50} className="w-full h-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LotteryList;

