'use client';

import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import type { Asset } from '../types';

interface AssetListProps {
  assets: Asset[];
  onRemove: (id: string) => void;
}

export function AssetList({ assets, onRemove }: AssetListProps) {
  return (
    <div className="space-y-3 slide-up">
      <h3 className="text-lg font-semibold text-fg">Your Assets</h3>
      {assets.map((asset, index) => {
        // Mock 24h change for visual interest
        const change24h = ((Math.random() - 0.5) * 10);
        const isPositive = change24h >= 0;
        
        return (
          <div 
            key={asset.id} 
            className="card group hover:scale-[1.01] transition-transform duration-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {/* Token Avatar/Icon */}
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                  {asset.symbol.substring(0, 2).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-fg">
                      {asset.symbol.toUpperCase()}
                    </span>
                    <span className="text-xs text-fg/40 bg-fg/5 px-2 py-0.5 rounded">
                      {asset.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-fg/60">
                      ${asset.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <div className="flex items-center gap-1">
                      {isPositive ? (
                        <TrendingUp size={12} className="text-success" />
                      ) : (
                        <TrendingDown size={12} className="text-danger" />
                      )}
                      <span className={`text-xs font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
                        {isPositive ? '+' : ''}{change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-fg">
                    ${asset.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-fg/40">Total Value</div>
                </div>
              </div>
              
              <button
                onClick={() => onRemove(asset.id)}
                className="ml-3 p-2 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label={`Remove ${asset.symbol}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
