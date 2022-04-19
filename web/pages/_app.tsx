import type { AppProps } from 'next/app'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = ChainId.Mumbai

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
