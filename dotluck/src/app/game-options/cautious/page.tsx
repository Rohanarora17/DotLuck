'use client'

import { Button } from '../../components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import im from "../../../../public/Leonardo_Phoenix_so_i_need_another_image_where_all_the_people_0.jpg"

export default function CautiousGame() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <Image
          src={im}
          alt="Cautious Game"
          width={400}
          height={300}
          className="mb-4 rounded mx-auto"
        />
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
          The Cautious Game
        </h2>
        <p className="text-lg mb-8 text-white">
          Welcome to The Cautious game! Here you can play with lower stakes and more frequent rewards.
          Are you ready to join the DOTLUCK Pool?
        </p>
        <Link href="/pool">
          <Button className="text-lg py-2 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white transition-all duration-300">
            Start Game
          </Button>
        </Link>
      </div>
      <div className="mt-8">
      </div>
    </div>
  )
}

