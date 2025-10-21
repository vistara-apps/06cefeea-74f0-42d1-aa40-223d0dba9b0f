'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance, usePublicClient } from 'wagmi';
import { formatUnits, type Address } from 'viem';
import type { Asset } from '../types';

// Common ERC20 tokens on Base
const BASE_TOKENS = [
  {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as Address,
    symbol: 'USDC',
    decimals: 6,
  },
  {
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb' as Address,
    symbol: 'DAI',
    decimals: 18,
  },
  {
    address: '0x4200000000000000000000000000000000000006' as Address,
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed' as Address,
    symbol: 'DEGEN',
    decimals: 18,
  },
];

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
] as const;

export interface NFT {
  contractAddress: string;
  tokenId: string;
  name?: string;
  image?: string;
  collectionName?: string;
}

export function useOnchainPortfolio() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: ethBalance } = useBalance({ address });

  const [tokens, setTokens] = useState<Asset[]>([]);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch token prices from CoinGecko
  const fetchTokenPrices = async (symbols: string[]): Promise<Record<string, number>> => {
    try {
      const symbolMap: Record<string, string> = {
        ETH: 'ethereum',
        USDC: 'usd-coin',
        DAI: 'dai',
        WETH: 'weth',
        DEGEN: 'degen-base',
      };

      const ids = symbols.map(s => symbolMap[s]).filter(Boolean).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      
      if (!response.ok) throw new Error('Failed to fetch prices');
      
      const data = await response.json();
      const prices: Record<string, number> = {};
      
      symbols.forEach(symbol => {
        const coinId = symbolMap[symbol];
        if (coinId && data[coinId]) {
          prices[symbol] = data[coinId].usd;
        }
      });
      
      return prices;
    } catch (error) {
      console.error('Error fetching token prices:', error);
      return {};
    }
  };

  // Fetch NFTs using SimpleHash API (fallback to Alchemy if needed)
  const fetchNFTs = async (walletAddress: Address): Promise<NFT[]> => {
    try {
      // Using SimpleHash free tier - Base chain
      const response = await fetch(
        `https://api.simplehash.com/api/v0/nfts/owners?chains=base&wallet_addresses=${walletAddress}&limit=50`,
        {
          headers: {
            'X-API-KEY': process.env.NEXT_PUBLIC_SIMPLEHASH_API_KEY || 'demo_key',
          },
        }
      );

      if (!response.ok) {
        // Fallback: Try Alchemy if SimpleHash fails
        return fetchNFTsAlchemy(walletAddress);
      }

      const data = await response.json();
      return (data.nfts || []).map((nft: { 
        contract_address: string; 
        token_id: string; 
        name?: string; 
        previews?: { image_medium_url?: string }; 
        image_url?: string;
        collection?: { name?: string };
      }) => ({
        contractAddress: nft.contract_address,
        tokenId: nft.token_id,
        name: nft.name,
        image: nft.previews?.image_medium_url || nft.image_url,
        collectionName: nft.collection?.name,
      }));
    } catch (error) {
      console.error('Error fetching NFTs from SimpleHash:', error);
      return fetchNFTsAlchemy(walletAddress);
    }
  };

  // Fallback NFT fetching using Alchemy
  const fetchNFTsAlchemy = async (walletAddress: Address): Promise<NFT[]> => {
    try {
      const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
      if (!alchemyKey) return [];

      const response = await fetch(
        `https://base-mainnet.g.alchemy.com/nft/v3/${alchemyKey}/getNFTsForOwner?owner=${walletAddress}&withMetadata=true&pageSize=50`
      );

      if (!response.ok) return [];

      const data = await response.json();
      return (data.ownedNfts || []).map((nft: {
        contract: { address: string; name?: string };
        tokenId: string;
        name?: string;
        image?: { cachedUrl?: string; originalUrl?: string };
      }) => ({
        contractAddress: nft.contract.address,
        tokenId: nft.tokenId,
        name: nft.name || nft.contract.name,
        image: nft.image?.cachedUrl || nft.image?.originalUrl,
        collectionName: nft.contract.name,
      }));
    } catch (error) {
      console.error('Error fetching NFTs from Alchemy:', error);
      return [];
    }
  };

  // Fetch token balances from Base chain
  const fetchTokenBalances = async (walletAddress: Address) => {
    if (!publicClient) return;

    setIsLoading(true);
    setError(null);

    try {
      const balances: Asset[] = [];

      // Add ETH balance
      if (ethBalance) {
        const ethAmount = parseFloat(formatUnits(ethBalance.value, 18));
        if (ethAmount > 0.0001) {
          balances.push({
            id: 'ETH',
            symbol: 'ETH',
            quantity: ethAmount,
            currentPrice: 0, // Will be updated with price data
            totalValue: 0,
          });
        }
      }

      // Fetch ERC20 token balances
      for (const token of BASE_TOKENS) {
        try {
          const balance = await publicClient.readContract({
            address: token.address,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [walletAddress],
          });

          const amount = parseFloat(formatUnits(balance as bigint, token.decimals));
          
          if (amount > 0.01) {
            balances.push({
              id: token.address,
              symbol: token.symbol,
              quantity: amount,
              currentPrice: 0,
              totalValue: 0,
            });
          }
        } catch (error) {
          console.error(`Error fetching ${token.symbol} balance:`, error);
        }
      }

      // Fetch prices and update balances
      const symbols = balances.map(b => b.symbol);
      const prices = await fetchTokenPrices(symbols);

      const updatedBalances = balances.map(balance => ({
        ...balance,
        currentPrice: prices[balance.symbol] || 0,
        totalValue: balance.quantity * (prices[balance.symbol] || 0),
      }));

      setTokens(updatedBalances.filter(b => b.totalValue > 0));
    } catch (error) {
      console.error('Error fetching token balances:', error);
      setError('Failed to fetch token balances');
    } finally {
      setIsLoading(false);
    }
  };

  // Load portfolio data when wallet connects
  useEffect(() => {
    const loadPortfolio = async () => {
      if (isConnected && address) {
        await fetchTokenBalances(address);
        const nftData = await fetchNFTs(address);
        setNFTs(nftData);
      } else {
        setTokens([]);
        setNFTs([]);
      }
    };
    
    loadPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, publicClient]);

  const totalValue = tokens.reduce((sum, token) => sum + token.totalValue, 0);

  return {
    tokens,
    nfts,
    totalValue,
    isLoading,
    error,
    isConnected,
    address,
    refresh: () => {
      if (address) {
        fetchTokenBalances(address);
        fetchNFTs(address).then(setNFTs);
      }
    },
  };
}
