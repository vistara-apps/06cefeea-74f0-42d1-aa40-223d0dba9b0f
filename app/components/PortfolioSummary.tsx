'use client';

import { TrendingUp, TrendingDown, Share2 } from 'lucide-react';

interface PortfolioSummaryProps {
  totalValue: number;
  dailyChange: number;
  onShare: () => void;
}

export function PortfolioSummary({ totalValue, dailyChange, onShare }: PortfolioSummaryProps) {
  const isPositive = dailyChange >= 0;

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-fg/60 mb-1">Total Portfolio Value</p>
          <h2 className="text-4xl font-bold text-fg">
            ${totalValue.toFixed(2)}
          </h2>
        </div>
        <button
          onClick={onShare}
          className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors duration-200"
          aria-label="Share portfolio"
        >
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp size={20} className="text-success" />
        ) : (
          <TrendingDown size={20} className="text-danger" />
        )}
        <span
          className={`text-lg font-semibold ${
            isPositive ? 'text-success' : 'text-danger'
          }`}
        >
          {isPositive ? '+' : ''}{dailyChange.toFixed(2)}%
        </span>
        <span className="text-sm text-fg/60">Today</span>
      </div>
    </div>
  );
}
