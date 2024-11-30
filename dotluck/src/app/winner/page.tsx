'use client'

import { useState, useEffect } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import { Button } from '../components/ui/button'

// Replace with your actual contract address and ABI
const CONTRACT_ADDRESS = 'your_contract_address_here'
const CONTRACT_ABI = 'your_contract_abi_here'

export default function WinnerPage() {
  const [winner, setWinner] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const wsProvider = new WsProvider('wss://rpc.polkadot.io')
        const api = await ApiPromise.create({ provider: wsProvider })
        const contract = new ContractPromise(api, CONTRACT_ABI, CONTRACT_ADDRESS)

        const { result, output } = await contract.query.getWinner('replace_with_valid_account_id', {})
        
        if (result.isOk && output) {
          setWinner(output.toString())
        } else {
          setError('No winner available')
        }
      } catch (err) {
        console.error('Error fetching winner:', err)
        setError('Failed to fetch winner')
      } finally {
        setLoading(false)
      }
    }

    fetchWinner()
  }, [])

  const handleClaimPrize = () => {
    // Implement prize claiming logic here
    console.log('Claiming prize for winner:', winner)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Lottery Winner
      </h1>
      
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {winner && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Winning Address</h2>
          <p className="text-sm break-all text-gray-300 mb-4">{winner}</p>
          <Button 
            onClick={handleClaimPrize}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white transition-all duration-300"
          >
            Claim Prize
          </Button>
        </div>
      )}
    </div>
  )
}

