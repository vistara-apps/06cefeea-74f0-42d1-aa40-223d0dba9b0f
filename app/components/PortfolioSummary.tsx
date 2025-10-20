'use client';

import { TrendingUp, TrendingDown, Share2, Sparkles } from 'lucide-react';

interface PortfolioSummaryProps {
  totalValue: number;
  dailyChange: number;
  onShare: () => void;
}

export function PortfolioSummary({ totalValue, dailyChange, onShare }: PortfolioSummaryProps) {
  const isPositive = dailyChange >= 0;

  return (
    <div className="card relative overflow-hidden fade-in">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-fg/60 mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-accent" />
              Total Portfolio Value
            </p>
            <h2 className="text-5xl font-bold text-fg tracking-tight">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
          <button
            onClick={onShare}
            className="p-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 hover:scale-110 transition-all duration-200 shadow-lg shadow-accent/10"
            aria-label="Share portfolio"
          >
            <Share2 size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
          <div className={`p-1.5 rounded-lg ${isPositive ? 'bg-success/10' : 'bg-danger/10'}`}>
            {isPositive ? (
              <TrendingUp size={18} className="text-success" />
            ) : (
              <TrendingDown size={18} className="text-danger" />
            )}
          </div>
          <span
            className={`text-xl font-bold ${
              isPositive ? 'text-success' : 'text-danger'
            }`}
          >
            {isPositive ? '+' : ''}{dailyChange.toFixed(2)}%
          </span>
          <span className="text-sm text-fg/60">24h Change</span>
        </div>
      </div>
    </div>
  );
}
