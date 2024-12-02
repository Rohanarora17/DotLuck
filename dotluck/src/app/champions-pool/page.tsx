'use client'

import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseUnits, formatUnits, erc20Abi } from 'viem'
import { NO_LOSS_LOTTERY_ABI } from "@/constants"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Contract addresses
const contractAddress = "0xb93545C7c85aa67C8Daf09fFCE41749178213485";
const xcDotAddress = "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080";

// ABI
const abi = NO_LOSS_LOTTERY_ABI

export default function ChampionsPoolPage() {
  const { address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [xcdotToken, setXcdotToken] = useState({ name: '', amount: 0, inPool: false });
  const [activeLottery, setActiveLottery] = useState({
    daysLeft: 0,
    totalStaked: '',
    participants: 0,
    maxStakeLimit: 0,
  });

  const raffleStats = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getRaffleStats',
  });

  // Check allowance
  const {data:allowance} = useReadContract({
    abi: erc20Abi,
    address: xcDotAddress,
    functionName: 'allowance',
    args: [address ?? `0x0`, contractAddress],
  });

  const { writeContract: approve } = useWriteContract();
  const { writeContract: buyTicket } = useWriteContract();

  useEffect(() => {
    if (raffleStats.data) {
      const [totalParticipants, totalDeposits] = raffleStats.data;

      setXcdotToken({
        name: 'Polkadot (xcDOT)',
        amount: Number(formatUnits(totalDeposits, 10)),
        inPool: totalDeposits > 0,
      });

      setActiveLottery({
        daysLeft: Math.ceil(parseInt((2592000).toString()) / (60 * 60 * 24)),
        totalStaked: `${formatUnits(totalDeposits, 10)} xcDOT`,
        participants: parseInt(totalParticipants.toString()),
        maxStakeLimit: 1000, // Higher max stake limit for Champions Pool
      });
    }
  }, [raffleStats.data]);

  const handleStake = async () => {
    if (!allowance || Number(formatUnits(allowance ?? BigInt(0), 10)) < Number(stakeAmount)) {
      // Approve the contract if the allowance is insufficient
      approve({
        abi: [
          {
            "constant": false,
            "inputs": [
              { "name": "_spender", "type": "address" },
              { "name": "_value", "type": "uint256" },
            ],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "type": "function",
          },
        ],
        address: xcDotAddress,
        functionName: 'approve',
        args: [contractAddress, parseUnits(stakeAmount, 10)],
      });
    } else {
      // Stake the tokens
      buyTicket({
        abi,
        address: contractAddress,
        functionName: 'buyTicket',
        args: [parseUnits(stakeAmount, 10)],
      });
    }
  };

  const handlePercentageClick = (percentage: number) => {
    const amount = (percentage / 100) * xcdotToken.amount;
    setStakeAmount(amount.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-2 pb-10">
      <div className="px-6 max-w-4xl mx-auto">
        <Link href="/game-options/champion" className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Champion Game
        </Link>

        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 mb-6">Champions Pool</h1>

        <Card className="w-full bg-[#232d3f] border-0 mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-lg font-medium text-white">{xcdotToken.name}</h3>
              <p className="text-sm text-gray-400">Your Balance: {xcdotToken.amount} xcDOT</p>
            </div>
            {xcdotToken.inPool && (
              <span className="px-3 py-1 text-xs font-medium text-sky-400 bg-sky-400/10 rounded-full">
                In Champions Pool
              </span>
            )}
          </CardContent>
        </Card>

        <Card className="w-full bg-[#232d3f] border-0 mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Current Champions Lottery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-400">Days Left to Stake</p>
                <p className="text-2xl font-bold text-sky-400">{activeLottery.daysLeft} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total xcDOT Staked</p>
                <p className="text-2xl font-bold text-blue-400">{activeLottery.totalStaked}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Participants</p>
                <p className="text-2xl font-bold text-sky-400">{activeLottery.participants}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Max Stake Limit</p>
                <p className="text-2xl font-bold text-blue-400">{activeLottery.maxStakeLimit} xcDOT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-[#232d3f] border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Stake xcDOT in Champions Pool</h3>
            <div className="space-y-2">
              <label htmlFor="stakeAmount" className="text-sm text-gray-400">Amount to Stake (xcDOT)</label>
              <Input
                id="stakeAmount"
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                max={xcdotToken.amount}
                className="bg-[#1a2332] border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[25, 50, 75, 100].map((percentage) => (
                <Button
                  key={percentage}
                  onClick={() => handlePercentageClick(percentage)}
                  className="bg-sky-600 hover:bg-sky-700 text-white transition-all duration-300"
                >
                  {percentage}%
                </Button>
              ))}
            </div>
            <Button 
              onClick={handleStake} 
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white transition-all duration-300 mt-4"
            >
              Stake in Champions Pool
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

