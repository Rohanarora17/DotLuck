'use client'

import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
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

// Fixed ticket price in xcDOT
const FIXED_TICKET_PRICE = 2; // 2 xcDOT per ticket

export default function ChampionsPoolPage() {
  const { address } = useAccount();
  const [xcdotToken, setXcdotToken] = useState({ name: '', amount: 0, inPool: false });
  const [activeLottery, setActiveLottery] = useState({
    daysLeft: 0,
    totalStaked: '',
    participants: 0,
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


  // Check balance
  const {data:balanceOf} = useReadContract({
    abi: erc20Abi,
    address: xcDotAddress,
    functionName: 'balanceOf',
    args: [address ?? `0x0`],
  });


  const { writeContract: approve } = useWriteContract();
  const { writeContract: buyTicket } = useWriteContract();

  useEffect(() => {
    if (raffleStats.data) {
      const [totalParticipants, totalDeposits] = raffleStats.data;

      const user_balance = balanceOf ? balanceOf : 0;

      setXcdotToken({
        name: 'Polkadot (xcDOT)',
        amount: Number(formatUnits(BigInt(user_balance), 10)),
        inPool: totalDeposits > 0,
      });

      setActiveLottery({
        daysLeft: Math.ceil(parseInt((2592000).toString()) / (60 * 60 * 24)),
        totalStaked: `${formatUnits(totalDeposits, 10)} xcDOT`,
        participants: parseInt(totalParticipants.toString()),
      });
    }
  }, [raffleStats.data, balanceOf]);

  const handleStake = async () => {
    if (!allowance || Number(formatUnits(allowance ?? BigInt(0), 10)) < FIXED_TICKET_PRICE) {
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
        args: [contractAddress, parseUnits(FIXED_TICKET_PRICE.toString(), 10)],
      });
    } else {
      // Buy a ticket
      buyTicket({
        abi,
        address: contractAddress,
        functionName: 'buyTicket',
        args: [parseUnits(FIXED_TICKET_PRICE.toString(), 10)],
      });
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-[#232d3f] border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Buy Ticket for Champions Pool</h3>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-400">Ticket Price: {FIXED_TICKET_PRICE} xcDOT</p>
            </div>
            <Button 
              onClick={handleStake} 
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white transition-all duration-300"
            >
              Buy Ticket ({FIXED_TICKET_PRICE} xcDOT)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

