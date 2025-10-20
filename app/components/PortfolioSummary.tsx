'use client';

import { Share2, TrendingUp, TrendingDown } from 'lucide-react';
import type { PortfolioSummary as PortfolioSummaryType } from '@/lib/types';

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType;
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  const isPositive = summary.dailyChangePercent >= 0;

  const handleShare = () => {
    // Future: Integrate with MiniKit composeCast
    const message = `My Minifolio is ${isPositive ? 'up' : 'down'} ${Math.abs(summary.dailyChangePercent).toFixed(2)}% today! 📈`;
    alert(`Share feature coming soon!\n\n${message}`);
  };

  return (
    <div className="bg-surface rounded-lg p-6 card-shadow space-y-4">
      <h2 className="text-xl font-bold text-fg">Summary</h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-fg/70">Total Value</span>
          <span className="font-bold text-fg text-lg">
            ${summary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-fg/70">24h Change</span>
          <div className={`flex items-center gap-2 font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>
              {isPositive ? '+' : ''}{summary.dailyChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-fg/70">24h P&L</span>
          <span className={`font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}${Math.abs(summary.dailyChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="w-full bg-primary hover:bg-accent text-white font-medium py-3 rounded-md flex items-center justify-center gap-2 transition-smooth mt-4"
      >
        <Share2 size={20} />
        Share Performance
      </button>
    </div>
  );
}
