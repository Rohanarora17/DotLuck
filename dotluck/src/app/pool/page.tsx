'use client'

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function PoolPage() {
  const [stakeAmount, setStakeAmount] = useState('')
  const maxStakeLimit = 100 // This should be fetched from your backend or smart contract

  const handleStake = () => {
    // Implement staking logic here
    console.log('Staking:', stakeAmount)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">DOTLUCK Pool</h1>
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Current Pool Information</h2>
        <p className="mb-2">Maximum Stake Limit: {maxStakeLimit} DOT</p>
        <p className="mb-4">Total Pool Size: --- DOT</p>
        <div className="mb-4">
          <label htmlFor="stakeAmount" className="block mb-2">Stake Amount (DOT)</label>
          <Input
            id="stakeAmount"
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            max={maxStakeLimit}
            className="w-full"
          />
        </div>
        <Button onClick={handleStake} className="w-full">Stake DOT</Button>
      </div>
    </div>
  )
}