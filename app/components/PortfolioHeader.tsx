'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import type { PortfolioSummary } from '@/lib/types';

interface PortfolioHeaderProps {
  summary: PortfolioSummary;
}

export function PortfolioHeader({ summary }: PortfolioHeaderProps) {
  const isPositive = summary.dailyChangePercent >= 0;

  return (
    <header className="text-center space-y-4">
      <h1 className="text-4xl font-semibold text-fg">Minifolio</h1>
      <p className="text-sm text-fg/70">Your Farcaster-native portfolio tracker</p>
      
      <div className="mt-6 p-6 bg-surface rounded-lg card-shadow">
        <div className="text-sm text-fg/70 mb-2">Total Portfolio Value</div>
        <div className="text-4xl font-bold text-fg">
          ${summary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        {summary.totalValue > 0 && (
          <div className={`mt-3 flex items-center justify-center gap-2 text-sm ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="font-medium">
              {isPositive ? '+' : ''}{summary.dailyChangePercent.toFixed(2)}%
            </span>
            <span className="text-fg/70">
              (${Math.abs(summary.dailyChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
