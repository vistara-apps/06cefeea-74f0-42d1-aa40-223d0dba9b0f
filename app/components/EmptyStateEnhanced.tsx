'use client';

import { Wallet, TrendingUp, Coins, Plus } from 'lucide-react';

export function EmptyStateEnhanced() {
  return (
    <div className="card text-center py-12 fade-in">
      {/* Animated Icon Group */}
      <div className="relative mx-auto w-24 h-24 mb-6">
        <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Wallet size={48} className="text-accent" />
            <div className="absolute -top-2 -right-2 bg-success rounded-full p-1">
              <Plus size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-fg mb-2">
        Connect Your Wallet
      </h3>
      <p className="text-sm text-fg/60 mb-6 max-w-sm mx-auto">
        Connect your wallet to view your real token balances, NFTs, and portfolio on Base
      </p>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto">
        <div className="bg-bg rounded-lg p-3 text-left">
          <TrendingUp size={20} className="text-success mb-2" />
          <p className="text-xs font-medium text-fg">Real-time Prices</p>
        </div>
        <div className="bg-bg rounded-lg p-3 text-left">
          <Coins size={20} className="text-accent mb-2" />
          <p className="text-xs font-medium text-fg">Easy Tracking</p>
        </div>
      </div>

      {/* Info */}
      <p className="text-xs text-fg/40 mt-4">
        Click &quot;Connect Wallet&quot; in the top right to get started
      </p>
    </div>
  );
}
