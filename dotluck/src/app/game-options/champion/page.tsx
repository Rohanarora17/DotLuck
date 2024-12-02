"use client";

import { useReadContract } from "wagmi";
import {readContract} from "wagmi/actions"
import { LOTTERY_ABI } from "@/constants";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { config } from "@/wagmi";

interface LotteryDetails {
  id: number;
  numWinners: number;
  minParticipants: bigint;
  maxParticipants: bigint;
  participationFee: bigint;
  minFee: bigint;
  isActive: boolean;
}

const contractAddress = "0xc23D6746858a451a592C95e39A87e7Ebc754eF71"; // Replace with your contract address

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
          const data = await readContract(config,{
            abi: LOTTERY_ABI,
            address: contractAddress,
            functionName: "lotteries",
            args: [BigInt(i)],
          });

          if (data) {
            const [numWinners, minParticipants, maxParticipants, participationFee, minFee, isActive] =
              data;

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
    return value.toString(); // Adjust formatting for decimals if needed
  };

  if (isLoadingIds || isLoading) {
    return <p className="text-gray-400 text-center">Loading lotteries...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Available Lotteries</h1>
        <div className="space-y-6">
          {lotteries.map((lottery) => (
            <Card key={lottery.id} className="bg-[#232d3f] border-0 hover:bg-[#2a3649]">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">Lottery #{lottery.id}</h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium ${
                      lottery.isActive
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    } rounded-full`}
                  >
                    {lottery.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mt-4 text-gray-400 space-y-2">
                  <p>
                    <strong>Number of Winners:</strong> {lottery.numWinners}
                  </p>
                  <p>
                    <strong>Min Participants:</strong> {formatBigintToNumber(lottery.minParticipants)}
                  </p>
                  <p>
                    <strong>Max Participants:</strong> {formatBigintToNumber(lottery.maxParticipants)}
                  </p>
                  <p>
                    <strong>Participation Fee:</strong> {formatBigintToNumber(lottery.participationFee)} xcDOT
                  </p>
                  <p>
                    <strong>Minimum Fee:</strong> {formatBigintToNumber(lottery.minFee)} xcDOT
                  </p>
                </div>
                <Link
                  href={`/lottery/${lottery.id}`}
                  className="text-sky-400 hover:text-sky-300 mt-4 inline-block"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LotteryList;
