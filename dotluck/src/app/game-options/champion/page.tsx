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
  participants: string[];
}

const contractAddress = "0x6a7533d6D1C03B511A43191396b621a71c74a2e3";


// Function to calculate the progress as a percentage
const calculateProgress = (numParticipants: number, minParticipants: number, maxParticipants: number) => {
  // Return 0% progress if there are no participants or the lottery hasn't started
  if (numParticipants <= minParticipants) return 0;

  // If the number of participants is greater than or equal to maxParticipants, set progress to 100%
  if (numParticipants >= maxParticipants) return 100;

  // Calculate progress between minParticipants and maxParticipants
  const progress = ((numParticipants - minParticipants) / (maxParticipants - minParticipants)) * 100;

  // Return the progress, ensuring it stays within 0-100 range
  return Math.min(100, Math.max(0, progress));
};


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

          const participants = await readContract(config, {
            abi: LOTTERY_ABI,
            address: contractAddress,
            functionName: "getLotteryParticipants",
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
              participants: [...participants],
            });
          }
        }
        setLotteries(fetchedLotteries);
        setIsLoading(false);
      };

      fetchLotteries();
    }
  }, [lotteryIdCounter]);

  const formatBigintToNumbers = (value: bigint): string => {
    return value.toString();
  };


  const formatBigintToNumber = (value: bigint): string => {
    const divisor = BigInt(10 ** 10); // xcDOT token has 10 decimals
    const formattedValue = Number(value) / Number(divisor); // Convert to number and divide
    return formattedValue.toFixed(2); // Format to 2 decimal places
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
                          {lottery.isActive ? "Active" : "Completed"}
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
                      <p className="text-sm font-bold text-white">{formatBigintToNumbers(lottery.minParticipants)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Max Participants</p>
                      <p className="text-sm font-bold text-white">{formatBigintToNumbers(lottery.maxParticipants)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Ticket Price</p>
                      <p className="text-sm font-bold text-white">{formatBigintToNumber(lottery.participationFee)} xcDOT</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Total Participants</p>
                      <p className="text-sm font-bold text-white">{lottery.participants.length}</p>
                    </div>
                    <div>
                      {/* <p>
                    <strong>Minimum Fee:</strong> {formatBigintToNumber(lottery.minFee)} xcDOT
                  </p> */}
                    </div>
                  </div>
                  <div className="mt-2">
                    {lottery.isActive ? (
                      <>
                        <p className="text-xs text-gray-400 mb-1">Lottery Progress</p>
                        <Progress
                          value={calculateProgress(lottery.participants.length, Number(lottery.minParticipants), Number(lottery.maxParticipants))}

                          className="w-full h-2"
                        />
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-gray-400 mb-1">Lottery Completed</p>
                        <Progress value={100} className="w-full h-2" />
                      </>
                    )}
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

