export interface UserHolding {
  id: string;
  tokenSymbol: string;
  quantity: number;
}

export interface CryptoPriceData {
  tokenSymbol: string;
  currentPriceUSD: number;
  dailyChangePercent: number;
  lastFetched: number;
}

export interface UserPortfolio {
  fid?: string;
  walletAddress?: string;
  holdings: UserHolding[];
  lastUpdated: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
}
