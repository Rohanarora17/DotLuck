'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { erc20Abi, parseEther, parseUnits } from 'viem'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { LOTTERY_ABI } from '@/constants'

const LOTTERY_ADDRESS = '0xc23D6746858a451a592C95e39A87e7Ebc754eF71'
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
  
    if (!isConnected) {
      return <div>Please connect your wallet to participate in the lottery.</div>
    }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <Card className="w-[350]">
      <CardHeader>
        <CardTitle>Lottery #{id}</CardTitle>
        <CardDescription>Participate in the lottery or start it if enough participants have joined.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Participants: {participants.length}</p>
        <p>Jackpot: {parseEther(jackpot.toString())} xcDOT</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleParticipate} disabled={isParticipating}>
          {isParticipating ? 'Participating...' : 'Participate'}
        </Button>
        {address?.toLowerCase() === "0x329cB26Ac9320cb571E83F27Db68f71b8c18940C".toLowerCase() ?
        <Button onClick={handleStartLottery} disabled={isStartingLottery}>
          {isStartingLottery  ? 'Starting...' : 'End Lottery'}
        </Button> : null}
      </CardFooter>
    </Card>
    </div>
  )
}

