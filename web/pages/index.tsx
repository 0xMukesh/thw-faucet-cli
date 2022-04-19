import type { NextPage } from 'next'

import {
  useAddress,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
} from '@thirdweb-dev/react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet()
  const connectWithMetamask = useMetamask()
  const connectWithWalletConnect = useWalletConnect()
  const address = useAddress()
  const router = useRouter()

  if (address) {
    router.push(`http://localhost:9991/callback?address=${address}`)
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50">
        <button
          onClick={connectWithCoinbaseWallet}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect Coinbase Wallet
        </button>
        <button
          onClick={connectWithMetamask}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect MetaMask
        </button>
        <button
          onClick={connectWithWalletConnect}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect WalletConnect
        </button>
      </div>
    </>
  )
}

export default Home
