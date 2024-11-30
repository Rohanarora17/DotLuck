import Link from 'next/link'
import { Button } from "../components/ui/button"

export function Header() {
  return (
    <header className="bg-gradient-to-u from-gray-900 to-black py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-300">
          DOTLUCK
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/winner">
            <Button 
              variant="ghost" 
              className="text-white hover:text-purple-400 transition-all duration-300"
            >
              Winner
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="border-2 border-purple-500 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 hover:text-white transition-all duration-300"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  )
}

