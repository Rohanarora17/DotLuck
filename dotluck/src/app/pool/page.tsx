'use client'

import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseUnits, formatUnits, erc20Abi } from 'viem'
import { NO_LOSS_LOTTERY_ABI } from "@/constants"

// Contract addresses
const contractAddress = "0xb93545C7c85aa67C8Daf09fFCE41749178213485";
const xcDotAddress = "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080";

// ABI
const abi = NO_LOSS_LOTTERY_ABI

export default function PoolPage() {
  const { address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [vdotToken, setVdotToken] = useState({ name: '', amount: 0, inPool: false });
  const [activeLottery, setActiveLottery] = useState({
    daysLeft: 0,
    totalStaked: '',
    participants: 0,
    maxStakeLimit: 0,
  });

  // // Read staking info
  // const stakingInfo = useReadContract({
  //   abi,
  //   address: contractAddress,
  //   functionName: 'getStakingInfo',
  // });
  // console.log(stakingInfo)

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
    args: [address ?? `0xjkj`, contractAddress],
  });

  const { writeContract: approve } = useWriteContract();
  const { writeContract: buyTicket } = useWriteContract();

  useEffect(() => {
    if (raffleStats.data) {
      // const [totalStaked, currentVTokenBalance] = stakingInfo.data;
      const [totalParticipants,totalDeposits,  timeRemaining] = raffleStats.data;

      setVdotToken({
        name: 'Polkadot (vDOT)',
        amount: Number(formatUnits(totalDeposits, 10)),
        inPool: totalDeposits > 0,
      });

      setActiveLottery({
        daysLeft: Math.ceil(parseInt((2592000).toString()) / (60 * 60 * 24)),
        totalStaked: `${formatUnits(totalDeposits, 10)} vDOT`,
        participants: parseInt(totalParticipants.toString()),
        maxStakeLimit: 100, // Assuming a fixed max stake limit
      });
    }
  }, [ raffleStats.data]);

  const handleStake = async () => {
    if (!allowance|| Number(formatUnits(allowance ?? BigInt(0), 10)) < Number(stakeAmount)) {
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
    const amount = (percentage / 100) * vdotToken.amount;
    setStakeAmount(amount.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-[#1a2332] text-white pt-24">
      <div className="px-6">
        <h1 className="text-3xl font-bold text-white mb-6">Pool</h1>

        <Card className="w-full bg-[#232d3f] border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-lg font-medium text-white">{vdotToken.name}</h3>
              <p className="text-sm text-gray-400">Your Balance: {vdotToken.amount} vDOT</p>
            </div>
            {vdotToken.inPool && (
              <span className="px-3 py-1 text-xs font-medium text-[#a855f7] bg-[#a855f7]/10 rounded-full">
                In Pool
              </span>
            )}
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full bg-[#232d3f] border-0">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Current Lottery Pool</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Days Left to Stake</p>
                  <p className="text-2xl font-bold text-[#00a86b]">{activeLottery.daysLeft} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total vDOT Staked</p>
                  <p className="text-2xl font-bold text-[#3366cc]">{activeLottery.totalStaked}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="text-2xl font-bold text-[#a855f7]">{activeLottery.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Max Stake Limit</p>
                  <p className="text-2xl font-bold text-[#ff6b6b]">{activeLottery.maxStakeLimit} vDOT</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="w-full bg-[#232d3f] border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Stake vDOT</h3>
              <div className="space-y-2">
                <label htmlFor="stakeAmount" className="text-sm text-gray-400">Amount to Stake (vDOT)</label>
                <Input
                  id="stakeAmount"
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  max={vdotToken.amount}
                  className="bg-[#1a2332] border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[25, 50, 75, 100].map((percentage) => (
                  <Button
                    key={percentage}
                    onClick={() => handlePercentageClick(percentage)}
                    className="bg-[#3366cc] hover:bg-[#2b579a] text-white transition-all duration-300"
                  >
                    {percentage}%
                  </Button>
                ))}
              </div>
              <Button 
                onClick={handleStake} 
                className="w-full bg-[#00a86b] hover:bg-[#00955f] text-white transition-all duration-300 mt-4"
              >
                Stake vDOT
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
