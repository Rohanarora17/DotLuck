'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { erc20Abi, parseUnits } from 'viem'
import { Button } from '../../../components/ui/button'
import { LOTTERY_ABI } from '@/constants'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const LOTTERY_ADDRESS = '0x6a7533d6D1C03B511A43191396b621a71c74a2e3'
const xcDotAddress = "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080";

export default function Lottery({id}:{id:number}) {
    const { address, isConnected } = useAccount()
    const [participants, setParticipants] = useState<string[]>([])
    const [jackpot, setJackpot] = useState<bigint>(BigInt(0))
    const [participateHash, setParticipateHash] = useState<`0x${string}` | undefined>()
    const [startLotteryHash, setStartLotteryHash] = useState<`0x${string}` | undefined>()
    const [approvalHash, setApprovalHash] = useState<`0x${string}` | undefined>()
    const [isApproved, setIsApproved] = useState(false)
   
  
    const lotteryId = BigInt(id)
  
    const { data: participantsData, refetch: refetchParticipants } = useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LOTTERY_ABI,
      functionName: 'getLotteryParticipants',
      args: [lotteryId],
    })
  
    const { data: jackpotData, refetch: refetchJackpot } = useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LOTTERY_ABI,
      functionName: 'getLotteryJackpot',
      args: [lotteryId],
    })

    const {data: winner} = useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LOTTERY_ABI,
      functionName: 'getlotterywinner',
      args: [lotteryId],
    })
  
    const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
      address: xcDotAddress,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [address as `0x${string}`, LOTTERY_ADDRESS],
    })
  
    const { writeContract: participate } = useWriteContract()
    const { writeContract: startLottery } = useWriteContract()
    const { writeContract: approve } = useWriteContract()
  
    const { isLoading: isParticipating } = useWaitForTransactionReceipt({
      hash: participateHash,
    })
  
    const { isLoading: isStartingLottery } = useWaitForTransactionReceipt({
      hash: startLotteryHash,
    })
  
    const { isLoading: isApproving } = useWaitForTransactionReceipt({
      hash: approvalHash,
    })


    const formatBigintToNumber = (value: bigint): string => {
      const divisor = BigInt(10 ** 10); // xcDOT token has 10 decimals
      const formattedValue = Number(value) / Number(divisor); // Convert to number and divide
      return formattedValue.toFixed(2); // Format to 2 decimal places
    };
    console.log(winner)
  
    useEffect(() => {
      
      if (participantsData) {
        setParticipants(participantsData as string[])
      }
      if (jackpotData) {
        setJackpot(jackpotData as bigint)
      }
      if (allowanceData) {
        setIsApproved((allowanceData as bigint) > BigInt(0))
      }
    }, [participantsData, jackpotData, allowanceData])
  
    const handleApprove = () => {
      approve({
        address: xcDotAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [LOTTERY_ADDRESS, parseUnits('10',10)], // Approve a large amount
      }, {
        onSuccess: (hash) => setApprovalHash(hash),
      })
    }
  
    const handleParticipate = () => {

      console.log('reached 1')

      if (!isConnected) {
        alert("connect your wallet")
     }
        
      console.log('reached 2')

      
      if(!isApproved) {
        handleApprove()
      }
      participate({
        address: LOTTERY_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'participate',
        args: [lotteryId],
      }, {
        onSuccess: (hash) => setParticipateHash(hash),
      })
    }
  
    const handleStartLottery = () => {
      startLottery({
        address: LOTTERY_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'startLottery',
        args: [lotteryId],
      }, {
        onSuccess: (hash) => setStartLotteryHash(hash),
      })
    }
  
    useEffect(() => {
      if (!isParticipating && !isStartingLottery && !isApproving) {
        refetchParticipants()
        refetchJackpot()
        refetchAllowance()
      }
    }, [isParticipating, isStartingLottery, isApproving])
  
    

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-10">
        <div className="max-w-md mx-auto">
          <Link href="/game-options/champion" className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lotteries
          </Link>

          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-0.5 rounded-lg shadow-lg">
            <div className="bg-[#232d3f] rounded-lg p-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  LOTTERY TICKET
                </h1>
                <div className="text-2xl font-bold text-white mt-2">#{id}</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="text-xl font-bold text-white">{participants.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Jackpot</p>
                  <p className="text-xl font-bold text-white">{formatBigintToNumber(jackpot)} xcDOT</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleParticipate} 
                  disabled={isParticipating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold rounded-md"
                >
                  {isParticipating ? 'Participating...' : 'Participate'}
                </Button>

                {address?.toLowerCase() === "0x329cB26Ac9320cb571E83F27Db68f71b8c18940C".toLowerCase() && (
                  <Button 
                    onClick={handleStartLottery} 
                    disabled={isStartingLottery}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold rounded-md"
                  >
                    {isStartingLottery ? 'Starting...' : 'End Lottery'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

