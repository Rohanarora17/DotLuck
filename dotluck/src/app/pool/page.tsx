'use client'

import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useState, useEffect } from "react"

export default function PoolPage() {
  const [stakeAmount, setStakeAmount] = useState('')
  const xcdotToken = { name: "Polkadot (xcDOT)", amount: 0.5, inPool: true }
  const activeLottery = {
    daysLeft: 3,
    totalStaked: "1000 xcDOT",
    participants: 50,
    maxStakeLimit: 100
  }

  const [maxStakeAmount, setMaxStakeAmount] = useState(0)

  useEffect(() => {
    setMaxStakeAmount(Math.min(xcdotToken.amount, activeLottery.maxStakeLimit))
  }, [xcdotToken.amount, activeLottery.maxStakeLimit])

  const handleStake = () => {
    // Implement staking logic here
    console.log('Staking:', stakeAmount)
  }

  const handlePercentageClick = (percentage: number) => {
    const amount = (percentage / 100) * maxStakeAmount
    setStakeAmount(amount.toFixed(2))
  }

  return (
    <div className="min-h-screen bg-[#1a2332] text-white pt-24">
      <div className="px-6">
        <h1 className="text-3xl font-bold text-white mb-6">Pool</h1>

        <Card className="w-full bg-[#232d3f] border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-lg font-medium text-white">{xcdotToken.name}</h3>
              <p className="text-sm text-gray-400">Your Balance: {xcdotToken.amount} xcDOT</p>
            </div>
            {xcdotToken.inPool && (
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
                  <p className="text-sm text-gray-400">Total xcDOT Staked</p>
                  <p className="text-2xl font-bold text-[#3366cc]">{activeLottery.totalStaked}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="text-2xl font-bold text-[#a855f7]">{activeLottery.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Max Stake Limit</p>
                  <p className="text-2xl font-bold text-[#ff6b6b]">{activeLottery.maxStakeLimit} xcDOT</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="w-full bg-[#232d3f] border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Stake xcDOT</h3>
              <div className="space-y-2">
                <label htmlFor="stakeAmount" className="text-sm text-gray-400">Amount to Stake (xcDOT)</label>
                <Input
                  id="stakeAmount"
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  max={maxStakeAmount}
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
                Stake xcDOT
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

