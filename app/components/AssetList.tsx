'use client';

import { Trash2 } from 'lucide-react';
import type { Asset } from '../types';

interface AssetListProps {
  assets: Asset[];
  onRemove: (id: string) => void;
}

export function AssetList({ assets, onRemove }: AssetListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-fg">Your Assets</h3>
      {assets.map((asset) => (
        <div key={asset.id} className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-fg">
                  {asset.symbol.toUpperCase()}
                </span>
                <span className="text-sm text-fg/60">
                  {asset.quantity} {asset.symbol.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-fg/60">
                  ${asset.currentPrice.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-fg">
                  ${asset.totalValue.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => onRemove(asset.id)}
              className="p-2 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors duration-200"
              aria-label={`Remove ${asset.symbol}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
