'use client';

import { useEffect, useState } from 'react';
import { PortfolioHeader } from './components/PortfolioHeader';
import { PortfolioInputForm } from './components/PortfolioInputForm';
import { AssetList } from './components/AssetList';
import { PortfolioSummary } from './components/PortfolioSummary';
import { EmptyState } from './components/EmptyState';
import type { UserHolding, CryptoPriceData, PortfolioSummary as PortfolioSummaryType } from '@/lib/types';
import { fetchMultipleTokenPrices } from '@/lib/api';
import { loadPortfolio, savePortfolio } from '@/lib/storage';

export default function Home() {
  const [holdings, setHoldings] = useState<UserHolding[]>([]);
  const [prices, setPrices] = useState<Map<string, CryptoPriceData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<PortfolioSummaryType>({
    totalValue: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  });

  // Load portfolio on mount
  useEffect(() => {
    const savedPortfolio = loadPortfolio();
    if (savedPortfolio?.holdings) {
      setHoldings(savedPortfolio.holdings);
    }
    setIsLoading(false);
  }, []);

  // Fetch prices when holdings change
  useEffect(() => {
    if (holdings.length === 0) {
      setPrices(new Map());
      setSummary({ totalValue: 0, dailyChange: 0, dailyChangePercent: 0 });
      return;
    }

    const fetchPrices = async () => {
      const symbols = holdings.map(h => h.tokenSymbol);
      const priceData = await fetchMultipleTokenPrices(symbols);
      setPrices(priceData);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [holdings]);

  // Calculate summary when prices or holdings change
  useEffect(() => {
    if (holdings.length === 0 || prices.size === 0) {
      setSummary({ totalValue: 0, dailyChange: 0, dailyChangePercent: 0 });
      return;
    }

    let totalValue = 0;
    let totalDailyChange = 0;

    holdings.forEach(holding => {
      const price = prices.get(holding.tokenSymbol.toUpperCase());
      if (price) {
        const value = holding.quantity * price.currentPriceUSD;
        totalValue += value;
        
        const previousValue = value / (1 + price.dailyChangePercent / 100);
        totalDailyChange += (value - previousValue);
      }
    });

    const dailyChangePercent = totalValue > 0 ? (totalDailyChange / (totalValue - totalDailyChange)) * 100 : 0;

    setSummary({
      totalValue,
      dailyChange: totalDailyChange,
      dailyChangePercent,
    });
  }, [holdings, prices]);

  // Save portfolio when holdings change
  useEffect(() => {
    if (!isLoading) {
      savePortfolio({
        holdings,
        lastUpdated: Date.now(),
      });
    }
  }, [holdings, isLoading]);

  const handleAddHolding = (holding: UserHolding) => {
    setHoldings(prev => [...prev, holding]);
  };

  const handleRemoveHolding = (id: string) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
  };

  const handleUpdateHolding = (id: string, quantity: number) => {
    setHoldings(prev =>
      prev.map(h => (h.id === id ? { ...h, quantity } : h))
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-fg">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-md mx-auto px-4 py-8">
        <PortfolioHeader summary={summary} />
        
        <div className="mt-8 space-y-6 animate-fade-in">
          <PortfolioInputForm onAddHolding={handleAddHolding} />
          
          {holdings.length > 0 ? (
            <>
              <AssetList
                holdings={holdings}
                prices={prices}
                onRemove={handleRemoveHolding}
                onUpdate={handleUpdateHolding}
              />
              <PortfolioSummary summary={summary} />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>
  );
}
