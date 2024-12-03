'use client'

import { useState } from "react"
import React from "react"
import { Card, CardContent } from "../../components/ui/card"
import Link from "next/link"
import { ArrowUpRight } from 'lucide-react'
import { useAccount, useReadContract } from 'wagmi'
import { formatUnits } from 'viem'
import { NO_LOSS_LOTTERY_ABI } from "@/constants"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialogue"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"

const contractAddress = "0xb93545C7c85aa67C8Daf09fFCE41749178213485"
const abi = NO_LOSS_LOTTERY_ABI

export default function CautiousGameInterfaces() {
  const { address } = useAccount()
  const [showNoStakeDialog, setShowNoStakeDialog] = useState(false)

  const raffleStats = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getRaffleStats',
  })

  const userStakeInfo = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getStakingInfo',
    args: address ? [] : undefined,
  })

  const hasStaked = userStakeInfo.data && Number(formatUnits(userStakeInfo.data[0], 10)) > 0

  const handleActivePoolClick = (e: React.MouseEvent) => {
    if (!hasStaked) {
      e.preventDefault()
      setShowNoStakeDialog(true)
    }
  }

  // Simulated pool progress (replace with actual data in production)
  const preRaffleProgress = 65
  const activePoolProgress = 80
  const completedPoolProgress = 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            Cautious Game
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            There are multiple ways to interact with the Cautious Game pools. Choose the interface that best suits your needs,
            whether you&apos;re looking to stake for the first time or manage your active stakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pre-staking Pool Card */}
          <Link 
            href="/pool"
            className="block transition-transform hover:scale-[1.02]"
          >
            <Card className="w-full bg-[#232d3f] border-0 hover:bg-[#2a3649]">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Pre Raffle</h3>
                    <p className="text-xs text-gray-400">Start earning rewards</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <p className="text-xs text-gray-400">Total Staked</p>
                    <p className="text-sm font-bold text-white">
                      {raffleStats.data ? formatUnits(raffleStats.data[1], 10) : '0'} xcDOT
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Participants</p>
                    <p className="text-sm font-bold text-white">
                      {raffleStats.data ? raffleStats.data[0].toString() : '0'}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Pool Progress</p>
                  <Progress value={preRaffleProgress} className="w-full h-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Active Pool Card */}
          <Link 
            href={hasStaked ? "/unstake" : "#"}
            className="block transition-transform hover:scale-[1.02]"
            onClick={handleActivePoolClick}
          >
            <Card className="w-full bg-[#232d3f] border-0 hover:bg-[#2a3649]">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Active Pool</h3>
                    <p className="text-xs text-gray-400">Manage your stakes</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <p className="text-xs text-gray-400">Your Stake</p>
                    <p className="text-sm font-bold text-white">
                      {userStakeInfo.data ? formatUnits(userStakeInfo.data[0], 10) : '0'} xcDOT
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Participants</p>
                    <p className="text-sm font-bold text-white">
                      {raffleStats.data ? raffleStats.data[0].toString() : '0'}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Pool Progress</p>
                  <Progress value={activePoolProgress} className="w-full h-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Completed Lottery Card */}
          <Card className="w-full bg-[#232d3f] border-0">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Completed Lottery</h3>
                  <p className="text-xs text-gray-400">View past results</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-400">Total Staked</p>
                  <p className="text-sm font-bold text-white">1,000,000 xcDOT</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Winner</p>
                  <p className="text-sm font-bold text-white">0x1234...5678</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1">Final Pool Size</p>
                <Progress value={completedPoolProgress} className="w-full h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/game-options" className="text-sky-400 hover:text-sky-300">
            Back to Game Selection
          </Link>
        </div>
      </div>

      <Dialog open={showNoStakeDialog} onOpenChange={setShowNoStakeDialog}>
        <DialogContent className="bg-[#232d3f] border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">No Active Stake</DialogTitle>
          </DialogHeader>
          <div className="text-white">
            <p>You haven&apos;t staked any amount yet. Please stake some xcDOT to access the Active Pool.</p>
          </div>
          <Button onClick={() => setShowNoStakeDialog(false)} className="bg-sky-500 hover:bg-sky-600 text-white">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

