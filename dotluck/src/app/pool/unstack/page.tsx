'use client'

import { useState } from "react"
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { formatUnits, parseUnits } from 'viem'
import { NO_LOSS_LOTTERY_ABI } from "@/constants"
import { useToast } from "../../components/ui/toast"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

const contractAddress = "0xb93545C7c85aa67C8Daf09fFCE41749178213485"
const abi = NO_LOSS_LOTTERY_ABI

export default function UnstakePage() {
  const { address } = useAccount()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const userStakeInfo = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getStakingInfo',
    args: address ? [] : undefined,
  })

  const raffleStats = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getRaffleStats',
  })

  const { writeContract: unstake } = useWriteContract()

  const handleUnstake = async () => {
    if (!userStakeInfo.data) return

    try {
      setIsLoading(true)
      unstake({
        abi,
        address: contractAddress,
        functionName: 'withdrawPrincipal',
        args: userStakeInfo.data ? [userStakeInfo.data[0]] : undefined,
      })
      
      toast({
        title: "Transaction Submitted",
        description: "Your unstake request is being processed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const stakedAmount = userStakeInfo.data ? formatUnits(userStakeInfo.data[0], 10) : '0'
  const totalStaked = raffleStats.data ? formatUnits(raffleStats.data[1], 10) : '0'
  const winChance = userStakeInfo.data && raffleStats.data
    ? ((Number(stakedAmount) / Number(totalStaked)) * 100).toFixed(2)
    : '0'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/pool/active" className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Active Pool
        </Link>

        <Card className="w-full bg-[#232d3f] border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="xcDOT"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Unstake xcDOT</h1>
                <p className="text-gray-400">Withdraw your funds from the pool</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Your Stake</p>
                <p className="text-xl font-bold text-sky-400">{stakedAmount} xcDOT</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Pool Size</p>
                <p className="text-xl font-bold text-white">{totalStaked} xcDOT</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Win Chance</p>
                <p className="text-xl font-bold text-white">{winChance}%</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleUnstake}
                disabled={isLoading || Number(stakedAmount) === 0}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
              >
                {isLoading ? 'Processing...' : 'Unstake All xcDOT'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

