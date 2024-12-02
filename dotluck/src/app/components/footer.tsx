import Link from 'next/link'
import Image from 'next/image'
import { Twitter, DiscIcon , Github } from 'lucide-react'
import im from "../../../public/polkadot-new-dot-logo.png"

export function Footer() {
  return (
    <footer className="w-full bg-[#1a2332] border-t border-gray-800 relative z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-gray-400">Powered By</span>
            <div className="flex items-center space-x-3">
              <Link 
                href="https://polkadot.network" 
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src={im}
                  alt="Polkadot"
                  width={120}
                  height={120}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
           <Link 
              href="https://github.com/trudransh/DotLuck/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

