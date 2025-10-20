import type { CryptoPriceData } from './types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function fetchTokenPrice(symbol: string): Promise<CryptoPriceData | null> {
  try {
    const coinId = getCoinGeckoId(symbol);
    if (!coinId) return null;

    const response = await fetch(
      `${COINGECKO_API}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
    );

    if (!response.ok) return null;

    const data = await response.json();

    return {
      tokenSymbol: symbol.toUpperCase(),
      currentPriceUSD: data.market_data?.current_price?.usd || 0,
      dailyChangePercent: data.market_data?.price_change_percentage_24h || 0,
      lastFetched: Date.now(),
    };
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
}

export async function fetchMultipleTokenPrices(symbols: string[]): Promise<Map<string, CryptoPriceData>> {
  const priceMap = new Map<string, CryptoPriceData>();
  
  await Promise.all(
    symbols.map(async (symbol) => {
      const price = await fetchTokenPrice(symbol);
      if (price) {
        priceMap.set(symbol.toUpperCase(), price);
      }
    })
  );

  return priceMap;
}

function getCoinGeckoId(symbol: string): string | null {
  const symbolMap: Record<string, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    USDC: 'usd-coin',
    USDT: 'tether',
    DAI: 'dai',
    DEGEN: 'degen-base',
    WETH: 'weth',
    SOL: 'solana',
    MATIC: 'matic-network',
    AVAX: 'avalanche-2',
    DOT: 'polkadot',
    LINK: 'chainlink',
    UNI: 'uniswap',
    AAVE: 'aave',
    CRV: 'curve-dao-token',
  };

  return symbolMap[symbol.toUpperCase()] || null;
}
