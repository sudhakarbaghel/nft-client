import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import { NETWORKS, SITE_NAME } from '../configuration/Config'
import React from 'react'



interface Props {
  children: ReactNode
}

const { chains, publicClient } = configureChains(NETWORKS, [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
  projectId: "aa4b39fdf1a4c0adc7baebc87ec47562"
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
// export function walletClientToSigner(walletClient: WalletClient) {
//   const { account, chain, transport } = walletClient
//   const network = {
//     chainId: chain.id,
//     name: chain.name,
//     ensAddress: chain.contracts?.ensRegistry?.address,
//   }
//   const provider = new providers.Web3Provider(transport, network)
//   const signer = provider.getSigner(account.address)
//   return signer
// }
export function Web3Provider(props: Props) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider modalSize="compact" coolMode chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export {publicClient};