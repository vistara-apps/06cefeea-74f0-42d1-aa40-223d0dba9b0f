'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { type ReactNode, useState } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';

// Use Alchemy RPC for better reliability and performance
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const rpcUrl = alchemyKey 
  ? `https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`
  : 'https://mainnet.base.org';

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(rpcUrl),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'cdp_demo_key'}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
