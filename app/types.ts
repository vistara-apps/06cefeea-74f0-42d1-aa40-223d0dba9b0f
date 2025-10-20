export interface Asset {
  id: string;
  symbol: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
}

export interface UserPortfolio {
  fid: number;
  walletAddress?: string;
  holdings: Asset[];
  lastUpdated: number;
}

export interface CryptoPriceData {
  tokenSymbol: string;
  currentPriceUSD: number;
  dailyChangePercent: number;
  lastFetched: number;
}
