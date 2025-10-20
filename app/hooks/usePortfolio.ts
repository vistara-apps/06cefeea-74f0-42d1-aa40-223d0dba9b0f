'use client';

import { useState, useEffect } from 'react';
import type { Asset } from '../types';

const MOCK_PRICES: Record<string, number> = {
  eth: 3200.50,
  btc: 67500.00,
  sol: 189.40,
  usdc: 1.00,
  degen: 0.012,
};

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Asset[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [dailyChange, setDailyChange] = useState(0);

  useEffect(() => {
    // Calculate total value
    const total = portfolio.reduce((sum, asset) => sum + asset.totalValue, 0);
    setTotalValue(total);

    // Mock daily change calculation
    const change = Math.random() * 10 - 5; // Random between -5% and +5%
    setDailyChange(change);
  }, [portfolio]);

  const addAsset = async (symbol: string, quantity: number) => {
    // Simulate API call to fetch price
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentPrice = MOCK_PRICES[symbol.toLowerCase()] || 0;
    const newAsset: Asset = {
      id: Date.now().toString(),
      symbol: symbol.toLowerCase(),
      quantity,
      currentPrice,
      totalValue: currentPrice * quantity,
    };

    setPortfolio(prev => [...prev, newAsset]);
  };

  const removeAsset = (id: string) => {
    setPortfolio(prev => prev.filter(asset => asset.id !== id));
  };

  return {
    portfolio,
    addAsset,
    removeAsset,
    totalValue,
    dailyChange,
  };
}
